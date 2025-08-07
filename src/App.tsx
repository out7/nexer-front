import { Route, Routes } from "react-router-dom";
import { AuthGuard } from "./components/auth/AuthGuard";
import { AuthProvider } from "./contexts/AuthContext";

import MainPage from "./pages/index";
import TariffsPage from "./pages/tariffs";
import ReferralsPage from "./pages/referrals";
import ProfilePage from "./pages/profile";
import DefaultLayout from "./layouts/default";

function App() {
  return (
    <div>
      <AuthProvider>
        <AuthGuard>
          <DefaultLayout>
            <Routes>
              <Route element={<MainPage />} path="/" />
              <Route element={<TariffsPage />} path="/tariffs" />
              <Route element={<ReferralsPage />} path="/referrals" />
              <Route element={<ProfilePage />} path="/profile" />
            </Routes>
          </DefaultLayout>
        </AuthGuard>
      </AuthProvider>
    </div>
  );
}

export default App;
