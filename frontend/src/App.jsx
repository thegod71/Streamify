import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import { Toaster } from "react-hot-toast";
import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthuser.js";
import Layout from "./components/Layout.jsx";
import { useThemeStore } from "./store/useThemeStore.js";
function App() {
  //-------- Starting Phase------------
  // const {
  //   data: authData,
  //   isLoading,
  // } = useQuery({
  //   queryKey: ["authUser"],
  //   queryFn: async () => {
  //     const res = await axiosInstance.get("/auth/me");
  //     return res.data;
  //   },
  //   retry: false,
  // });

  //const authUser = authData?.user;
  // we do .user because from backend we sent data in the res.status(201).json({ success: true, user: newUser })
  //-------------------------------------------------------------------
  const { isLoading, authUser } = useAuthUser();
  const isAuthenticated = Boolean(authUser);
  const isOnboard = authUser?.isOnboarded;
  const { theme } = useThemeStore();
  if (isLoading) return <PageLoader />;
  
  return (
    <div data-theme={theme}> 
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOnboard ? (
             <Layout>
              <HomePage />
             </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to={(isOnboard) ? "/" : "/onboarding"} />} /> 
        <Route
          path="/signup"
          element={!isAuthenticated ? <SignUpPage /> : <Navigate to={(isOnboard) ? "/" : "/onboarding"} />}
        />
        <Route
          path="/notifications"
          element={
            isAuthenticated ? <NotificationsPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/call"
          element={isAuthenticated ? <CallPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/chat"
          element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/onboarding" 
          element={
            isAuthenticated ? (!isOnboard ? <OnboardingPage /> : <Navigate to="/" />) : <Navigate to="/login" />
          }
        />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
