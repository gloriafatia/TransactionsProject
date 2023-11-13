import { ConfigProvider, theme } from "antd";
import { HelmetProvider } from "react-helmet-async";
import { Provider as ReduxProvider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { PersistGate } from "redux-persist/integration/react";
import { AuthProvider } from "./contexts/AuthContext";
import { store, persistor } from "./store/redux";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Loading from "./components/Loading/Loading";
import LoginPage from "./pages/Auth/LoginPage/LoginPage";
import Register from "./pages/Auth/RegisterPage/RegisterPage";
import DashboardPage from "./pages/Dashboard/Dashboard";
import Transactions from "./components/Transactions/Transactions";
import Sidebar from "./components/Sidebar/Sidebar";
import UserManagement from "./components/UserManagement/UserManagemnt";
import { useState } from "react";

const themeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: "#3d7cef",
  },
};

const reactQueryClient = new QueryClient();

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <HelmetProvider>
        <ReduxProvider store={store}>
          <PersistGate loading={<Loading />} persistor={persistor}>
            <AuthProvider>
              <QueryClientProvider client={reactQueryClient}>
                <ConfigProvider theme={themeConfig}>
                  <BrowserRouter>
                    <Routes>
                      <Route index element={<LoginPage />} />
                      <Route path="Register" element={<Register />} />
                      <Route path="LoginPage" element={<LoginPage />} />

                      <Route path="/Home" element={<Sidebar />}>
                        <Route path="Transaction" element={<Transactions />} />
                        <Route
                          path="UserManagement"
                          element={<UserManagement />}
                        />
                        <Route path="Dashboard" element={<DashboardPage />} />
                      </Route>
                    </Routes>
                  </BrowserRouter>
                </ConfigProvider>
              </QueryClientProvider>
            </AuthProvider>
          </PersistGate>
        </ReduxProvider>
      </HelmetProvider>
    </div>
  );
};

export default App;
