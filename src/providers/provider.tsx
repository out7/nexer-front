import type { NavigateOptions } from "react-router-dom";

import { useHref, useNavigate } from "react-router-dom";

import { HeroUIProvider } from "@heroui/system";

import { ClientProviders } from "./ClientProviders";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <ClientProviders>
      <HeroUIProvider navigate={navigate} useHref={useHref}>
        {children}
      </HeroUIProvider>
    </ClientProviders>
  );
}
