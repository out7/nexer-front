import Navbar from "@/components/navbar";
import Header from "@/components/header";
import styles from "./styles.module.scss";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children}</main>
      <div className={styles.nav}>
        <Navbar />
      </div>
    </div>
  );
}
