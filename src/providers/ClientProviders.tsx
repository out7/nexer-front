import { I18nextProvider } from "react-i18next";

import { TelegramSDKInitProvider } from "./TelegramSDKInitProvider";

import i18n from "@/i18n/i18n";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <TelegramSDKInitProvider>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </TelegramSDKInitProvider>
  );
}
