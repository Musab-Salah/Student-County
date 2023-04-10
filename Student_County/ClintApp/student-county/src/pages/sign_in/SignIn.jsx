import { useState } from "react";
import { TbArrowNarrowLeft, TbCheck } from "react-icons/tb";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import useAuth from "../../hooks/useAuth";

import "./SignIn.css";

const SignIn = () => {
  const { logout, login, AuthError } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  let [bo, setbo] = useState();
  const eyeIcon = showPassword ? (
    <AiFillEyeInvisible size={20} />
  ) : (
    <AiFillEye size={20} />
  );

  const setUserName = (e) => {
    setbo({
      ...bo,
      userName: e.target.value,
    });
  };
  const setPassword = (e) => {
    setbo({
      ...bo,
      password: e.target.value,
    });
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(bo);
  };

  return (
    <>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <div className="sign-in">
        <div className="container">
          <div className="top-nav">
            <button className="button" onClick={() => navigate(-1)}>
              <TbArrowNarrowLeft className="arrow" />
              Go Back
            </button>
            <img className="logo" alt="" src="/logo-v2.svg" />
          </div>
          <img
            className="right-child"
            alt=""
            src="/assets/images/sign-in.svg"
          />
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
                onChange={setUserName}
                required
              />
              <div
                className="input-container-option"
                onClick={() =>
                  document.getElementsByName("username")[0].focus()
                }
              >
                UserName
              </div>
            </div>
            <div className="input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={setPassword}
                required
              />
              <div
                className="input-container-option"
                onClick={() =>
                  document.getElementsByName("password")[0].focus()
                }
              >
                Password
              </div>
              <button
                type="button"
                className="eye-wrapper"
                onClick={() => setShowPassword(!showPassword)}
              >
                {eyeIcon}
              </button>
            </div>

            <div className="choices">
              <div
                checked={rememberMe}
                onClick={handleRememberMeChange}
                className="checking"
              >
                <div className={`checkbox ${rememberMe ? "true" : ""}`}>
                  {rememberMe && <TbCheck />}
                </div>
                <div className="remember-me">Remember Me</div>
              </div>
              <a className="link" href="/forgot-password">
                Forgot Password?
              </a>
            </div>
            {/* <button type="submit" className={`btn btn-primary sign ${!isFormValid ? 'disabled' : ''}`}>  */}
            <button type="submit" className={`btn btn-primary sign`}>
              Sign In
            </button>
          </form>
          {AuthError && <div className="wrong-info">{AuthError}</div>}
          <div className="account-question">
            <span>{`Don’t have an account? `}</span>
            <Link to="/sign_up" className="link">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
