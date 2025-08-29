import Gift from '@/components/gift'
import Guide from '@/components/guide'
import Help from '@/components/help'
import Notes from '@/components/notes'
import Premium from '@/components/premium'
import Status from '@/components/status'
import { useAuthContext } from '@/contexts/AuthContext'
import { usePlatform } from '@/hooks/usePlatform'
import '@/styles/variables.scss'
import styles from './styles.module.scss'

const MainPage = () => {
	const platform = usePlatform()
	const marginTop = platform === 'pc' ? '' : '-35px'
	const paddingTop = platform === 'pc' ? '10px' : ''

	const { user } = useAuthContext()
	const subscription = user?.customerSubscription
	const isPaid = subscription?.createdVia === 'paid'

	return (
		<div className={styles.container} style={{ marginTop, paddingTop }}>
			<Status />
			<Gift />
			{!isPaid && <Premium />}
			<Guide />
			<Notes />
			<Help />
		</div>
	)
}

export default MainPage
