import { Route, Routes } from "react-router-dom";

import MainPage from "./pages/index";
import TariffsPage from "./pages/tariffs";
import ReferralsPage from "./pages/referrals";
import ProfilePage from "./pages/profile";
import DefaultLayout from "./layouts/default";

function App() {
  return (
    <div>
      <DefaultLayout>
        <Routes>
          <Route element={<MainPage />} path="/" />
          <Route element={<TariffsPage />} path="/tariffs" />
          <Route element={<ReferralsPage />} path="/referrals" />
          <Route element={<ProfilePage />} path="/profile" />
        </Routes>
      </DefaultLayout>
    </div>
  );
}

export default App;
