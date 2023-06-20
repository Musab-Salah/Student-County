import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoutes from "./certificates/PrivateRoutes";
import { lazy, Suspense } from "react";
import Home from "./pages/home/Home";
import SignUp from "./pages/sign_up/SignUp";
import SignIn from "./pages/sign_in/SignIn.jsx";
import ForgotPassword from "./pages/forgot_password/ForgotPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import Success from "./pages/success/Success.jsx";
import ResetPassword from "./pages/reset_password/ResetPassword.jsx";

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

        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}

export default App;
