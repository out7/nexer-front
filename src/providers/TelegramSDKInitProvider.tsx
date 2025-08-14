import type { PropsWithChildren } from "react";

import { useClientOnce } from "@/hooks/useClientOnce";
import { telegramSDKInit } from "@/lib/telegramSDK";
import { useTelegramMock } from "@/hooks/useTelegramMock";

export function TelegramSDKInitProvider({ children }: PropsWithChildren) {
  useTelegramMock();

  useClientOnce(() => {
    const isDebug = import.meta.env.VITE_DEBUG === "true";
    telegramSDKInit({
      debug: isDebug,
      eruda: import.meta.env.VITE_ERUDA,
    });
  });

  return <>{children}</>;
}
