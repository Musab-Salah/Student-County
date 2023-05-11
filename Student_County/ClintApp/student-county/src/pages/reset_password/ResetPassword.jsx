import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";

import "./ResetPassword.css";

const ResetPassword = () => {
  const { resetPassword, AuthError, SendEmailResetPass } = useAuth();
  const [userBo, setUser] = useState();
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const { param1, param2 } = useParams();

  useEffect(() => {
    setUser({
      ...userBo,
      email: param1,
      token: param2,
    });
    // eslint-disable-next-line
  }, []);

  const handlePasswordChange = (event) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&*])(?=.{6})/;
    if (!passwordRegex.test(event.target.value)) {
      setPasswordError(
        "must be at least 6 characters,one non alphanumeric character,one digit ('0'-'9'),one uppercase ('A'-'Z')"
      );
    } else {
      setUser({
        ...userBo,
        newPassword: event.target.value,
      });
      setPasswordError(false);
    }
  };
  const handleConfirmPasswordChange = (event) => {
    if (event.target.value !== userBo.newPassword) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setUser({
        ...userBo,
        confirmPassword: event.target.value,
      });
      setConfirmPasswordError(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate email
    if (!passwordError && !confirmPasswordError) {
      console.log(userBo);

      resetPassword(userBo);
    }
  };

  return (
    <div className="forgot-password">
      <div className="container">
        <div className="top-nav">
          <img className="logo" alt="" src="./logo-v2.svg" />
        </div>
        <img
          className="right-child"
          alt=""
          src="./assets/images/forgot-password.svg"
        />
      </div>
      <div className="forgot-password-section">
        <div className="section-title">
          <span>Forgot Your Password</span>
          <span className="span">?</span>
        </div>
        <div className="section-description">
          Please enter the new password.
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              name="password"
              onChange={handlePasswordChange}
              required
            />
            <div
              className="input-container-option"
              onClick={() => document.getElementsByName("password")[0].focus()}
            >
              Password
            </div>
          </div>
          {passwordError && <div className="wrong-info">{passwordError}</div>}
          <div className="input-container">
            <input
              type="text"
              name="confirm_password"
              onChange={handleConfirmPasswordChange}
              required
            />
            <div
              className="input-container-option"
              onClick={() =>
                document.getElementsByName("confirm_password")[0].focus()
              }
            >
              Confirm Password
            </div>
          </div>
          {confirmPasswordError && (
            <div className="wrong-info">{confirmPasswordError}</div>
          )}
          {AuthError && <div className="wrong-info">{AuthError}</div>}
          {SendEmailResetPass && (
            <div className="success-info">
              {"The Password Reset successfully"}
            </div>
          )}

          <button
            type="submit"
            className={`btn btn-primary reset ${
              confirmPasswordError ? "disabled" : ""
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

export default ResetPassword;
