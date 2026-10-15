import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './pages/styles/global.css';
import Home from "./pages/Home";
import Main from "./pages/Main";
import Requests from "./pages/Requests";
import Market from "./pages/Market";
import Profile from "./pages/Profile";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./action/user";
import { authAdmin } from "./action/adminAuth";
import PrivateRoute from './components/PrivateRoute'; // Импортируем PrivateRoute
import EmailVerifiedPage from "./pages/EmailVerifiedPage";

import Dashboard from './dashboard/pages/Dashboard'
import LoginAdmin from "./dashboard/pages/LoginAdmin";
// import PrivateRouteAdmin from "./components/PrivateRouteAdmin";
import HomeAdmin from "./dashboard/pages/HomeAdmin";
import Employees from "./dashboard/pages/Employees";
import Students from "./dashboard/pages/Students";
import Hostel from "./dashboard/pages/Hostel";
import MarketAdmin from "./dashboard/pages/Market";
import Infoblock from "./dashboard/pages/Infoblock";
import Settings from "./dashboard/pages/Settings";
import Personal from "./dashboard/pages/Personal";
import Selection from "./dashboard/pages/Selection";
import Agreement from "./dashboard/pages/Agreement";
import Payment from "./dashboard/pages/Payment";
import ActionCheck from "./dashboard/pages/ActionCheck";
import VisaInvitation from "./dashboard/pages/VisaInvitation";
import ArrivalNotification from "./dashboard/pages/ArrivalNotification";
import Prikaz from "./dashboard/pages/Prikaz";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
    dispatch(authAdmin());
  }, [dispatch]);

  const isAuth = useSelector(state => state.user.isAuth);
  const isAuthAdmin = useSelector(state => state.admin.isAuthAdmin);

  return (
    <Router>
      <Routes>
        {/* Публичные маршруты */}
        <Route path="/" element={!isAuth ? <Home /> : <Navigate to="/main" />} />
        <Route path="/auth-admin" element={!isAuthAdmin ? <LoginAdmin /> : <Navigate to="/dashboard" />} />

        {/* Защищенные маршруты админки */}
        
         {/* Защищенные маршруты админки */}
         <Route path="/dashboard" element={<PrivateRouteAdmin><Dashboard /></PrivateRouteAdmin>} />
        <Route path="/dashboard/home-admin" element={<PrivateRouteAdmin><HomeAdmin /></PrivateRouteAdmin>} />
        <Route path="/dashboard/employees" element={<PrivateRouteAdmin><Employees /></PrivateRouteAdmin>} />
        <Route path="/dashboard/students" element={<PrivateRouteAdmin><Students /></PrivateRouteAdmin>} />
        <Route path="/dashboard/hostel" element={<PrivateRouteAdmin><Hostel /></PrivateRouteAdmin>} />
        <Route path="/dashboard/market" element={<PrivateRouteAdmin><MarketAdmin /></PrivateRouteAdmin>} />
        <Route path="/dashboard/info-block" element={<PrivateRouteAdmin><Infoblock /></PrivateRouteAdmin>} />
        <Route path="/dashboard/settings" element={<PrivateRouteAdmin><Settings /></PrivateRouteAdmin>} />
        <Route path="/dashboard/stages/personal" element={<PrivateRouteAdmin><Personal /></PrivateRouteAdmin>} />
        <Route path="/dashboard/stages/selection" element={<PrivateRouteAdmin><Selection /></PrivateRouteAdmin>} />
        <Route path="/dashboard/stages/agreement" element={<PrivateRouteAdmin><Agreement /></PrivateRouteAdmin>} />
        <Route path="/dashboard/stages/payment" element={<PrivateRouteAdmin><Payment /></PrivateRouteAdmin>} />
        <Route path="/dashboard/stages/action-check" element={<PrivateRouteAdmin><ActionCheck /></PrivateRouteAdmin>} />
        <Route path="/dashboard/stages/visa-invitation" element={<PrivateRouteAdmin><VisaInvitation /></PrivateRouteAdmin>} />
        <Route path="/dashboard/stages/arrival-notification" element={<PrivateRouteAdmin><ArrivalNotification /></PrivateRouteAdmin>} />
        <Route path="/dashboard/stages/prikaz" element={<PrivateRouteAdmin><Prikaz /></PrivateRouteAdmin>} />

        
        {/* <Route path="/dashboard" element={
          <PrivateRouteAdmin>
            <Dashboard />
          </PrivateRouteAdmin>
        } /> */}
        
        
        

        {/* Защищенные маршруты */}
        <Route path="/main" element={
          <PrivateRoute>
            <Main />
          </PrivateRoute>
        } />
        
        {/* Защищенные маршруты */}
        <Route path="/email-verified" element={<EmailVerifiedPage />} />
        
        <Route path="/requests" element={
          <PrivateRoute>
            <Requests />
          </PrivateRoute>
        } />
        
        <Route path="/market" element={
          <PrivateRoute>
            <Market />
          </PrivateRoute>
        } />
        
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />


        {/* Если пользователь пытается попасть на несуществующий маршрут */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
