import './assets/Global.css';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Services from "./pages/services/Services";
import SignUp from "./pages/sign_up/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";



function App () {
  
    return (
    <Routes>
              <Route exact path="/" element={<Home />} />
              <Route  path="/services" element={<Services />  } />
              <Route  path="/sign_up" element={<SignUp /> } />
    </Routes> 
    )
  

}

export default App;
