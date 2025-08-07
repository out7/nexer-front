import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import GiftIcon from "@/icons/Gift";
import { useRef, useState } from "react";
import { fireConfetti } from "@/lib/animations/confetti";
import { api } from "@/lib/axios";
import { useAuthContext } from "@/contexts/AuthContext";
import { operations } from "@/lib/api/types/generated";
import { addToast } from "@heroui/react";

const Gift = () => {
  const { t } = useTranslation("nav");
  const { refreshUserData, user } = useAuthContext();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (user?.customerSubscription?.trialActivated) {
    return null;
  }

  const handleActivate = async () => {
    if (!buttonRef.current || isLoading) return;

    try {
      setIsLoading(true);

      await api.post<
        operations["CustomerController_activateTrial"]["responses"]["201"]["content"]["application/json"]
      >("/customer/trial");

      await new Promise((resolve) => setTimeout(resolve, 1000));
      await refreshUserData();

      addToast({
        title: "Успешно!",
        description: "Пробный период успешно активирован",
        color: "success",
        variant: "flat",
      });

      fireConfetti({ element: buttonRef.current });
    } catch (err: any) {
      console.error("Error activating trial:", err);

      const errorMessage =
        err.response?.status === 400
          ? "Пробный период уже был активирован"
          : "Ошибка при активации пробного периода";

      addToast({
        title: "Ошибка!",
        description: errorMessage,
        color: "danger",
        variant: "flat",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <GiftIcon />
      <p className={styles.title}>
        {t("gift.title")}{" "}
        <span className={styles.titleHighlight}>{t("gift.highlight")}</span>
      </p>
      <p className={styles.description}>{t("gift.description")}</p>

      <button
        ref={buttonRef}
        className={`${styles.button} ${isLoading ? styles.loading : ""}`}
        onClick={handleActivate}
        disabled={isLoading}
      >
        {isLoading ? "Активация..." : t("gift.button")}
      </button>
    </div>
  );
};

export default Gift;
