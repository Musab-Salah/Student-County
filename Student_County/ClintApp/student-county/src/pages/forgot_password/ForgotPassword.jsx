import { useState } from "react";
import { TbArrowNarrowLeft } from "react-icons/tb";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError("");

    // Check email validity and set form validity accordingly
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(event.target.value)) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate email
    let emailValid = true;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError("Invalid email format. Please enter a valid email address in the format username@example.com");
      emailValid = false;
    }

    // If email is valid, submit the form
    if (emailValid) {
      console.log(`Email: ${email}`);
      // TODO: Implement forgot password logic
    }
  };

  return (
    <div className="forgot-password">
      <div className="container">
        <div className="top-nav">
          <button className="button" onClick={() => window.history.back()}>
            <TbArrowNarrowLeft className="arrow" />
            Go Back
          </button>
          <img className="logo" alt="" src="/logo-v2.svg" />
        </div>
        <img className="right-child" alt="" src="/assets/images/forgot-password.svg" />
      </div>
      <div className="forgot-password-section">
        <div className="section-title">
          <span>Forgot Your Password</span>
          <span className="span">?</span>
        </div>
        <div className="section-description">Please provide us with the email address linked to your account, and we will send you an email containing instructions for resetting your password.</div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <div className="input-container-option" onClick={() => document.getElementsByName('email')[0].focus()}>Email</div>
          </div>
          {emailError && <div className="wrong-info">{emailError}</div>}

          <button type="submit" className={`btn btn-primary reset ${!isFormValid ? 'disabled' : ''}`}>
            Reset Password
          </button>
        </form>
        <div className="account-question">
          <span>{`Remembered your password? `}</span>
          <a className="link" href="/sign-in">Sign In</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
