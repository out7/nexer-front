import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import styles from "./styles.module.scss";
import Status from "@/components/status";
import { useAuthContext } from "@/contexts/AuthContext";
import { initData } from "@telegram-apps/sdk-react";
import { useNavigate } from "react-router-dom";
import dayjsLib from "dayjs";
import GiftIcon from "@/icons/Gift";
import { CheckCircleLinear as CheckIcon } from "@/icons/Check";
import { AlarmLinear as AlarmIcon } from "@/icons/Alarm";
import { usePlatform } from "@/hooks/usePlatform";
import LinkIcon from "@/icons/Link";
import HistoryIcon from "@/icons/History";
import ArrowRight from "@/icons/ArrowRight";
import CopyField from "@/components/copy-field";

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
    createdAt: dayjsLib().subtract(1, "day").toISOString(),
  },
  {
    id: "f7d5c79a-1111-1111-1111-000000000002",
    customerId: "9f2a6a1e-0000-0000-0000-000000000001",
    type: "bonus_awarded",
    meta: { period: 3 },
    createdAt: dayjsLib().subtract(2, "day").toISOString(),
  },
  {
    id: "f7d5c79a-1111-1111-1111-000000000003",
    customerId: "9f2a6a1e-0000-0000-0000-000000000001",
    type: "trial_activated",
    meta: {},
    createdAt: dayjsLib().subtract(3, "day").toISOString(),
  },
  {
    id: "f7d5c79a-1111-1111-1111-000000000004",
    customerId: "9f2a6a1e-0000-0000-0000-000000000001",
    type: "renewed",
    meta: { period: 10 },
    createdAt: dayjsLib().subtract(4, "day").toISOString(),
  },
  {
    id: "f7d5c79a-1111-1111-1111-000000000005",
    customerId: "9f2a6a1e-0000-0000-0000-000000000001",
    type: "purchased",
    meta: { period: 7, platform: "telegram_stars", amount: 3990 },
    createdAt: dayjsLib().subtract(5, "day").toISOString(),
  },
];

const ProfilePage = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const platform = usePlatform();

  const paddingTop = platform === "pc" ? "70px" : "20px";

  const tgUser = useMemo(() => {
    try {
      const raw = initData.raw();
      if (!raw) return null;
      const params = new URLSearchParams(raw);
      const userParam = params.get("user");
      if (!userParam) return null;
      const parsed = JSON.parse(decodeURIComponent(userParam));
      return parsed as {
        id: number;
        username?: string;
        first_name?: string;
        last_name?: string;
        photo_url?: string;
      };
    } catch {
      return null;
    }
  }, []);

  const username = useMemo(() => {
    const fromApi = (user as any)?.username as string | undefined;
    const fromTg = tgUser?.username;
    const fallbackName = [tgUser?.first_name, tgUser?.last_name]
      .filter(Boolean)
      .join(" ");
    return fromApi || fromTg || fallbackName || "username";
  }, [tgUser, user]);

  const avatarUrl = tgUser?.photo_url || "";
  const telegramId = user?.telegramId ?? tgUser?.id;

  const subscription = user?.customerSubscription;
  const isActive = subscription?.status === "active";
  const subscriptionUrl = (subscription as any)?.subscriptionUrl as
    | string
    | undefined;

  const [activity, setActivity] = useState<ActivityItem[]>([]);
  useEffect(() => {
    const items = [...mockActivity].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setActivity(items.slice(0, 5));
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
      <div className={styles.card}>
        <div className={styles.userRow}>
          <div className={styles.avatarWrap}>
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarUrl} alt="avatar" className={styles.avatar} />
            ) : (
              <div className={styles.avatarFallback}>
                <span>
                  {username
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div className={styles.userMeta}>
            <div className={styles.username}>@{username}</div>
            {telegramId ? (
              <div className={styles.userId}>ID: {telegramId}</div>
            ) : null}
          </div>
        </div>
      </div>

      <div className={styles.status}>
        <Status />
      </div>

      {isActive && subscriptionUrl ? (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <span className={styles.sectionIcon}>
                <LinkIcon />
              </span>
              <span className={styles.cardTitle}>Ссылка на подписку</span>
            </div>
          </div>
          <div className={styles.snippetWrap}>
            <CopyField value={subscriptionUrl} className={styles.snippet} />
            <div className={styles.snippetHint}>
              Подсказка: используйте эту ссылку для ручного подключения
            </div>
          </div>
        </div>
      ) : null}

      {/* Activity preview */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardHeaderLeft}>
            <span className={styles.sectionIcon}>
              <HistoryIcon />
            </span>
            <span className={styles.cardTitle}>Активность</span>
          </div>
          <button
            className={styles.historyAction}
            onClick={() => navigate("/profile/activity")}
          >
            <span>История</span>
            <ArrowRight />
          </button>
        </div>
        <div className={styles.activityList}>
          {activity.map((item) => (
            <div key={item.id} className={styles.activityItem}>
              <div className={styles.activityIcon}>
                {renderActivityIcon(item)}
              </div>
              <div className={styles.activityTexts}>
                <div className={styles.activityTitle}>
                  {renderActivityTitle(item)}
                </div>
                <div className={styles.activityDate}>
                  {dayjs(item.createdAt).format("DD.MM.YYYY")}
                </div>
              </div>
            </div>
          ))}
          {activity.length === 0 ? (
            <div className={styles.activityEmpty}>Пока нет активности</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
