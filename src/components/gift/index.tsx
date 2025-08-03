import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import GiftIcon from "@/icons/Gift";
import { useRef } from "react";
import { fireConfetti } from "@/lib/animations/confetti";

const Gift = () => {
  const { t } = useTranslation("nav");
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleActivate = () => {
    if (!buttonRef.current) return;
    fireConfetti({ element: buttonRef.current });
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
        className={styles.button}
        onClick={handleActivate}
      >
        {t("gift.button")}
      </button>
    </div>
  );
};

export default Gift;
