import { useState } from "react";
import { TbArrowNarrowLeft, TbCheck } from "react-icons/tb";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import "./SignIn.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const eyeIcon = showPassword ? (
    <AiFillEyeInvisible size={20} />
  ) : (
    <AiFillEye size={20} />
  );


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError("");
    
  
    // Check email validity and set form validity accordingly
    const emailPattern = /^[a-zA-Z0-9.]/;
    if (emailPattern.test(event.target.value) && password.length >= 6) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError("");
    // Check password validity and set form validity accordingly
    if (event.target.value.length >= 6 && email.length > 0) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }  
  };
  

 
  const handleRememberMeChange = (event) => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate email and password
    let emailValid = true;
    let passwordValid = true;
    const emailPattern = /^[a-zA-Z0-9.]/;
    if (!emailPattern.test(email)) {
      setEmailError("Invalid email format. Only letters (a-z), numbers (0-9), and periods (.) are allowed.");
      emailValid = false;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      passwordValid = false;
    }

    // If email and password are valid, submit the form

    const univemail= email + "@aaup.edu.ps";
    if (emailValid && passwordValid) {
      console.log(`UserName : ${email}, Email: ${univemail}, Password: ${password}, Remember me: ${rememberMe}`);
      // TODO: Implement sign in logic
    }
  };

  return (
    <div className="sign-in">
      <div className="container">
        <div className="top-nav">
          <button className="button"  onClick={() => window.history.back()}>
            <TbArrowNarrowLeft className="arrow" /> 
            Go Back
          </button>
          <img className="logo" alt="" src="/logo-v2.svg" />
        </div>
        <img className="right-child" alt="" src="/assets/images/sign-in.svg" />
      </div>
      <div className="SignIn-section">
        <div className="section-title">
          <span>Welcome Back</span>
          <span className="span">.</span>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              name="username"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <div className="input-container-option" onClick={() => document.getElementsByName('username')[0].focus()}>Email</div>
            <div className="UnivSuffix">@aaup.edu.ps</div>
          </div>
          {emailError && <div className="wrong-info">{emailError}</div>}
          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              name="password"
              onChange={handlePasswordChange}
              required
            />
            <div className="input-container-option" onClick={() => document.getElementsByName('password')[0].focus()}>Password</div>
            <button type="button" className="eye-wrapper" onClick={() => setShowPassword(!showPassword)}>
              {eyeIcon}


                </button>
            </div>
            {passwordError && <div className="wrong-info">{passwordError}</div>}

          <div className="choices">
    
          <div checked={rememberMe} onClick={handleRememberMeChange} className="checking">
          <div className={`checkbox ${rememberMe ? 'true' : ''}`}>
          {rememberMe && ( <TbCheck /> )}
      </div>
      <div className="remember-me">Remember Me</div>
    </div>
            <a className="link" href="/forgot-password">Forgot Password?</a>
          </div>
          {/* <button type="submit" className={`btn btn-primary sign ${!isFormValid ? 'disabled' : ''}`}>  */}
          <button type="submit" className={`btn btn-primary sign`}>
           Sign In
          </button>

        </form>
        <div className="account-question">
          <span>{`Don’t have an account? `}</span>
          <a className="link" href="/sign-up">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
