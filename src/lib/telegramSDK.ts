/* eslint-disable */
import {
  bindThemeParamsCssVars,
  bindViewportCssVars,
  init as initSDK,
  miniApp,
  mountSwipeBehavior,
  mountBackButton,
  mountViewport,
  onBackButtonClick,
  requestFullscreen,
  disableVerticalSwipes,
  restoreInitData,
  setDebug,
  showBackButton,
} from "@telegram-apps/sdk-react";
import { hideBackButton, offBackButtonClick } from "@telegram-apps/sdk";

import { isMobileDevice } from "./tools/isMobile";

export async function telegramSDKInit(options: {
  debug: boolean;
  eruda: boolean;
}): Promise<void> {
  setDebug(options.debug);

  initSDK();

  options.eruda &&
    void import("eruda").then(({ default: eruda }) => {
      eruda.init();

      const getSafeAreaInsetBottom = (): number => {
        try {
          const probe = document.createElement("div");
          probe.style.position = "fixed";
          probe.style.bottom = "0";
          probe.style.left = "0";
          probe.style.width = "0";
          probe.style.height = "constant(safe-area-inset-bottom)";
          probe.style.height = "env(safe-area-inset-bottom)";
          probe.style.pointerEvents = "none";
          document.body.appendChild(probe);
          const value = parseFloat(getComputedStyle(probe).height) || 0;
          document.body.removeChild(probe);
          return Number.isFinite(value) ? value : 0;
        } catch {
          return 0;
        }
      };

      const positionErudaButton = () => {
        const BUTTON_SIZE = 50;
        const MARGIN = 16;
        const EXTRA_BOTTOM_OFFSET = 24;
        const safeBottom = getSafeAreaInsetBottom();

        const x = Math.max(MARGIN, window.innerWidth - BUTTON_SIZE - MARGIN);
        const y = Math.max(
          MARGIN,
          window.innerHeight - BUTTON_SIZE - (EXTRA_BOTTOM_OFFSET + safeBottom)
        );

        eruda.position({ x, y });
      };

      positionErudaButton();

      window.addEventListener("resize", positionErudaButton);
      window.addEventListener("orientationchange", positionErudaButton);
      window.visualViewport?.addEventListener("resize", positionErudaButton);
    });

  mountBackButton.ifAvailable();
  restoreInitData();

  if (miniApp.mountSync.isAvailable()) {
    miniApp.mountSync();
    bindThemeParamsCssVars();
  }

  // Mount swipe behavior and disable vertical swipes if available
  if (mountSwipeBehavior?.isAvailable?.()) {
    mountSwipeBehavior();
    if (disableVerticalSwipes?.isAvailable?.()) {
      disableVerticalSwipes();
    }
  }

  mountViewport.isAvailable() &&
    mountViewport().then(async () => {
      bindViewportCssVars();

      if (requestFullscreen.isAvailable() && isMobileDevice()) {
        await requestFullscreen();
      }
    });
}

export const handleBackButton = (callback: () => void) => {
  showBackButton();
  const handler = () => callback();
  onBackButtonClick(handler);
  return () => {
    try {
      offBackButtonClick(handler);
    } catch {}
    try {
      hideBackButton();
    } catch {}
  };
};
