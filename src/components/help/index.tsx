import styles from "./styles.module.scss";
import Warning from "@/icons/Warning";
import Wifi from "@/icons/Wifi";
import Book from "@/icons/Book";

const Help = () => {
  const helpItems = [
    {
      icon: <Warning />,
      text: "Подписка не работает?",
    },
    {
      icon: <Wifi />,
      text: "Проблемы с подключением?",
    },
    {
      icon: <Book />,
      text: "Полная инструкция",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33333 8 1.33333C4.3181 1.33333 1.33333 4.3181 1.33333 8C1.33333 11.6819 4.3181 14.6667 8 14.6667Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 10.6667V8M8 5.33333H8.00667"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h3>Нужна помощь?</h3>
      </div>
      <div className={styles.links}>
        {helpItems.map((item, index) => (
          <button key={index} className={styles.link}>
            {item.icon}
            <span>{item.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Help;
