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
      eruda.position({ x: window.innerWidth - 50, y: 0 });
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
  onBackButtonClick(() => {
    callback();
  });
};
