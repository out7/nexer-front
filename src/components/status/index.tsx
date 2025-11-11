import { useAuthContext } from '@/contexts/AuthContext'
import {
	differenceInDays,
	differenceInHours,
	differenceInMinutes,
} from 'date-fns'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { StatusIcon } from './StatusIcon'
import styles from './styles.module.scss'

const Status = () => {
	const { t } = useTranslation('nav')
	const { user } = useAuthContext()

	const subscription = user?.customerSubscription
	const status = subscription?.status || 'none'

	const timeLeft = useMemo(() => {
		if (!subscription?.endDate) return null
		const end = new Date(subscription.endDate)
		const now = new Date()
		const diff = end.getTime() - now.getTime()

		if (diff <= 0) return null

		const days = differenceInDays(end, now)
		const hours = differenceInHours(end, now) % 24
		const minutes = differenceInMinutes(end, now) % 60

		return { days, hours, minutes, totalDiff: diff }
	}, [subscription?.endDate])

	const getDayEnding = (days: number) => {
		if (days >= 11 && days <= 19) return 'дней'
		const lastDigit = days % 10
		if (lastDigit === 1) return 'день'
		if (lastDigit >= 2 && lastDigit <= 4) return 'дня'
		return 'дней'
	}

	const getHourEnding = (hours: number) => {
		if (hours >= 11 && hours <= 19) return 'часов'
		const lastDigit = hours % 10
		if (lastDigit === 1) return 'час'
		if (lastDigit >= 2 && lastDigit <= 4) return 'часа'
		return 'часов'
	}

	const getMinuteEnding = (minutes: number) => {
		if (minutes >= 11 && minutes <= 19) return 'минут'
		const lastDigit = minutes % 10
		if (lastDigit === 1) return 'минута'
		if (lastDigit >= 2 && lastDigit <= 4) return 'минуты'
		return 'минут'
	}

	const formattedTimeLeft = useMemo(() => {
		if (!timeLeft) return null

		const FIVE_YEARS_MS = 5 * 365 * 24 * 60 * 60 * 1000
		if (timeLeft.totalDiff > FIVE_YEARS_MS) {
			return 'бессрочно'
		}

		if (timeLeft.days >= 2) {
			return `${timeLeft.days} ${getDayEnding(timeLeft.days)}`
		} else if (timeLeft.days === 1) {
			return `1 день ${timeLeft.hours} ${getHourEnding(timeLeft.hours)}`
		} else if (timeLeft.hours >= 1) {
			return `${timeLeft.hours} ${getHourEnding(timeLeft.hours)} ${timeLeft.minutes} ${getMinuteEnding(timeLeft.minutes)}`
		} else {
			return `${timeLeft.minutes} ${getMinuteEnding(timeLeft.minutes)}`
		}
	}, [timeLeft])

	const iconColor = useMemo(() => {
		switch (status) {
			case 'active':
				return '#17C964'
			case 'expired':
				return '#C91717'
			case 'none':
			default:
				return '#B2B2B2'
		}
	}, [status])

	return (
		<div className={styles.container}>
			<div className={styles.status}>
				<p className={styles.statusTitle}>{t('status.title')}</p>
				<div className={styles.statusContent}>
					<StatusIcon type={status} color={iconColor} />
					<p className={styles.statusText}>{t(`status.${status}`)}</p>
				</div>
			</div>
			<div className={styles.items}>
				<div className={styles.item}>
					<p className={styles.itemTitle}>{t('status.daysLeft')}</p>
					<p className={styles.itemText}>
						{status === 'none' ? '-' : formattedTimeLeft || '-'}
					</p>
				</div>
				<div className={styles.item}>
					<p className={styles.itemTitle}>{t('status.expiresAt')}</p>
					<p className={styles.itemText}>
						{status === 'none'
							? '-'
							: subscription?.endDate
								? t('status.date', { date: new Date(subscription.endDate) })
								: '-'}
					</p>
				</div>
				<div className={styles.item}>
					<p className={styles.itemTitle}>{t('status.traffic')}</p>
					<p className={styles.itemText}>
						{status === 'active' ? t('status.unlimited') : '-'}
					</p>
				</div>
			</div>
		</div>
	)
}

export default Status
