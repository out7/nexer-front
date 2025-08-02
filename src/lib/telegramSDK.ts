/* eslint-disable */
import {
  bindThemeParamsCssVars,
  bindViewportCssVars,
  init as initSDK,
  isFullscreen,
  miniApp,
  mountBackButton,
  mountViewport,
  onBackButtonClick,
  requestFullscreen,
  restoreInitData,
  setDebug,
  showBackButton,
} from "@telegram-apps/sdk-react";

import { isMobileDevice } from "./tools/isMobile";

export async function telegramSDKInit(debug: boolean): Promise<void> {
  setDebug(debug);

  initSDK();

  mountBackButton.ifAvailable();
  restoreInitData();

  if (miniApp.mountSync.isAvailable()) {
    miniApp.mountSync();
    bindThemeParamsCssVars();
  }

  mountViewport.isAvailable() &&
    mountViewport().then(async () => {
      bindViewportCssVars();

      if (requestFullscreen.isAvailable() && isMobileDevice()) {
        await requestFullscreen();
        console.log(isFullscreen());
      }
    });
}

export const handleBackButton = (callback: () => void) => {
  showBackButton();
  onBackButtonClick(() => {
    console.log("back button clicked");
    callback();
  });
};
