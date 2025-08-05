import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import GiftIcon from "@/icons/Gift";
import { useRef, useState } from "react";
import { fireConfetti } from "@/lib/animations/confetti";
import { api } from "@/lib/axios";
import { useAuthContext } from "@/contexts/AuthContext";
import { operations } from "@/lib/api/types/generated";

const Gift = () => {
  const { t } = useTranslation("nav");
  const { refreshUserData } = useAuthContext();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleActivate = async () => {
    if (!buttonRef.current || isLoading) return;

    try {
      setIsLoading(true);
      setError(null);

      await api.post<
        operations["CustomerController_activateTrial"]["responses"]["201"]["content"]["application/json"]
      >("/customer/trial");

      await refreshUserData();

      fireConfetti({ element: buttonRef.current });
    } catch (err: any) {
      console.error("Error activating trial:", err);
      if (err.response?.status === 400) {
        setError("Пробный период уже был активирован");
      } else {
        setError("Ошибка при активации пробного периода");
      }
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
      {error && <p className={styles.error}>{error}</p>}
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
