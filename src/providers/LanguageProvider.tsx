import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage("ru");
  }, []);

  return <>{children}</>;
}
