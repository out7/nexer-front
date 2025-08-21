import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getReferrals } from "../../../lib/api/referrals";
import { ReferralStatus, Referral } from "../types";
import styles from "./styles.module.scss";
import { Profile as User } from "../../../icons/Profile";
import { usePlatform } from "@/hooks/usePlatform";
import TrialIcon from "../../../icons/Trial";
import InactiveIcon from "../../../icons/Inactive";
import PurchasedIcon from "../../../icons/Purchased";
import { handleBackButton } from "@/lib/telegramSDK";

const AllReferralsPage = () => {
  const navigate = useNavigate();
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const platform = usePlatform();
  const paddingTop = platform === "pc" ? "60px" : "10px";

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching all referrals...");
        const data = await getReferrals();
        console.log("All referrals data received:", data);
        setReferrals(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching referrals:", err);
        setError("Ошибка при загрузке рефералов");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReferrals();
  }, []);

  useEffect(() => {
    const dispose = handleBackButton(() => navigate(-1));
    return () => {
      dispose?.();
    };
  }, [navigate]);

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
      <div className={styles.header}>
        <h2 className={styles.title}>Все рефералы</h2>
      </div>

      <div className={styles.list}>
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
          referrals.map((referral) => (
            <div key={referral.id} className={styles.item}>
              <div className={styles.avatar}>
                <User />
              </div>
              <div className={styles.referralInfo}>
                <div className={styles.telegramId}>
                  {maskTelegramId(Number(referral.referred.telegramId))}
                </div>
                <div className={styles.date}>
                  {formatDate(referral.createdAt)}
                </div>
              </div>
              <div
                className={`${styles.statusBadge} ${getStatusColor(referral.status as ReferralStatus)}`}
              >
                {getStatusIcon(referral.status as ReferralStatus)}
                <span>{getStatusText(referral.status as ReferralStatus)}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllReferralsPage;
