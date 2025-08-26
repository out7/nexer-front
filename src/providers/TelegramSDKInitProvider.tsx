import type { PropsWithChildren } from 'react'

import { useClientOnce } from '@/hooks/useClientOnce'
import { useTelegramMock } from '@/hooks/useTelegramMock'
import { telegramSDKInit } from '@/lib/telegramSDK'

export function TelegramSDKInitProvider({ children }: PropsWithChildren) {
	useTelegramMock()

	useClientOnce(() => {
		const isDebug = import.meta.env.VITE_DEBUG === 'true'
		const isEruda = import.meta.env.VITE_ERUDA === 'true'
		telegramSDKInit({
			debug: isDebug,
			eruda: isEruda,
		})
	})

	return <>{children}</>
}
