import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SignUp from "./pages/sign_up/SignUp";
import SignIn from "./pages/sign_in/SignIn.jsx";
import ForgotPassword from "./pages/forgot_password/ForgotPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import CreateBook from "./pages/book_store/create_book/CreateBook.jsx";
import CreateHousing from "./pages/housing/create_housing/CreateHousing.jsx";
import CreateRide from "./pages/ride/create_ride/CreateRide.jsx";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/sign_in" element={<SignIn />} />
      <Route path="/sign_up" element={<SignUp />} />
      <Route path="/fogot_password" element={<ForgotPassword />} />

      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create_book" element={<CreateBook />} />
        <Route path="/create_housing" element={<CreateHousing />} />
        <Route path="/create_ride" element={<CreateRide />} />
      </Route>
    </Routes>
  );
}

export default App;
