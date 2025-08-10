import Header from "@/components/header";
import Status from "@/components/status";
import Gift from "@/components/gift";
import Notes from "@/components/notes";
import Premium from "@/components/premium";
import Guide from "@/components/guide";
import Help from "@/components/help";
import InvoiceButton from "@/components/invoice-button";
import styles from "./styles.module.scss";
import "@/styles/variables.scss";

const MainPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <div className="flex justify-center my-4">
        <InvoiceButton />
      </div>
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
