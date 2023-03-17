import "./assets/Global.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Services from "./pages/services/Services";
import SignUp from "./pages/sign_up/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import { UniversitiesProvider } from "./helpers/UniversityCommon";
import { CollegesProvider } from "./helpers/CollegeCommon";
import { UsersProvider } from "./helpers/UsersCommon";
import Login from "./pages/log_in/Login";
import User_Dashboard from "./pages/user_dashboard/User_Dashboard";
import AuthService from "./services/AuthServices";
import AuthVerify from "./helpers/AuthVerify";
import { AuthProvider } from "./services/auth/AuthContext";

function App() {
  //logOut = this.logOut.bind(this.props);

  // const logOut = () => {
  //   AuthService.logout();
  // };

  return (
    <AuthProvider>
      <CollegesProvider>
        <UniversitiesProvider>
          <UsersProvider>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/services" element={<Services />} />
              <Route path="/sign_up" element={<SignUp />} />
              <Route path="/user_dashboard" element={<User_Dashboard />} />
            </Routes>
            {/* //<AuthVerify logOut={logOut} /> */}
          </UsersProvider>
        </UniversitiesProvider>
      </CollegesProvider>
    </AuthProvider>
  );
}

export default App;
