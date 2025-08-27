import { useAuthContext } from '@/contexts/AuthContext'
import { usePlatform } from '@/hooks/usePlatform'
import Android from '@/icons/Android'
import ChevronDown from '@/icons/ChevronDown'
import Desktop from '@/icons/Desktop'
import Iphone from '@/icons/Iphone'
import Shield from '@/icons/Shield'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { items as localItems } from './items'
import styles from './styles.module.scss'
import { App, Platform } from './types'

const Guide = () => {
	const platform = usePlatform()
	const { user } = useAuthContext()
	const [selectedTab, setSelectedTab] = useState<Platform>(platform)
	const [expandedApp, setExpandedApp] = useState<string | null>(null)
	const [items, setItems] = useState<any>(null)

	useEffect(() => {
		setSelectedTab(platform)
	}, [platform])

	useEffect(() => {
		const loadItems = async () => {
			try {
				const res = await fetch('https://miniapp.nexervpn.run/app-config.json')
				if (!res.ok) throw new Error('Ошибка загрузки')
				const data = await res.json()

				const normalized = Array.isArray(data) ? data : [data]

				setItems(normalized)
			} catch (err) {
				console.error(
					'Не удалось скачать app-config.json, используем локальные:',
					err
				)

				const normalizedLocal = Array.isArray(localItems)
					? localItems
					: [localItems]
				setItems(normalizedLocal)
			}
		}

		loadItems()
	}, [])

	if (!items) {
		return <div className={styles.container}>Загрузка...</div>
	}

	const subUrl = user?.customerSubscription?.subscriptionUrl

	const tabs = [
		{ id: 'ios' as const, icon: <Iphone />, label: 'iOS' },
		{ id: 'android' as const, icon: <Android />, label: 'Android' },
		{ id: 'pc' as const, icon: <Desktop />, label: 'PC' },
	]

	const currentPlatformApps = (items?.[0]?.[selectedTab] ?? []) as App[]

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Руководство по установке</h1>
			<div className={styles.tabs}>
				{tabs.map(tab => (
					<button
						key={tab.id}
						className={styles.tab}
						data-selected={selectedTab === tab.id}
						onClick={() => setSelectedTab(tab.id)}
					>
						{tab.icon}
						<span>{tab.label}</span>
					</button>
				))}
			</div>
			<div className={styles.apps}>
				{currentPlatformApps.map(app => (
					<div key={app.id} className={styles.app}>
						<div
							className={styles.appHeader}
							onClick={() =>
								setExpandedApp(expandedApp === app.id ? null : app.id)
							}
						>
							<div className={styles.appInfo}>
								<div className={styles.appIcon}>
									<Shield />
								</div>
								<div className={styles.appDescription}>
									<h3>{app.name}</h3>
									<div className={styles.additionalInfo}>
										{app.isFeatured && (
											<span className={styles.chip}>Рекомендуется</span>
										)}
										{!app.isFeatured && (
											<span className={styles.chipAlternative}>
												Альтернатива
											</span>
										)}
										<span>Бесплатно</span>
									</div>
								</div>
							</div>
							<button
								className={styles.expandButton}
								data-expanded={expandedApp === app.id}
							>
								<ChevronDown />
							</button>
						</div>
						<AnimatePresence>
							{expandedApp === app.id && (
								<motion.div
									className={styles.appContent}
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: 'auto', opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
									transition={{ duration: 0.3, ease: 'easeInOut' }}
								>
									<div className={styles.divider} />
									<motion.div
										className={styles.steps}
										initial={{ y: -20 }}
										animate={{ y: 0 }}
										transition={{ duration: 0.3, ease: 'easeOut' }}
									>
										<div className={styles.step}>
											<div className={styles.stepNumber}>1</div>
											<div className={styles.stepContent}>
												<div className={styles.stepHeader}>
													<h4>Установка приложения</h4>
													<p>
														{
															app.installationStep.description[
																selectedTab === 'ios' ? 'ru' : 'ru'
															]
														}
													</p>
												</div>
												<div className={styles.stepButtons}>
													{app.installationStep.buttons.map((button, index) => (
														<a
															key={index}
															href={button.buttonLink}
															className={styles.button}
															target='_blank'
															rel='noopener noreferrer'
														>
															{button.buttonText.ru}
														</a>
													))}
												</div>
											</div>
										</div>

										<div className={styles.step}>
											<div className={styles.stepNumber}>2</div>
											<div className={styles.stepContent}>
												<div className={styles.stepHeader}>
													<h4>Добавление подписки</h4>
													<p>
														{
															app.addSubscriptionStep.description[
																selectedTab === 'ios' ? 'ru' : 'ru'
															]
														}
													</p>
												</div>
												{user?.customerSubscription?.subscriptionUrl ? (
													platform === 'pc' ? (
														<a
															href={`https://miniapp.nexervpn.run/deeplink?redirect_to=${app.urlScheme}${subUrl}`}
															className={styles.button}
															target='_blank'
															rel='noopener noreferrer'
														>
															Добавить подписку
														</a>
													) : (
														<a
															href={`https://miniapp.nexervpn.run/deeplink?redirect_to=${app.urlScheme}${encodeURIComponent(
																String(subUrl)
															)}`}
															className={styles.button}
															target='_blank'
															rel='noopener noreferrer'
														>
															Добавить подписку
														</a>
													)
												) : (
													<button className={styles.button} disabled>
														Добавить подписку
													</button>
												)}
											</div>
										</div>

										<div className={styles.step}>
											<div className={styles.stepNumber}>3</div>
											<div className={styles.stepContent}>
												<div className={styles.stepHeader}>
													<h4>Подключитесь и используйте</h4>
													<p>
														{
															app.connectAndUseStep.description[
																selectedTab === 'ios' ? 'ru' : 'ru'
															]
														}
													</p>
												</div>
											</div>
										</div>
									</motion.div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				))}
			</div>
		</div>
	)
}

export default Guide
