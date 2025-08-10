import { useTranslation } from "react-i18next";

import NotesIcon from "@/icons/Notes";
import ArrowRight from "@/icons/ArrowRight";

import styles from "./styles.module.scss";

const Notes = () => {
  const { t } = useTranslation("nav");

  return (
    <a href="https://t.me/nexervpn" className={styles.container}>
      <div className={styles.leftContent}>
        <NotesIcon />
        <div className={styles.content}>
          <p className={styles.title}>{t("notes.title")}</p>
          <p className={styles.description}>{t("notes.description")}</p>
        </div>
      </div>
      <ArrowRight />
    </a>
  );
};

export default Notes;
