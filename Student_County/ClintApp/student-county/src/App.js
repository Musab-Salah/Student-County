import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SignUp from "./pages/sign_up/SignUp";
import SignIn from "./pages/sign_in/SignIn.jsx";
import ForgotPassword from "./pages/forgot_password/ForgotPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import PrivateRoutes from "./certificates/PrivateRoutes";
import Success from "./pages/success/Success.jsx";
import ResetPassword from "./pages/reset_password/ResetPassword.jsx";
import ChatController from "./components/chat/ChatController";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/chat" element={<ChatController />} />
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
    </Routes>
  );
}

export default App;
