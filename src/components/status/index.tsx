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

  const daysLeft = useMemo(() => {
    if (!subscription?.endDate) return 0;
    const end = new Date(subscription.endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, [subscription?.endDate]);

  return (
    <div className={styles.container}>
      <div className={styles.status}>
        <p className={styles.statusTitle}>{t("status.title")}</p>
        <div className={styles.statusContent}>
          <StatusIcon type={status} />
          <p className={styles.statusText}>{t(`status.${status}`)}</p>
        </div>
      </div>
      <div className={styles.items}>
        <div className={styles.item}>
          <p className={styles.itemTitle}>{t("status.daysLeft")}</p>
          <p className={styles.itemText}>
            {subscription?.endDate ? t("status.day", { count: daysLeft }) : "-"}
          </p>
        </div>
        <div className={styles.item}>
          <p className={styles.itemTitle}>{t("status.expiresAt")}</p>
          <p className={styles.itemText}>
            {subscription?.endDate
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
