import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { StatusIcon } from "./StatusIcon";
import { useAuthContext } from "@/contexts/AuthContext";
import { useMemo } from "react";

const Status = () => {
  const { t } = useTranslation("nav");
  const { user } = useAuthContext();

  const subscription = user?.customerSubscription;
  const status = subscription?.status || "none";

  const timeLeft = useMemo(() => {
    if (!subscription?.endDate) return null;
    const end = new Date(subscription.endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes, totalDiff: diff };
  }, [subscription?.endDate]);

  const formattedTimeLeft = useMemo(() => {
    if (!timeLeft) return null;

    if (timeLeft.days >= 2) {
      return t("status.days", { count: timeLeft.days });
    } else if (timeLeft.days === 1) {
      return t("status.timeLeft.days", {
        days: timeLeft.days,
        hours: timeLeft.hours,
      });
    } else if (timeLeft.hours >= 1) {
      return t("status.timeLeft.hours", {
        hours: timeLeft.hours,
        minutes: timeLeft.minutes,
      });
    } else {
      return t("status.timeLeft.minutes", { minutes: timeLeft.minutes });
    }
  }, [timeLeft, t]);

  const iconColor = useMemo(() => {
    switch (status) {
      case "active":
        return "#17C964";
      case "expired":
        return "#C91717";
      case "none":
      default:
        return "#B2B2B2";
    }
  }, [status]);

  return (
    <div className={styles.container}>
      <div className={styles.status}>
        <p className={styles.statusTitle}>{t("status.title")}</p>
        <div className={styles.statusContent}>
          <StatusIcon type={status} color={iconColor} />
          <p className={styles.statusText}>{t(`status.${status}`)}</p>
        </div>
      </div>
      <div className={styles.items}>
        <div className={styles.item}>
          <p className={styles.itemTitle}>{t("status.daysLeft")}</p>
          <p className={styles.itemText}>
            {status === "none" ? "-" : formattedTimeLeft || "-"}
          </p>
        </div>
        <div className={styles.item}>
          <p className={styles.itemTitle}>{t("status.expiresAt")}</p>
          <p className={styles.itemText}>
            {status === "none"
              ? "-"
              : subscription?.endDate
                ? t("status.date", { date: new Date(subscription.endDate) })
                : "-"}
          </p>
        </div>
        <div className={styles.item}>
          <p className={styles.itemTitle}>{t("status.traffic")}</p>
          <p className={styles.itemText}>
            {status === "active" ? t("status.unlimited") : "-"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Status;
