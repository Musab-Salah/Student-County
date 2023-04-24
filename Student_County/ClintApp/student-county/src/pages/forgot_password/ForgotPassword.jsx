import { useState } from "react";
import { TbArrowNarrowLeft } from "react-icons/tb";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [bo, setbo] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const { forgetPassword, AuthError, SendEmailResetPass } = useAuth();

  const handleEmailChange = (event) => {
    setbo({
      ...bo,
      email: event.target.value,
    });
    setEmailError("");
    // Check email validity and set form validity accordingly
    const emailPattern = /^(?=.*[@])(?=.{6,})(?=.{6,})/;
    if (emailPattern.test(event.target.value)) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate email
    if (!isFormValid) {
      setEmailError(
        "Invalid email format. Please enter a valid email address in the format username@example.com"
      );
    }
    // If email is valid, submit the form
    else {
      //console.log(`Email: ${bo.email}`);
      forgetPassword(bo.email);
      // TODO: Implement forgot password logic
    }
  };

  return (
    <div className="forgot-password">
      <div className="container">
        <div className="top-nav">
        <Link className="button" to={"/sign_in"}>
              <TbArrowNarrowLeft className="arrow" />
              Go Back
            </Link>
          <img className="logo" alt="" src="/logo-v2.svg" />
        </div>
        <img
          className="right-child"
          alt=""
          src="/assets/images/forgot-password.svg"
        />
      </div>
      <div className="forgot-password-section">
        <div className="section-title">
          <span>Forgot Your Password</span>
          <span className="span">?</span>
        </div>
        <div className="section-description">
          Please provide us with the email address linked to your account, and
          we will send you an email containing instructions for resetting your
          password.
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              name="email"
              onChange={handleEmailChange}
              required
            />
            <div
              className="input-container-option"
              onClick={() => document.getElementsByName("email")[0].focus()}
            >
              Email
            </div>
          </div>
          {emailError && <div className="wrong-info">{emailError}</div>}
          {AuthError && <div className="wrong-info">{AuthError}</div>}
          {SendEmailResetPass && <div className="success-info">{"The email has been sent successfully"}</div>}

          <button
            type="submit"
            className={`btn btn-primary reset ${
              !isFormValid ? "disabled" : ""
            }`}
          >
            Reset Password
          </button>
        </form>
        <div className="account-question">
          <span>{`Remembered your password? `}</span>
          <Link className="link" to="/sign_in">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
