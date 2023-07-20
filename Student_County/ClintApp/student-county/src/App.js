import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoutes from "./certificates/PrivateRoutes";
import {  Suspense } from "react";
import Home from "./pages/home/Home";
import SignUp from "./pages/sign_up/SignUp";
import SignIn from "./pages/sign_in/SignIn.jsx";
import ForgotPassword from "./pages/forgot_password/ForgotPassword";
import Success from "./pages/success/Success.jsx";
import ResetPassword from "./pages/reset_password/ResetPassword.jsx";
import BooksSection from "./components/services/books/books_section/BooksSection";
import RideSection from "./components/services/Ride/ride_section/RideSection";
import PatientSection from "./components/services/Patient/patient_section/PatientSection";
import HousingSection from "./components/services/Housing/housing_section/HousingSection";
import ToolSection from "./components/services/Tools/tool_section/ToolSection";
import Overview from "./components/overview/Overview.jsx";
import ChatController from "./components/chat/ChatController";
import Setting from "./components/setting/Setting.jsx";
import TermsOfService from "./pages/agreement/TermsOfService";
import PrivacyPolicy from "./pages/agreement/PrivacyPolicy";
// const Home = lazy(() => import("./pages/home/Home"));
// const SignUp = lazy(() => import("./pages/sign_up/SignUp"));
// const SignIn = lazy(() => import("./pages/sign_in/SignIn"));
// const ForgotPassword = lazy(() =>
//   import("./pages/forgot_password/ForgotPassword")
// );
// const Success = lazy(() => import("./pages/success/Success"));
// const ResetPassword = lazy(() =>
//   import("./pages/reset_password/ResetPassword")
// );
// const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));

function App() {
  
  return (
    <Suspense fallback={<div className="spinner" />}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/sign_in" element={<SignIn />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route
          path="/reset_password/:param1/:param2"
          element={<ResetPassword />}
        />
        <Route path="/success" element={<Success />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard/book" element={<BooksSection />} />
          <Route path="/dashboard/ride" element={<RideSection />} />
          <Route path="/dashboard/patient" element={<PatientSection />} />
          <Route path="/dashboard/housing" element={<HousingSection />} />
          <Route path="/dashboard/tool" element={<ToolSection />} />
          <Route path="/dashboard/overview" element={<Overview />} />
          <Route path="/dashboard/chat" element={<ChatController />} />
          <Route path="/dashboard/setting" element={<Setting />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}

export default App;
