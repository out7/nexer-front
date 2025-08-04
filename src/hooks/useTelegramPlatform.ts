import { useEffect, useState } from "react";

type TelegramPlatform = "android" | "ios" | "web" | "unknown";

export const useTelegramPlatform = () => {
  const [platform, setPlatform] = useState<TelegramPlatform>("unknown");

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      setPlatform(tg.platform as TelegramPlatform);
    }
  }, []);

  return platform;
};
