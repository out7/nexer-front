import { useEffect, useState } from "react";
import dayjs from "dayjs";
import styles from "./styles.module.scss";
import GiftIcon from "@/icons/Gift";
import { CheckCircleLinear as CheckIcon } from "@/icons/Check";
import { AlarmLinear as AlarmIcon } from "@/icons/Alarm";
import { useNavigate } from "react-router-dom";
import { usePlatform } from "@/hooks/usePlatform";

type ActivityItem = {
  id: string;
  customerId: string;
  type: string;
  meta?: Record<string, any> | null;
  createdAt: string;
};

const mockActivity: ActivityItem[] = [
  {
    id: "f7d5c79a-1111-1111-1111-000000000001",
    customerId: "9f2a6a1e-0000-0000-0000-000000000001",
    type: "purchased",
    meta: { period: 30, platform: "telegram_stars", amount: 10100 },
    createdAt: dayjs().subtract(1, "day").toISOString(),
  },
  {
    id: "f7d5c79a-1111-1111-1111-000000000002",
    customerId: "9f2a6a1e-0000-0000-0000-000000000001",
    type: "bonus_awarded",
    meta: { period: 3 },
    createdAt: dayjs().subtract(2, "day").toISOString(),
  },
  {
    id: "f7d5c79a-1111-1111-1111-000000000003",
    customerId: "9f2a6a1e-0000-0000-0000-000000000001",
    type: "trial_activated",
    meta: {},
    createdAt: dayjs().subtract(3, "day").toISOString(),
  },
  {
    id: "f7d5c79a-1111-1111-1111-000000000004",
    customerId: "9f2a6a1e-0000-0000-0000-000000000001",
    type: "renewed",
    meta: { period: 10 },
    createdAt: dayjs().subtract(4, "day").toISOString(),
  },
  {
    id: "f7d5c79a-1111-1111-1111-000000000005",
    customerId: "9f2a6a1e-0000-0000-0000-000000000001",
    type: "purchased",
    meta: { period: 7, platform: "telegram_stars", amount: 3990 },
    createdAt: dayjs().subtract(5, "day").toISOString(),
  },
];

const ActivityPage = () => {
  const navigate = useNavigate();
  const platform = usePlatform();
  const [activity, setActivity] = useState<ActivityItem[]>([]);

  const paddingTop = platform === "pc" ? "60px" : "10px";

  useEffect(() => {
    const items = [...mockActivity].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setActivity(items);
  }, []);

  const renderActivityTitle = (item: ActivityItem): string => {
    const meta = item.meta || {};
    const period = meta.period ? Number(meta.period) : undefined;
    switch (item.type) {
      case "purchased":
        return period ? `Куплен Премиум на ${period} дн.` : "Куплен Премиум";
      case "extended":
      case "renewed":
        return period ? `Продлён Премиум +${period} дн.` : "Продлён Премиум";
      case "bonus":
      case "bonus_awarded":
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
      case "bonus":
      case "bonus_awarded":
        return <GiftIcon />;
      case "trial":
      case "trial_activated":
        return <AlarmIcon color="#fff" />;
      default:
        return <CheckIcon color="#fff" />;
    }
  };

  return (
    <div className={styles.container} style={{ paddingTop }}>
      <div className={styles.header}>
        <button className={styles.back} onClick={() => navigate(-1)}>
          Назад
        </button>
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
