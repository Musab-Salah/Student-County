import React from 'react';
import  "../heading/Heading.css";
import logo from '../heading/Logo.png';


import { Link,NavLink } from "react-router-dom";


const Heading = () => {

  return (
    <>

<nav className="navbar navbar-expand-lg ">
    <div className="container-fluid ">
        <Link to="/234" className="navbar-brand for-brand">
        <img src={logo}  alt=""/>
        </Link>
        <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse  " id="navbarCollapse">
            <div className="navbar-nav  ">
                <NavLink  to="/" className="nav-item for-item nav-link ">Home</NavLink>
                <NavLink to="/services" className="nav-item for-item nav-link">Services</NavLink>
                <NavLink to="/65" className="nav-item for-item nav-link">Messages</NavLink>
                
            </div>
            <div className="for-btn ms-auto">
                <Link to="/sign_up" className="btn btn-primary ">Get Started</Link>
            </div>
        </div>
    </div>
</nav>


    </>
  )
}

export default Heading
