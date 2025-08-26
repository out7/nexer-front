import Bolt from '@/icons/Bolt'
import Devices from '@/icons/Devices'
import Infinity from '@/icons/Infinity'
import StarsIcon from '@/icons/Stars'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import styles from './styles.module.scss'

const Premium = () => {
	const { t, ready } = useTranslation('nav')
	const navigate = useNavigate()

	if (!ready) {
		return <div className={styles.container}>Loading...</div>
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<StarsIcon />
				<p className={styles.title}>
					{t('premium.title')} <span>{t('premium.highlight')}</span>
				</p>
			</div>
			<div className={styles.list}>
				<div className={styles.item}>
					<Bolt />
					<p>{t('premium.features.speed')}</p>
				</div>
				<div className={styles.item}>
					<Devices />
					<p>{t('premium.features.devices')}</p>
				</div>
				<div className={styles.item}>
					<Infinity />
					<p>{t('premium.features.traffic')}</p>
				</div>
			</div>
			<button className={styles.button} onClick={() => navigate('/tariffs')}>
				{t('premium.button')}
			</button>
		</div>
	)
}

export default Premium
