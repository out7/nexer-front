import Header from "@/components/header";
import Status from "@/components/status";
import Gift from "@/components/gift";
import Notes from "@/components/notes";
import Premium from "@/components/premium";

import styles from "./styles.module.scss";
import "@/styles/variables.scss";

const MainPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Status type="active" />
      <Gift />
      <Notes />
      <Premium />
    </div>
  );
};

export default MainPage;
