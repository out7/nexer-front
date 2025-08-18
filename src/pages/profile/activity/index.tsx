import { useEffect, useState } from "react";
import dayjs from "dayjs";
import styles from "./styles.module.scss";
import GiftIcon from "@/icons/Gift";
import { CheckCircleLinear as CheckIcon } from "@/icons/Check";
import { useNavigate } from "react-router-dom";
import { usePlatform } from "@/hooks/usePlatform";
import { api } from "@/lib/axios";
import Card from "@/icons/Card";
import Refresh from "@/icons/Refresh";
import Close from "@/icons/Close";
import Watch from "@/icons/Watch";
import { handleBackButton } from "@/lib/telegramSDK";

type ActivityItem = {
  id: string;
  customerId: string;
  type: string;
  meta?: Record<string, any> | null;
  createdAt: string;
};

const ActivityPage = () => {
  const navigate = useNavigate();
  const platform = usePlatform();
  const [activity, setActivity] = useState<ActivityItem[]>([]);

  const paddingTop = platform === "pc" ? "60px" : "10px";

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const { data } = await api.get<ActivityItem[]>("/activity");
        const items = [...data].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        if (!cancelled) setActivity(items);
      } catch {
        if (!cancelled) setActivity([]);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const dispose = handleBackButton(() => navigate(-1));
    return () => {
      dispose?.();
    };
  }, [navigate]);

  const renderActivityTitle = (item: ActivityItem): string => {
    const meta = item.meta || {};
    const period = meta.period ? Number(meta.period) : undefined;
    switch (item.type) {
      case "purchased":
      case "subscription_purchased":
        return period ? `Куплен Премиум на ${period} дн.` : "Куплен Премиум";
      case "extended":
      case "renewed":
      case "subscription_extended":
        return period ? `Продлён Премиум +${period} дн.` : "Продлён Премиум";
      case "subscription_expired":
        return "Подписка истекла";
      case "bonus":
      case "bonus_awarded":
      case "referral_bonus_added":
        return period ? `Начислен бонус +${period} дн.` : "Начислен бонус";
      case "trial":
      case "trial_activated":
        return "Активирован пробный период";
      default:
        return item.type;
    }
  };

  const renderActivityIcon = (item: ActivityItem) => {
    switch (item.type) {
      case "subscription_purchased":
        return <Card />;
      case "subscription_extended":
        return <Refresh />;
      case "subscription_expired":
        return <Close />;
      case "bonus":
      case "bonus_awarded":
      case "referral_bonus_added":
        return <GiftIcon />;
      case "trial":
      case "trial_activated":
        return <Watch />;
      default:
        return <CheckIcon color="#fff" />;
    }
  };

  return (
    <div className={styles.container} style={{ paddingTop }}>
      <div className={styles.header}>
        <h2 className={styles.title}>История активности</h2>
      </div>
      <div className={styles.list}>
        {activity.map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.icon}>{renderActivityIcon(item)}</div>
            <div className={styles.texts}>
              <div className={styles.itemTitle}>
                {renderActivityTitle(item)}
              </div>
              <div className={styles.itemDate}>
                {dayjs(item.createdAt).format("DD.MM.YYYY HH:mm")}
              </div>
            </div>
          </div>
        ))}
        {activity.length === 0 ? (
          <div className={styles.empty}>Пока нет записей</div>
        ) : null}
      </div>
    </div>
  );
};

export default ActivityPage;
