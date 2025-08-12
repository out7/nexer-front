import Status from "@/components/status";
import Gift from "@/components/gift";
import Notes from "@/components/notes";
import Premium from "@/components/premium";
import Guide from "@/components/guide";
import Help from "@/components/help";
import styles from "./styles.module.scss";
import "@/styles/variables.scss";
import { usePlatform } from "@/hooks/usePlatform";

const MainPage = () => {
  const platform = usePlatform();
  const marginTop = platform === "pc" ? "" : "-35px";
  const paddingTop = platform === "pc" ? "10px" : "";

  return (
    <div className={styles.container} style={{ marginTop, paddingTop }}>
      <Status />
      <Gift />
      <Notes />
      <Premium />
      <Guide />
      <Help />
    </div>
  );
};

export default MainPage;
