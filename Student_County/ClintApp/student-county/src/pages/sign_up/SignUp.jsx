import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbArrowNarrowLeft, TbCheck } from "react-icons/tb";
import { RiArrowDownSLine } from 'react-icons/ri';
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiFillExclamationCircle,
} from "react-icons/ai";

import "./SignUp.css";

const SignUp = () => {
    const navigate = useNavigate();
  
   
    // State Hooks
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [idNumber, setIdNumber] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [acceptPolicy, setAcceptPolicy] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    //const [gender, setGender] = useState("");
    const [gender, setGender] = useState("");
  
  
    // Error Hooks
    const [nameError, setNameError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [idNumberError, setIdNumberError] = useState("");
    const [AcceptPolicyError, setAcceptPolicyError] = useState("");
    const [genderError, setGenderError] = useState("");
  
    const eyeIcon = showPassword ? (
      <AiFillEyeInvisible size={20} />
    ) : (
      <AiFillEye size={20} />
    );
  
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
      setUsernameError("");
  
      // Check username validity and set form validity accordingly
      const usernamePattern = /^[a-zA-Z0-9.]/;
      if (
        usernamePattern.test(event.target.value) &&
        password.length >= 6 &&
        confirmPassword === password
      ) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };
  
    const handleNameChange = (event) => {
      setName(event.target.value);
      setNameError("");
  
      // Check name validity and set form validity accordingly
      const namePattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
      if (
        namePattern.test(event.target.value) &&
        username.length > 0 &&
        password.length >= 6 &&
        confirmPassword === password
      ) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
      setPasswordError("");
      setConfirmPasswordError("");
  
      // Check password and confirm password validity and set form validity accordingly
      if (
        event.target.value.length >= 6 &&
        username.length > 0 &&
        confirmPassword === event.target.value
      ) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };
  
    const handleConfirmPasswordChange = (event) => {
      setConfirmPassword(event.target.value);
      setConfirmPasswordError("");
  
      // Check password and confirm password validity and set form validity accordingly
      if (
        event.target.value === password &&
        username.length > 0 &&
        password.length >= 6
      ) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };
  
    const handleIdNumberChange = (event) => {
      setIdNumber(event.target.value);
    };
  
    const handlePhoneNumberChange = (event) => {
      setPhoneNumber(event.target.value);
    };
  
    const handleAcceptPolicyChange = (event) => {
      setAcceptPolicy(!acceptPolicy);
    };
  
   
    
    const [showDropdown, setShowDropdown] = useState(false);
  
    const handleGenderChange = (value) => {
      setGender(value);
      setShowDropdown(false);
    };
  
  
    const handleSubmit = (event) => {
      event.preventDefault();
    
      // Validate name, username, password, ID number, phone number, password confirmation, gender, and the rules.
      let nameValid = true;
      let usernameValid = true;
      let passwordValid = true;
      let idNumberValid = true;
      let phoneNumberValid = true;
      let passwordConfirmationValid = true;
      let genderValid = true;
      let acceptPolicyValid = true;
    
      const namePattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
      if (!namePattern.test(name)) {
        setNameError("Please enter a valid name, for example: Musab Al Hotaree");
        nameValid = false;
      }
    
      const usernamePattern = /^[a-zA-Z0-9.]/;
      if (!usernamePattern.test(username)) {
        setUsernameError(
          "Invalid username format. Only letters (a-z), numbers (0-9), and periods (.) are allowed."
        );
        usernameValid = false;
      }
    
      if (password.length < 6) {
        setPasswordError("Password must be at least 6 characters long.");
        passwordValid = false;
      }
    
      const idNumberPattern = /^[0-9]{9}$/;
      if (!idNumberPattern.test(idNumber)) {
        setIdNumberError("Please enter a valid 9-digit ID number.");
        idNumberValid = false;
      }
    
      const phoneNumberPattern = /^[0-9]{10}$/;
      if (!phoneNumberPattern.test(phoneNumber)) {
        setPhoneNumberError("Please enter a valid 10-digit phone number.");
        phoneNumberValid = false;
      }
    
      if (confirmPassword !== password) {
        setConfirmPasswordError("Passwords do not match.");
        passwordConfirmationValid = false;
      }
    
      if (gender === "") {
        setGenderError("Please select your gender.");
        genderValid = false;
      }
    
      if (!acceptPolicy) {
        setAcceptPolicyError("Please accept the terms and conditions.");
        acceptPolicyValid = false;
      }
    
      setIsFormValid(
        nameValid &&
          usernameValid &&
          passwordValid &&
          idNumberValid &&
          phoneNumberValid &&
          passwordConfirmationValid &&
          genderValid &&
          acceptPolicyValid
      );
    
      if (isFormValid) {
        // submit the form
      }
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
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleNameChange}
                required
              />
              <div
                className="input-container-option"
                htmlFor="name"
                onClick={() => document.getElementsByName("name")[0].focus()}
              >
                Full Name
              </div>
            </div>
            {nameError && (
              <span className="wrong-info">
                <AiFillExclamationCircle />
                {nameError}
              </span>
            )}
  
            <div className="input-container">
              <input
                type="text"
                id="id-number"
                name="id-number"
                value={idNumber}
                onChange={handleIdNumberChange}
                required
              />
              <div
                className="input-container-option"
                htmlFor="id-number"
                onClick={() => document.getElementsByName("id-number")[0].focus()}
              >
                ID Number
              </div>
            </div>
            {idNumberError && (
              <span className="wrong-info">
                <AiFillExclamationCircle />
                {idNumberError}
              </span>
            )}
  
            <div className="input-container" style={{ gap: "0px" }}>
              <div class="PhoneSuffix">+970</div>
              <div
                style={{
                  border: 0,
                  borderLeft: "1.5px solid var(--color-slategray)",
                }}
                className="input-container"
              >
                <input
                  type="tel"
                  id="phone-number"
                  name="phone-number"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  required
                />
                <div
                  className="input-container-option"
                  htmlFor="phone-number"
                  onClick={() =>
                    document.getElementsByName("phone-number")[0].focus()
                  }
                >
                  Phone Number
                </div>
              </div>
            </div>
            {phoneNumberError && (
              <span className="wrong-info">
                <AiFillExclamationCircle />
                {phoneNumberError}
              </span>
            )}
  
            <div className="input-container">
              <input
                type="username"
                id="username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                required
              />
              <div
                className="input-container-option"
                htmlFor="username"
                onClick={() => document.getElementsByName("username")[0].focus()}
              >
                Username
              </div>
              <div className="UnivSuffix">@aaup.edu.ps</div>
            </div>
            {usernameError && (
              <span className="wrong-info">
                <AiFillExclamationCircle />
                {usernameError}
              </span>
            )}
      <div className="custom-select">
        <div
          className="selected-option"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {gender === "" ? <span>Select gender<RiArrowDownSLine className="arrow-icon" /></span> : <span>{gender}</span>}
        </div>
        {showDropdown && (
          <div className="options" id="gender-dropdown">
            <div className="option" onClick={() => handleGenderChange("male")}>
              Male
            </div>
            <div
              className="option"
              onClick={() => handleGenderChange("female")}
            >
              Female
            </div>
          </div>
        )}
      </div>
  
            <div className="password-input-group">
              <div className="password-input-container">
                <div className="input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    name="password"
                    onChange={handlePasswordChange}
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
                {passwordError && (
                  <div className="wrong-info">{passwordError}</div>
                )}
              </div>
              <div className="password-input-container">
                <div className="input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirm-password"
                    name="confirm-password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                  />
                  <div
                    className="input-container-option"
                    htmlFor="confirm-password"
                    onClick={() =>
                      document.getElementsByName("confirm-password")[0].focus()
                    }
                  >
                    Confirm Password
                  </div>
                </div>
                {confirmPasswordError && (
                  <span className="wrong-info">
                    <AiFillExclamationCircle />
                    {confirmPasswordError}
                  </span>
                )}
              </div>
            </div>
  
            <div
              checked={acceptPolicy}
              onClick={handleAcceptPolicyChange}
              className="checking"
            >
              <div className={`checkbox ${acceptPolicy ? "true" : ""}`}>
                {acceptPolicy && <TbCheck />}
              </div>
              <div className="accept-policy">
                <span>I agree to our Student County </span>
                <a href="/terms-of-service" target="_blank">
                  terms of service
                </a>
                <span> and </span>
                <a href="/privacy-policy" target="_blank">
                  privacy policy
                </a>
              </div>
            </div>
            {AcceptPolicyError && (
              <span className="wrong-info">
                <AiFillExclamationCircle />
                {AcceptPolicyError}
              </span>
            )}
  
            {/* <button type="submit" className={`btn btn-primary sign ${!isFormValid ? 'disabled' : ''}`}>  */}
            <button type="submit" className={`btn btn-primary sign`}>
              Sign Up
            </button>
          </form>
  
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
  