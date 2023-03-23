import "./assets/Global.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Services from "./pages/services/Services";
import SignUp from "./pages/sign_up/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";
import Login from "./pages/log_in/Login";
import User_Dashboard from "./pages/user_dashboard/User_Dashboard";
import CreateBook from "./pages/book_store/create_book/CreateBook.jsx";
import CreateHousing from "./pages/housing/create_housing/CreateHousing.jsx";
import CreateRide from "./pages/ride/create_ride/CreateRide.jsx";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/services" element={<Services />} />
      <Route path="/sign_up" element={<SignUp />} />
      <Route path="/dashboard" element={<User_Dashboard />} />
      <Route path="/create_book" element={<CreateBook />} />
      <Route path="/create_housing" element={<CreateHousing />} />
      <Route path="/create_ride" element={<CreateRide />} />
    </Routes>
  );
}

export default App;
