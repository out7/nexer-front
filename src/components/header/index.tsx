import styles from "./styles.module.scss";
import { usePlatform } from "@/hooks/usePlatform";

const Header = () => {
  const platform = usePlatform();
  const isMobile = platform === "android" || platform === "ios";

  return (
    <div className={isMobile ? styles.containerMobile : styles.container}>
      <p className={styles.title}>Nexer</p>
      <p className={styles.subtitle}>VPN</p>
    </div>
  );
};

export default Header;
