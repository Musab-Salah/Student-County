import "./assets/Global.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Services from "./pages/services/Services";
import SignUp from "./pages/sign_up/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import { UniversitiesProvider } from "./helpers/UniversityCommon";
import { CollegesProvider } from "./helpers/CollegeCommon";
import { UsersProvider } from "./helpers/UsersCommon";
import { BooksProvider } from "./helpers/BookStoreCommon";
import Login from "./pages/log_in/Login";
import User_Dashboard from "./pages/user_dashboard/User_Dashboard";
import AuthVerify from "./services/AuthServices/AuthVerify";
import { AuthProvider } from "./helpers/AuthCommon";
import CreateBook from "./pages/book_store/create_book/CreateBook.jsx";
import CreateHousing from "./pages/housing/create_housing/CreateHousing.jsx";
import { HousingsProvider } from "./helpers/HousingCommon";
import { RidesProvider } from "./helpers/RideCommon";
import { DestinationsProvider } from "./helpers/DestinationCommon";
import CreateRide from "./pages/ride/create_ride/CreateRide.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <CollegesProvider>
          <UniversitiesProvider>
            <UsersProvider>
              <DestinationsProvider>
                <RidesProvider>
                  <HousingsProvider>
                    <BooksProvider>
                      <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/sign_up" element={<SignUp />} />
                        <Route
                          path="/user_dashboard"
                          element={<User_Dashboard />}
                        />
                        <Route path="/create_book" element={<CreateBook />} />
                        <Route
                          path="/create_housing"
                          element={<CreateHousing />}
                        />
                        <Route path="/create_ride" element={<CreateRide />} />
                      </Routes>
                    </BooksProvider>
                  </HousingsProvider>
                </RidesProvider>
              </DestinationsProvider>
            </UsersProvider>
          </UniversitiesProvider>
        </CollegesProvider>
        <AuthVerify />
      </AuthProvider>
    </>
  );
}

export default App;
