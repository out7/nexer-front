import styles from "./styles.module.scss";

interface AppLoaderProps {
  isLoading: boolean;
}

const AppLoader = ({ isLoading }: AppLoaderProps) => {
  if (!isLoading) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.loader}>
        <div className={styles.spinner}></div>
      </div>
    </div>
  );
};

export default AppLoader;
