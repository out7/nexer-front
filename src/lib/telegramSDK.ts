/* eslint-disable */
import { isMobileDevice } from '@/lib/tools/isMobile'

import {
	bindThemeParamsCssVars,
	bindViewportCssVars,
	disableVerticalSwipes,
	hideBackButton,
	init as initSDK,
	miniApp,
	mountBackButton,
	mountSwipeBehavior,
	mountViewport,
	offBackButtonClick,
	onBackButtonClick,
	requestFullscreen,
	restoreInitData,
	setDebug,
	showBackButton,
} from '@telegram-apps/sdk-react'

export async function telegramSDKInit(options: {
	debug: boolean
	eruda: boolean
}): Promise<void> {
	setDebug(options.debug)

	initSDK()

	options.eruda &&
		void import('eruda').then(({ default: eruda }) => {
			eruda.init()
			eruda.position({ x: window.innerWidth - 50, y: 100 })
		})

	// Mount Back Button
	mountBackButton.ifAvailable()
	restoreInitData()

	// Mount MiniApp
	if (miniApp.mountSync.isAvailable()) {
		miniApp.mountSync()
		bindThemeParamsCssVars()
	}

	// Disable Vertical Swipes
	if (mountSwipeBehavior?.isAvailable?.()) {
		mountSwipeBehavior()
		if (disableVerticalSwipes?.isAvailable?.()) {
			disableVerticalSwipes()
		}
	}

	mountViewport.isAvailable() &&
		mountViewport().then(async () => {
			bindViewportCssVars()

			// Request Fullscreen
			if (requestFullscreen.isAvailable() && isMobileDevice()) {
				await requestFullscreen()
			}
		})
}

export const handleBackButton = (callback: () => void) => {
	showBackButton()
	const handler = () => callback()
	onBackButtonClick(handler)
	return () => {
		try {
			offBackButtonClick(handler)
		} catch {}
		try {
			hideBackButton()
		} catch {}
	}
}
