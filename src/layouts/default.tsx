import Navbar from "@/components/navbar";
import Header from "@/components/header";
import AppLoader from "@/components/app-loader";
import { useAuthContext } from "@/contexts/AuthContext";
import styles from "./styles.module.scss";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useAuthContext();

  return (
    <div className={styles.layout}>
      <AppLoader isLoading={isLoading} />
      <Header />
      <main className={styles.main}>{children}</main>
      <div className={styles.nav}>
        <Navbar />
      </div>
    </div>
  );
}
