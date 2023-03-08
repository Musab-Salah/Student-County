import "./assets/Global.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Services from "./pages/services/Services";
import SignUp from "./pages/sign_up/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import { UniversitiesProvider } from "./helpers/UniversityCommon";
import { CollegesProvider } from "./helpers/CollegeCommon";
import { StudentsProvider } from "./helpers/StudentCommon";

function App() {
  return (
    <StudentsProvider>
      <CollegesProvider>
        <UniversitiesProvider>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/sign_up" element={<SignUp />} />
          </Routes>
        </UniversitiesProvider>
      </CollegesProvider>
    </StudentsProvider>
  );
}

export default App;
