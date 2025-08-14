import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import styles from "./styles.module.scss";
import { addToast, Spinner } from "@heroui/react";
import { api } from "@/lib/axios";
import { invoice } from "@telegram-apps/sdk";
import StarsIcon from "@/icons/Stars";
import { CardOutline } from "@/icons/Tariffs";
import DevicesIcon from "@/icons/Devices";
import BoltIcon from "@/icons/Bolt";
import InfinityIcon from "@/icons/Infinity";
import GlobeIcon from "@/icons/Globe";
import { usePlatform } from "@/hooks/usePlatform";
import { useAuthContext } from "@/contexts/AuthContext";
import { operations } from "@/lib/api/types/generated";

type PaymentMethod = "stars" | "tribute";

type TariffDto = {
  id: string;
  code?: string | null;
  months: number;
  discount: number | null;
  perMonth: number;
  priceOldRUB?: number | null;
  priceRUB: number;
  priceStars?: number | null;
  trbtCode?: string | null;
  invoiceCode?: string | null;
};

function formatMonthsLabel(months: number): string {
  if (months === 1) return "1 Месяц";
  if (months === 3) return "3 Месяца";
  if (months === 6) return "6 Месяцев";
  if (months === 12) return "1 Год";
  return `${months} мес.`;
}

function deriveInvoiceCode(months: number): string {
  switch (months) {
    case 1:
      return "monthly";
    case 3:
      return "quarterly";
    case 6:
      return "semiannual";
    case 12:
      return "annual";
    default:
      return "monthly";
  }
}

