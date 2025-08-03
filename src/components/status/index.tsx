import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { StatusIcon } from "./StatusIcon";

type StatusType = "active" | "expired" | "noSubscription";

interface StatusProps {
  type: StatusType;
}

const Status = ({ type }: StatusProps) => {
  const { t } = useTranslation("nav");

  return (
    <div className={styles.container}>
      <div className={styles.status}>
        <p className={styles.statusTitle}>{t("status.title")}</p>
        <div className={styles.statusContent}>
          <StatusIcon type={type} />
          <p className={styles.statusText}>{t(`status.${type}`)}</p>
        </div>
      </div>
      <div className={styles.items}>
        <div className={styles.item}>
          <p className={styles.itemTitle}>{t("status.daysLeft")}</p>
          <p className={styles.itemText}>{t("status.day", { count: 24 })}</p>
        </div>
        <div className={styles.item}>
          <p className={styles.itemTitle}>{t("status.expiresAt")}</p>
          <p className={styles.itemText}>
            {t("status.date", { date: new Date("2025-02-23") })}
          </p>
        </div>
        <div className={styles.item}>
          <p className={styles.itemTitle}>{t("status.traffic")}</p>
          <p className={styles.itemText}>{t("status.unlimited")}</p>
        </div>
      </div>
    </div>
  );
};

export default Status;
