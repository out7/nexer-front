import ScrollToTop from '@/components/scroll/ScrollToTop'
import { Route, Routes } from 'react-router-dom'
import DefaultLayout from './layouts/default'
import MainPage from './pages/index'
import ProfilePage from './pages/profile'
import ActivityPage from './pages/profile/activity'
import ReferralsPage from './pages/referrals'
import AllReferralsPage from './pages/referrals/all'
import TariffsPage from './pages/tariffs'
import { ClientProviders } from './providers/ClientProviders'

function App() {
	return (
		<ClientProviders>
			<DefaultLayout>
				<ScrollToTop />
				<Routes>
					<Route element={<MainPage />} path='/' />
					<Route element={<TariffsPage />} path='/tariffs' />
					<Route element={<ReferralsPage />} path='/referrals' />
					<Route element={<AllReferralsPage />} path='/referrals/all' />
					<Route element={<ProfilePage />} path='/profile' />
					<Route element={<ActivityPage />} path='/profile/activity' />
				</Routes>
			</DefaultLayout>
		</ClientProviders>
	)
}

export default App
