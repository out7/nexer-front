import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { getReferrals } from "../../lib/api/referrals";
import { ReferralStatus, Referral } from "./types";
import styles from "./styles.module.scss";
import Link from "../../icons/Link";
import Gift from "../../icons/Gift";
import { CheckCircleLinear as Check } from "../../icons/Check";
import Chart from "../../icons/Chart";
import History from "../../icons/History";
import ArrowRight from "../../icons/ArrowRight";
import Info from "../../icons/Info";
import { Profile as User } from "../../icons/Profile";
import { usePlatform } from "@/hooks/usePlatform";
import CopyRef from "@/icons/CopyRef";
import ShareRef from "@/icons/ShareRef";
import TrialIcon from "../../icons/Trial";
import InactiveIcon from "../../icons/Inactive";
import PurchasedIcon from "../../icons/Purchased";

const ReferralsPage = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const referralLink = `https://t.me/nexervpn_bot?start=ref_${user?.telegramId}`;
  const bonusDays = user?.unclaimedBonusDays || 0;

  const platform = usePlatform();

  console.log("user", user);

  const paddingTop = platform === "pc" ? "70px" : "20px";

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching referrals...");
        const data = await getReferrals();
        console.log("Referrals data received:", data);
        setReferrals(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching referrals:", err);
        setError("Ошибка при загрузке рефералов");
      } finally {
        setIsLoading(false);
      }
    };

    if (user && localStorage.getItem("accessToken")) {
      fetchReferrals();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const stats = {
    total: referrals.length,
    purchased: referrals.filter((r) => r.status === ReferralStatus.purchased)
      .length,
    trial: referrals.filter((r) => r.status === ReferralStatus.trial).length,
    inactive: referrals.filter((r) => r.status === ReferralStatus.inactive)
      .length,
  };

  const handleCopy = async () => {
    try {
      const tg = (window as any)?.Telegram?.WebApp;
      if (tg?.setClipboardText) {
        tg.setClipboardText(referralLink);
        try {
          tg.HapticFeedback?.impactOccurred?.("light");
        } catch {}
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      }

      const ta = document.createElement("textarea");
      ta.value = referralLink;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);

      if (ok) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Присоединяйся к Nexer VPN",
          text: "Попробуй Nexer VPN по моей реферальной ссылке!",
          url: referralLink,
        });
      } catch (err) {
        console.error("Failed to share:", err);
      }
    } else {
      const copyField = document.querySelector(
        "[data-copy-field]"
      ) as HTMLElement;
      if (copyField) {
        copyField.click();
      }
    }
  };

  const handleClaimBonus = () => {
    console.log("Claiming bonus days...");
  };

  const getStatusColor = (status: ReferralStatus) => {
    switch (status) {
      case ReferralStatus.trial:
        return styles.statusTrial;
      case ReferralStatus.purchased:
        return styles.statusPurchased;
      case ReferralStatus.inactive:
        return styles.statusInactive;
      default:
        return styles.statusInactive;
    }
  };

  const getStatusIcon = (status: ReferralStatus) => {
    switch (status) {
      case ReferralStatus.trial:
        return <TrialIcon />;
      case ReferralStatus.purchased:
        return <PurchasedIcon />;
      case ReferralStatus.inactive:
        return <InactiveIcon />;
      default:
        return <InactiveIcon />;
    }
  };

  const getStatusText = (status: ReferralStatus) => {
    switch (status) {
      case ReferralStatus.trial:
        return "Пробный";
      case ReferralStatus.purchased:
        return "Куплено";
      case ReferralStatus.inactive:
        return "Неактивен";
      default:
        return "Неактивен";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU");
  };

  const maskTelegramId = (telegramId: number) => {
    const idStr = telegramId.toString();
    if (idStr.length <= 4) return `***${idStr}`;
    return `***${idStr.slice(-4)}`;
  };

  return (
    <div className={styles.container} style={{ paddingTop }}>
      <div className={styles.title}>
        <h1>Реферальная система</h1>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardIcon}>
            <Link />
          </div>
          <span className={styles.cardTitle}>Ваша реферальная ссылка</span>
        </div>

        <div className={styles.linkContainer}>
          <span className={styles.referralLink}>{referralLink}</span>
        </div>

        <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${styles.copyButton}`}
            onClick={handleCopy}
          >
            <CopyRef />
            <span>{copied ? "Скопировано!" : "Скопировать"}</span>
          </button>
          <button
            className={`${styles.button} ${styles.shareButton}`}
            onClick={handleShare}
          >
            <ShareRef />
            <span>Поделиться</span>
          </button>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardIcon}>
            <Gift />
          </div>
          <span className={styles.cardTitle}>Бонусные дни</span>
          <div className={styles.bonusBadge}>
            <span>{bonusDays}</span>
          </div>
        </div>

        <div className={styles.bonusDescription}>
          Бонусные дни начисляются только когда ваш реферал приобретёт подписку
        </div>

        <button
          className={`${styles.claimButton} ${bonusDays === 0 ? styles.disabled : ""}`}
          onClick={handleClaimBonus}
          disabled={bonusDays === 0}
        >
          <Check />
          <span>Забрать</span>
        </button>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardIcon}>
            <Chart />
          </div>
          <span className={styles.cardTitle}>Статистика</span>
        </div>

        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{stats.total}</span>
            <span className={styles.statLabel}>Всего</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{stats.purchased}</span>
            <span className={styles.statLabel}>Купили</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{stats.trial}</span>
            <span className={styles.statLabel}>Пробуют</span>
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardIcon}>
            <History />
          </div>
          <span className={styles.cardTitle}>Рефералы</span>
          <div
            className={styles.viewAll}
            onClick={() => navigate("/referrals/all")}
          >
            <span>Все</span>
            <ArrowRight />
          </div>
        </div>

        {isLoading ? (
          <div className={styles.loading}>
            <span>Загрузка рефералов...</span>
          </div>
        ) : error ? (
          <div className={styles.error}>
            <span>{error}</span>
          </div>
        ) : referrals.length === 0 ? (
          <div className={styles.empty}>
            <span>У вас пока нет рефералов</span>
          </div>
        ) : (
          <div className={styles.referralsList}>
            {referrals.map((referral) => (
              <div key={referral.id} className={styles.referralItem}>
                <div className={styles.referralInfo}>
                  <div className={styles.avatar}>
                    <User />
                  </div>
                  <div className={styles.referralDetails}>
                    <span className={styles.telegramId}>
                      {maskTelegramId(Number(referral.referred.telegramId))}
                    </span>
                    <span className={styles.date}>
                      {formatDate(referral.createdAt)}
                    </span>
                  </div>
                </div>
                <div
                  className={`${styles.statusBadge} ${getStatusColor(referral.status as ReferralStatus)}`}
                >
                  {getStatusIcon(referral.status as ReferralStatus)}
                  <span>
                    {getStatusText(referral.status as ReferralStatus)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardIcon}>
            <Info />
          </div>
          <span className={styles.cardTitle}>Как это работает</span>
        </div>

        <div className={styles.infoText}>
          • Поделитесь вашей реферальной ссылкой с друзьями
          <br />
          • Получите 5 бонусных дней, когда они покупают подписку
          <br />
          • После начисления, вы можете забрать бонусные дни
          <br />
          • Если вы имеете активную подписку, дни добавятся к ней
          <br />• Если у вас нет подписки, будет создана бонусная подписка
        </div>
      </div>
    </div>
  );
};

export default ReferralsPage;
