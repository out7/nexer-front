import CopyField from '@/components/copy-field'
import { ActivitySkeleton } from '@/components/skeleton'
import Status from '@/components/status'
import { useAuthContext } from '@/contexts/AuthContext'
import { usePlatform } from '@/hooks/usePlatform'
import ArrowRight from '@/icons/ArrowRight'
import Card from '@/icons/Card'
import { CheckCircleLinear as CheckIcon } from '@/icons/Check'
import Close from '@/icons/Close'
import GiftIcon from '@/icons/Gift'
import HistoryIcon from '@/icons/History'
import LinkIcon from '@/icons/Link'
import Refresh from '@/icons/Refresh'
import Watch from '@/icons/Watch'
import { api } from '@/lib/axios'
import { initData } from '@telegram-apps/sdk-react'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ActivityItem } from './activity/types'
import styles from './styles.module.scss'

const ProfilePage = () => {
	const { user } = useAuthContext()
	const navigate = useNavigate()
	const platform = usePlatform()

	const paddingTop = platform === 'pc' ? '70px' : '20px'

	const tgUser = useMemo(() => {
		try {
			const raw = initData.raw()
			if (!raw) return null
			const params = new URLSearchParams(raw)
			const userParam = params.get('user')
			if (!userParam) return null
			const parsed = JSON.parse(decodeURIComponent(userParam))
			return parsed as {
				id: number
				username?: string
				first_name?: string
				last_name?: string
				photo_url?: string
			}
		} catch {
			return null
		}
	}, [])

	const username = useMemo(() => {
		const fromApi = (user as any)?.username as string | undefined
		const fromTg = tgUser?.username
		const fallbackName = [tgUser?.first_name, tgUser?.last_name]
			.filter(Boolean)
			.join(' ')
		return fromApi || fromTg || fallbackName || 'username'
	}, [tgUser, user])

	const avatarUrl = tgUser?.photo_url || ''
	const telegramId = user?.telegramId ?? tgUser?.id

	const subscription = user?.customerSubscription
	const isActive = subscription?.status === 'active'
	const subscriptionUrl = (subscription as any)?.subscriptionUrl as
		| string
		| undefined

	const [activity, setActivity] = useState<ActivityItem[]>([])
	const [isActivityLoading, setIsActivityLoading] = useState(true)

	useEffect(() => {
		let cancelled = false
		const load = async () => {
			try {
				setIsActivityLoading(true)
				const { data } = await api.get<ActivityItem[]>('/activity')
				const items = [...data].sort(
					(a, b) =>
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				)
				if (!cancelled) setActivity(items.slice(0, 5))
			} catch {
				if (!cancelled) setActivity([])
			} finally {
				if (!cancelled) setIsActivityLoading(false)
			}
		}
		load()
		return () => {
			cancelled = true
		}
	}, [])

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
			<div className={styles.card}>
				<div className={styles.userRow}>
					<div className={styles.avatarWrap}>
						{avatarUrl ? (
							// eslint-disable-next-line @next/next/no-img-element
							<img src={avatarUrl} alt='avatar' className={styles.avatar} />
						) : (
							<div className={styles.avatarFallback}>
								<span>
									{username
										.split(' ')
										.map(w => w[0])
										.join('')
										.slice(0, 2)
										.toUpperCase()}
								</span>
							</div>
						)}
					</div>
					<div className={styles.userMeta}>
						<div className={styles.username}>@{username}</div>
						{telegramId ? (
							<div className={styles.userId}>ID: {telegramId}</div>
						) : null}
					</div>
				</div>
			</div>

			<div className={styles.status}>
				<Status />
			</div>

			{isActive && subscriptionUrl ? (
				<div className={styles.card}>
					<div className={styles.cardHeader}>
						<div className={styles.cardHeaderLeft}>
							<span className={styles.sectionIcon}>
								<LinkIcon />
							</span>
							<span className={styles.cardTitle}>Ссылка на подписку</span>
						</div>
					</div>
					<div className={styles.snippetWrap}>
						<CopyField value={subscriptionUrl} className={styles.snippet} />
						<div className={styles.snippetHint}>
							Подсказка: используйте эту ссылку для ручного подключения
						</div>
					</div>
				</div>
			) : null}

			{/* Activity preview */}
			<div className={styles.card}>
				<div className={styles.cardHeader}>
					<div className={styles.cardHeaderLeft}>
						<span className={styles.sectionIcon}>
							<HistoryIcon />
						</span>
						<span className={styles.cardTitle}>Активность</span>
					</div>
					<button
						className={styles.historyAction}
						onClick={() => navigate('/profile/activity')}
					>
						<span>История</span>
						<ArrowRight />
					</button>
				</div>
				<div className={styles.activityList}>
					{isActivityLoading ? (
						<ActivitySkeleton />
					) : (
						activity.map(item => (
							<div key={Math.random()} className={styles.activityItem}>
								<div className={styles.activityIcon}>
									{renderActivityIcon(item)}
								</div>
								<div className={styles.activityTexts}>
									<div className={styles.activityTitle}>
										{renderActivityTitle(item)}
									</div>
									<div className={styles.activityDate}>
										{dayjs(item.createdAt).format('DD.MM.YYYY HH:mm')}
									</div>
								</div>
							</div>
						))
					)}
					{!isActivityLoading && activity.length === 0 ? (
						<div className={styles.activityEmpty}>Пока нет активности</div>
					) : null}
				</div>
			</div>
		</div>
	)
}

export default ProfilePage