export default function TariffsPage() {
  const [tariffs, setTariffs] = useState<TariffDto[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTariffId, setSelectedTariffId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("tribute");
  const [isPaying, setIsPaying] = useState<boolean>(false);

  const platform = usePlatform();
  const paddingTop = platform === "pc" ? "70px" : "20px";
  const { user, refreshUserData } = useAuthContext();
  const tributePollingAbortRef = useRef(false);

  useEffect(() => {
    return () => {
      tributePollingAbortRef.current = true;
    };
  }, []);

  function hasSubscriptionChanged(
    prevSub: {
      endDate: string | null;
      status: string | null;
      updatedAt: string | null;
    } | null,
    nextSub: {
      endDate: string | null;
      status: string | null;
      updatedAt: string | null;
    } | null
  ): { changed: boolean; extended: boolean } {
    const prevEnd = prevSub?.endDate ?? null;
    const nextEnd = nextSub?.endDate ?? null;
    const prevStatus = prevSub?.status ?? null;
    const nextStatus = nextSub?.status ?? null;
    const prevUpdatedAt = prevSub?.updatedAt ?? null;
    const nextUpdatedAt = nextSub?.updatedAt ?? null;

    const changed =
      prevEnd !== nextEnd ||
      prevStatus !== nextStatus ||
      prevUpdatedAt !== nextUpdatedAt;

    const extended =
      prevEnd != null &&
      nextEnd != null &&
      new Date(nextEnd).getTime() > new Date(prevEnd).getTime();

    return { changed, extended };
  }

  const sortedTariffs = useMemo(() => {
    return (tariffs ?? []).slice().sort((a, b) => a.months - b.months);
  }, [tariffs]);

  const selectedTariff = useMemo(() => {
    if (!sortedTariffs.length) return null;
    const byId = sortedTariffs.find((t) => t.id === selectedTariffId);
    if (byId) return byId;
    const byMonths = sortedTariffs.find(
      (t) => String(t.months) === String(selectedTariffId)
    );
    return byMonths ?? null;
  }, [sortedTariffs, selectedTariffId]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        const { data } = await api.get<TariffDto[]>("/tariffs");
        if (!isMounted) return;
        setTariffs(data);
        const defaultTariff =
          data.find((t) => t.months === 3) ?? data[0] ?? null;
        setSelectedTariffId(
          defaultTariff
            ? (defaultTariff.id ?? String(defaultTariff.months))
            : null
        );
      } catch (err: any) {
        console.error("Failed to load tariffs", err);
        if (!isMounted) return;
        setError("Не удалось загрузить тарифы");
        addToast({
          title: "Ошибка",
          description: "Не удалось загрузить тарифы",
          color: "danger",
          variant: "flat",
        });
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const handlePay = useCallback(async () => {
    if (!selectedTariff) return;

    try {
      setIsPaying(true);

      if (paymentMethod === "tribute") {
        const trbtCode = selectedTariff.trbtCode ?? "";
        if (!trbtCode) {
          addToast({
            title: "Ошибка",
            description: "Код Tribute для тарифа не найден",
            color: "danger",
            variant: "flat",
          });
          return;
        }
        const url = `https://t.me/tribute/app?startapp=${encodeURIComponent(trbtCode)}`;
        window.open(url, "_blank");

        tributePollingAbortRef.current = false;
        const previousSubscription = user?.customerSubscription ?? null;
        const timeoutAt = Date.now() + 5 * 60 * 1000;
        const intervalMs = 5000;

        while (Date.now() < timeoutAt && !tributePollingAbortRef.current) {
          try {
            const { data: freshUser } =
              await api.get<
                operations["CustomerController_getProfile"]["responses"]["200"]["content"]["application/json"]
              >("/customer/me");

            const nextSubscription = freshUser.customerSubscription ?? null;
            const { changed, extended } = hasSubscriptionChanged(
              previousSubscription,
              nextSubscription
            );

            if (changed) {
              await refreshUserData();
              addToast({
                title: "Успешно",
                description: extended
                  ? "Подписка продлена"
                  : "Подписка оплачена",
                color: "success",
                variant: "flat",
              });
              break;
            }
          } catch (pollErr) {
            console.error("Tribute polling error", pollErr);
          }

          await new Promise((r) => setTimeout(r, intervalMs));
        }
        return;
      }

      if (!invoice.isSupported()) {
        addToast({
          title: "Недоступно",
          description: "Платежи недоступны в этом клиенте",
          color: "warning",
          variant: "flat",
        });
        return;
      }

      const code =
        selectedTariff.code ??
        selectedTariff.invoiceCode ??
        deriveInvoiceCode(selectedTariff.months);
      const response = await api.get<{ url: string }>(
        `/invoice/tariff/${code}`
      );

      if (invoice.open.isAvailable()) {
        const previousSubscription = user?.customerSubscription ?? null;
        const status = await invoice.open(response.data.url, "url");

        if (status === "paid") {
          try {
            const { data: freshUser } =
              await api.get<
                operations["CustomerController_getProfile"]["responses"]["200"]["content"]["application/json"]
              >("/customer/me");

            await refreshUserData();

            const nextSubscription = freshUser.customerSubscription ?? null;

            const prevEnd = previousSubscription?.endDate ?? null;
            const nextEnd = nextSubscription?.endDate ?? null;
            const prevStatus = previousSubscription?.status ?? null;
            const nextStatus = nextSubscription?.status ?? null;
            const prevUpdatedAt = previousSubscription?.updatedAt ?? null;
            const nextUpdatedAt = nextSubscription?.updatedAt ?? null;

            const changed =
              prevEnd !== nextEnd ||
              prevStatus !== nextStatus ||
              prevUpdatedAt !== nextUpdatedAt;

            if (changed) {
              const extended =
                prevEnd != null &&
                nextEnd != null &&
                new Date(nextEnd).getTime() > new Date(prevEnd).getTime();

              addToast({
                title: "Успешно",
                description: extended
                  ? "Подписка продлена"
                  : "Подписка оплачена",
                color: "success",
                variant: "flat",
              });
            }
          } catch (verifyErr) {
            console.error("Verify payment error", verifyErr);
          }
        }
      } else {
        addToast({
          title: "Недоступно",
          description: "Открытие инвойса не поддерживается",
          color: "warning",
          variant: "flat",
        });
      }
    } catch (err: any) {
      console.error("Payment error", err);
      addToast({
        title: "Ошибка",
        description: "Не удалось выполнить оплату",
        color: "danger",
        variant: "flat",
      });
    } finally {
      setIsPaying(false);
    }
  }, [paymentMethod, selectedTariff]);

  const TotalPrice = useMemo(() => {
    if (!selectedTariff) return null;
    if (paymentMethod === "stars") return `${selectedTariff.priceStars ?? "-"}`;
    return `${selectedTariff.priceRUB}`;
  }, [paymentMethod, selectedTariff]);

  const handleSelectTariff = useCallback((id: string | number) => {
    setSelectedTariffId(String(id));
  }, []);

  const handleSelectPayment = useCallback((method: PaymentMethod) => {
    setPaymentMethod(method);
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loader}>
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  if (error || !tariffs || tariffs.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>Тарифы недоступны</div>
      </div>
    );
  }

  return (
    <div className={styles.container} style={{ paddingTop }}>
      {/* Блок выбора тарифа */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>Выберите тариф</div>
        <div
          role="radiogroup"
          aria-label="Тарифы"
          className={styles.groupWrapper}
        >
          {sortedTariffs.map((t) => {
            const isSelected =
              selectedTariffId === t.id ||
              String(t.months) === selectedTariffId;
            return (
              <div
                key={String(t.id) + String(t.months)}
                role="radio"
                tabIndex={0}
                aria-checked={isSelected}
                data-selected={isSelected}
                className={styles.tariffCard}
                onClick={() => handleSelectTariff(t.id ?? t.months)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelectTariff(t.id ?? t.months);
                  }
                }}
              >
                <div className={styles.tariffContent}>
                  <div className={styles.tariffLeftRow}>
                    <span
                      className={styles.radioIndicator}
                      data-selected={isSelected}
                    />
                    <div className={styles.tariffLeft}>
                      <div className={styles.tariffTitleRow}>
                        <span className={styles.tariffTitle}>
                          {formatMonthsLabel(t.months)}
                        </span>
                        {t.discount != null && t.discount > 0 && (
                          <span
                            className={styles.discountBadge}
                          >{`-${t.discount}%`}</span>
                        )}
                        {/* Если нет старой цены, добавим пустой блок для сохранения общей высоты карточки */}
                        {!(
                          t.priceOldRUB != null && t.priceOldRUB > t.priceRUB
                        ) && <div className={styles.pricePlaceholder} />}
                      </div>
                      {t.priceOldRUB != null && t.priceOldRUB > t.priceRUB && (
                        <div className={styles.priceRow}>
                          <span
                            className={styles.oldPrice}
                          >{`${t.priceOldRUB}₽`}</span>
                          <span
                            className={styles.newPrice}
                          >{`${t.priceRUB}₽`}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles.tariffRight}>
                    <span
                      className={styles.perMonth}
                    >{`${t.perMonth}₽/месяц`}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Что включено */}
      <section className={styles.section}>
        <div className={styles.sectionSubHeader}>Что включено</div>
        <div className={styles.features}>
          <div className={styles.featureItem}>
            <div className={styles.featureIconWrap}>
              <GlobeIcon width={16} height={16} />
            </div>
            <div className={styles.featureText}>Серверы в разных странах</div>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureIconWrap}>
              <DevicesIcon width={16} height={16} />
            </div>
            <div className={styles.featureText}>Подключение до 5 устройств</div>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureIconWrap}>
              <BoltIcon width={16} height={16} />
            </div>
            <div className={styles.featureText}>Сверхбыстрое подключение</div>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureIconWrap}>
              <InfinityIcon width={16} height={16} />
            </div>
            <div className={styles.featureText}>Неограниченный трафик</div>
          </div>
        </div>
      </section>

      {/* Способ оплаты */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>Способ оплаты</div>
        <div
          role="radiogroup"
          aria-label="Способ оплаты"
          className={styles.groupWrapper}
        >
          <div
            role="radio"
            tabIndex={0}
            aria-checked={paymentMethod === "stars"}
            data-selected={paymentMethod === "stars"}
            className={styles.payCard}
            onClick={() => handleSelectPayment("stars")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleSelectPayment("stars");
              }
            }}
          >
            <div className={styles.payContent}>
              <div className={styles.payLeftRow}>
                <span
                  className={styles.radioIndicator}
                  data-selected={paymentMethod === "stars"}
                />
                <div className={styles.payLeft}>
                  <span>Telegram Stars</span>
                </div>
              </div>
              <div className={styles.payRight}>
                <StarsIcon width={16} height={16} />
              </div>
            </div>
          </div>
          <div
            role="radio"
            tabIndex={0}
            aria-checked={paymentMethod === "tribute"}
            data-selected={paymentMethod === "tribute"}
            className={styles.payCard}
            onClick={() => handleSelectPayment("tribute")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleSelectPayment("tribute");
              }
            }}
          >
            <div className={styles.payContent}>
              <div className={styles.payLeftRow}>
                <span
                  className={styles.radioIndicator}
                  data-selected={paymentMethod === "tribute"}
                />
                <div className={styles.payLeft}>
                  <span>Tribute App</span>
                </div>
              </div>
              <div className={styles.payRight}>
                <CardOutline width={16} height={16} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Сводка заказа + кнопка оплаты */}
      <section className={styles.section}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryTitle}>Сводка заказа</div>
          <div className={styles.summaryRow}>
            <div className={styles.summaryLeft}>
              {selectedTariff ? formatMonthsLabel(selectedTariff.months) : "—"}
            </div>
            <div className={styles.summaryRight}>
              {paymentMethod === "stars" ? (
                <>
                  {TotalPrice}
                  <StarsIcon width={16} height={16} />
                </>
              ) : (
                <>{TotalPrice}₽</>
              )}
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.summaryRow}>
            <div className={styles.summaryLeftStrong}>Итого</div>
            <div className={styles.summaryRightStrong}>
              {paymentMethod === "stars" ? (
                <>
                  {TotalPrice}
                  <StarsIcon width={16} height={16} />
                </>
              ) : (
                <>{TotalPrice}₽</>
              )}
            </div>
          </div>
        </div>

        <button
          className={styles.payButton}
          onClick={handlePay}
          disabled={!selectedTariff || isPaying}
        >
          {isPaying
            ? "Ожидание..."
            : paymentMethod === "stars"
              ? `Оплатить ${TotalPrice ?? "—"}`
              : `Оплатить ${TotalPrice ?? "—"}₽`}
          {paymentMethod === "stars" ? (
            <StarsIcon width={16} height={16} />
          ) : (
            <CardOutline width={16} height={16} />
          )}
        </button>
      </section>
    </div>
  );
}
