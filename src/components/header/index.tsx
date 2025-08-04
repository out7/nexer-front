import { useTelegramPlatform } from "@/hooks/useTelegramPlatform";
import styles from "./styles.module.scss";

const Header = () => {
  const platform = useTelegramPlatform();
  const isMobile = platform === "android" || platform === "ios";

  return (
    <div className={styles.container} data-mobile={isMobile}>
      <p className={styles.title}>Nexer</p>
      <p className={styles.subtitle}>VPN</p>
    </div>
  );
};

export default Header;
