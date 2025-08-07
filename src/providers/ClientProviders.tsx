import { I18nextProvider } from "react-i18next";

import { TelegramSDKInitProvider } from "./TelegramSDKInitProvider";
import { LanguageProvider } from "./LanguageProvider";

import i18n from "@/i18n/i18n";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <TelegramSDKInitProvider>
      <I18nextProvider i18n={i18n}>
        <LanguageProvider>{children}</LanguageProvider>
      </I18nextProvider>
    </TelegramSDKInitProvider>
  );
}
