import { Route, Routes } from "react-router-dom";
import { ClientProviders } from "./providers/ClientProviders";
import DefaultLayout from "./layouts/default";
import MainPage from "./pages/index";
import TariffsPage from "./pages/tariffs";
import ReferralsPage from "./pages/referrals";
import AllReferralsPage from "./pages/referrals/all";
import ProfilePage from "./pages/profile";
import ActivityPage from "./pages/profile/activity";

function App() {
  return (
    <ClientProviders>
      <DefaultLayout>
        <Routes>
          <Route element={<MainPage />} path="/" />
          <Route element={<TariffsPage />} path="/tariffs" />
          <Route element={<ReferralsPage />} path="/referrals" />
          <Route element={<AllReferralsPage />} path="/referrals/all" />
          <Route element={<ProfilePage />} path="/profile" />
          <Route element={<ActivityPage />} path="/profile/activity" />
        </Routes>
      </DefaultLayout>
    </ClientProviders>
  );
}

export default App;
