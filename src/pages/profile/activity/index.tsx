import { ActivitySkeleton } from '@/components/skeleton'
import { usePlatform } from '@/hooks/usePlatform'
import Card from '@/icons/Card'
import { CheckCircleLinear as CheckIcon } from '@/icons/Check'
import Close from '@/icons/Close'
import GiftIcon from '@/icons/Gift'
import Refresh from '@/icons/Refresh'
import Watch from '@/icons/Watch'
import { api } from '@/lib/axios'
import { handleBackButton } from '@/lib/telegramSDK'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import { ActivityItem } from './types'

const ActivityPage = () => {
	const navigate = useNavigate()
	const platform = usePlatform()
	const [activity, setActivity] = useState<ActivityItem[]>([])
	const [isLoading, setIsLoading] = useState(true)

	const paddingTop = platform === 'pc' ? '60px' : '10px'

	useEffect(() => {
		let cancelled = false
		const load = async () => {
			try {
				setIsLoading(true)
				const { data } = await api.get<ActivityItem[]>('/activity')
				const items = [...data].sort(
					(a, b) =>
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				)
				if (!cancelled) setActivity(items)
			} catch {
				if (!cancelled) setActivity([])
			} finally {
				if (!cancelled) setIsLoading(false)
			}
		}
		load()
		return () => {
			cancelled = true
		}
	}, [])

	useEffect(() => {
		const dispose = handleBackButton(() => navigate(-1))
		return () => {
			dispose?.()
		}
	}, [navigate])

	const renderActivityTitle = (item: ActivityItem): string => {
		const meta = item.meta || {}
		const period = meta.period ? Number(meta.period) : undefined
		const daysAdded = meta.daysAdded ? Number(meta.daysAdded) : undefined
		const days = meta.days ? Number(meta.days) : undefined
		// const grantedDays = meta.grantedDays ? Number(meta.grantedDays) : undefined

		switch (item.type) {
			case 'subscription_purchased':
				return period ? `Куплен Премиум на ${period} дн.` : 'Куплен Премиум'
			case 'subscription_extended':
				return daysAdded
					? `Продлён Премиум +${daysAdded} дн.`
					: 'Продлён Премиум'
			case 'subscription_expired':
				return 'Срок Премиума истёк'
			case 'referral_bonus_added':
				return days ? `Начислен бонус +${days} дн. (друг)` : 'Начислен бонус'
			case 'bonus_claimed':
				return days ? `Активирован бонус +${days} дн.` : 'Активирован бонус'
			case 'trial_activated':
				return 'Активирован пробный период'
			default:
				return 'Ошибка загрузки'
		}
	}

	const renderActivityIcon = (item: ActivityItem) => {
		switch (item.type) {
			case 'subscription_purchased':
				return <Card />
			case 'subscription_extended':
				return <Refresh />
			case 'subscription_expired':
				return <Close />
			case 'trial_activated':
				return <Watch />
			case 'bonus_claimed':
				return <CheckIcon color='#fff' />
			case 'referral_bonus_added':
				return <GiftIcon />
			default:
				return <CheckIcon color='#fff' />
		}
	}

	return (
		<div className={styles.container} style={{ paddingTop }}>
			<div className={styles.header}>
				<h2 className={styles.title}>История активности</h2>
			</div>
			<div className={styles.list}>
				{isLoading ? (
					<ActivitySkeleton />
				) : (
					activity.map(item => (
						<div key={Math.random()} className={styles.item}>
							<div className={styles.icon}>{renderActivityIcon(item)}</div>
							<div className={styles.texts}>
								<div className={styles.itemTitle}>
									{renderActivityTitle(item)}
								</div>
								<div className={styles.itemDate}>
									{dayjs(item.createdAt).format('DD.MM.YYYY HH:mm')}
								</div>
							</div>
						</div>
					))
				)}
				{!isLoading && activity.length === 0 ? (
					<div className={styles.empty}>Пока нет записей</div>
				) : null}
			</div>
		</div>
	)
}

export default ActivityPage
