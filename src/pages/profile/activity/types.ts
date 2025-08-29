export type ActivityItem = {
	id: string
	customerId: string
	type: string
	meta?: {
		period?: number
		daysAdded?: number
		days?: number
		grantedDays?: number
		expiredAt?: string
	} | null
	createdAt: string
}

export type ActivityType =
	| 'subscription_purchased'
	| 'subscription_extended'
	| 'subscription_expired'
	| 'referral_bonus_added'
	| 'trial_activated'
	| 'bonus_claimed'
