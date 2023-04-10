import { useState } from "react";
import Students from "../../components/register/student_register/StudentRegister";
import Patients from "../../components/register/patient_register/PatientRegister";
import { useNavigate } from "react-router-dom";
import { TbArrowNarrowLeft } from "react-icons/tb";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [signupOption, setSignupOption] = useState(null);
  const handleSignUp = (option) => {
    setSignupOption(option);
  };

  return (
    <div className="sign-up">
      <div className="container">
        <div className="top-nav">
          <button className="button" onClick={() => navigate(-1)}>
            <TbArrowNarrowLeft className="arrow" />
            Go Back
          </button>
          <img className="logo" alt="" src="/logo-v2.svg" />
        </div>
        <img className="right-child" alt="" src="/assets/images/sign-up.svg" />
      </div>
      <div className="SignUp-section">
        <div className="section-title">
          <span>Get started</span>
          <span className="span">.</span>
        </div>
        {signupOption === "student" && <Students />}
        {signupOption === "patient" && <Patients />}

        <button
          className={`btn ${
            signupOption ? "btn-secondary" : "btn-primary"
          } sign-button ${signupOption === "student" ? "selected" : ""}`}
          onClick={() => handleSignUp("student")}
        >
          Sign Up as Student
        </button>
        <button
          className={`btn btn-secondary sign-button ${
            signupOption === "patient" ? "selected" : ""
          }`}
          onClick={() => handleSignUp("patient")}
        >
          Sign Up as Patient
        </button>
        <div className="account-question">
          <span>{`Have an account? `}</span>
          <a className="link" href="/sign-in">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
