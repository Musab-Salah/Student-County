import React from "react";
import Heading from "../../components/heading/Heading";
import "../home/Home.css";
import img from "../home/amico.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Heading />
      <div className="container">
        <div className="big-text">
          Make your university life easier with Student County.
          <div className="small-text">
            Using Student County, you can save money, time, and earn money while
            at university.
          </div>
          <Link to="/login" className="btn btn-primary ">
            Sign in
          </Link>
          <span className="small-text">or</span>
          <Link to="/sign_up" className="btn btn-primary ">
            Sign Up
          </Link>
        </div>

        <img src={img} alt="" />
      </div>
    </>
  );
};

export default Home;
