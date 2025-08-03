import styles from "./styles.module.scss";

const Header = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Nexer</p>
      <p className={styles.subtitle}>VPN</p>
    </div>
  );
};

export default Header;
