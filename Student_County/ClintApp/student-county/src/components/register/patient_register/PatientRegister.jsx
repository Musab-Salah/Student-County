import { useState, useEffect } from "react";
import { TbCheck } from "react-icons/tb";
import { RiArrowDownSLine } from "react-icons/ri";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiFillExclamationCircle,
} from "react-icons/ai";

import "../../../pages/sign_up/SignUp.css";

const Patients = () => {
  // State Hook
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("+970");
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [gender, setGender] = useState("");

  const [showDropdownPrefix, setShowDropdownPrefix] = useState(false);
  const [showDropdownGender, setShowDropdownGender] = useState(false);

  // Error Hook
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [AcceptPolicyError, setAcceptPolicyError] = useState("");
  const [genderError, setGenderError] = useState("");
  const eyeIcon = showPassword ? (
    <AiFillEyeInvisible size={20} />
  ) : (
    <AiFillEye size={20} />
  );

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !event.target.closest(".custom-select") &&
        !event.target.closest(".input-container-option")
      ) {
        setShowDropdownPrefix(false);
        setShowDropdownGender(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showDropdownPrefix, showDropdownGender]);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    setFirstNameError("");

    const firstNamePattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    if (
      firstNamePattern.test(event.target.value) &&
      lastName.length > 0 &&
      email.length > 0 &&
      password.length >= 6 &&
      acceptPolicy
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    setLastNameError("");

    const lastNamePattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    if (
      lastNamePattern.test(event.target.value) &&
      firstName.length > 0 &&
      email.length > 0 &&
      password.length >= 6 &&
      acceptPolicy
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const handlePhonePrefixChange = (prefix) => {
    setPhonePrefix(prefix);
    setShowDropdownPrefix(false);

    const phoneSuffix = document.getElementById("phone-suffix");
    if (phoneSuffix) {
      phoneSuffix.textContent = prefix;
    }
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
    setPhoneNumberError("");
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError("");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      emailPattern.test(event.target.value) &&
      password.length >= 6 &&
      acceptPolicy
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError("");

    if (event.target.value.length >= 6 && email.length > 0 && acceptPolicy) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const handleGenderChange = (value) => {
    setGender(value);
    setShowDropdownGender(false);
    setGenderError("");
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordError("");

    // Check password and confirm password validity and set form validity accordingly
    if (
      event.target.value === password &&
      email.length > 0 &&
      password.length >= 6
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const handleAcceptPolicyChange = (event) => {
    setAcceptPolicy(!acceptPolicy);
    setAcceptPolicyError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate first name, last name, univ, email, password, ID number, phone number, password confirmation, gender, and the rules.
    let firstNameValid = true;
    let lastNameValid = true;
    let emailValid = true;
    let passwordValid = true;
    let phoneNumberValid = true;
    let passwordConfirmationValid = true;
    let genderValid = true;
    let acceptPolicyValid = true;

    const firstNamePattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    if (!firstNamePattern.test(firstName)) {
      setFirstNameError(
        "Please enter a valid name, for example: Musab Al Hotaree"
      );
      firstNameValid = false;
    }

    const lastNamePattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    if (!lastNamePattern.test(lastName)) {
      setLastNameError(
        "Please enter a valid name, for example: Musab Al Hotaree"
      );
      lastNameValid = false;
    }

    const emailPattern = /^[a-zA-Z0-9.]/;
    if (!emailPattern.test(email)) {
      setEmailError(
        "Invalid email format. Only letters (a-z), numbers (0-9), and periods (.) are allowed."
      );
      emailValid = false;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      passwordValid = false;
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
      firstNameValid &&
        lastNameValid &&
        emailValid &&
        passwordValid &&
        phoneNumberValid &&
        passwordConfirmationValid &&
        genderValid &&
        acceptPolicyValid
    );

    if (isFormValid) {
      console.log(
        "firstName:",
        firstName,
        "lastName:",
        lastName,
        "email:",
        email,
        "password:",
        password,
        "showPassword:",
        showPassword,
        "phoneNumber:",
        phonePrefix,
        "phonePrefix :",
        phoneNumber,
        "confirmPassword:",
        confirmPassword,
        "acceptPolicy:",
        acceptPolicy,
        "isFormValid:",
        isFormValid,
        "gender:",
        gender
      );
      // submit the form
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="input-group">
        <div className="input-container-group">
          <div className="input-container">
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={handleFirstNameChange}
              required
            />
            <div
              className="input-container-option"
              htmlFor="firstName"
              onClick={() => document.getElementsByName("firstName")[0].focus()}
            >
              First Name
            </div>
          </div>
          {firstNameError && (
            <span className="wrong-info">
              <AiFillExclamationCircle />
              {firstNameError}
            </span>
          )}
        </div>
        <div className="input-container-group">
          <div className="input-container">
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={handleLastNameChange}
              required
            />
            <div
              className="input-container-option"
              htmlFor="lastName"
              onClick={() => document.getElementsByName("lastName")[0].focus()}
            >
              Last Name
            </div>
          </div>
          {lastNameError && (
            <span className="wrong-info">
              <AiFillExclamationCircle />
              {lastNameError}
            </span>
          )}
        </div>
      </div>

      <div className="input-container" style={{ border: "0", gap: 0 }}>
        <div className="PhoneSuffix">
          <div className="custom-select">
            <div
              className="selected-option"
              style={{
                border: 0,
                padding: "var(--padding-3xs) var(--padding-xl)",
                gap: "10px",
              }}
              defaultValue={phonePrefix}
              onClick={() => setShowDropdownPrefix(!showDropdownPrefix)}
            >
              {phonePrefix === "" ? (
                <div
                  className="input-container-option input-dropdown"
                  htmlFor="phone-prefix"
                >
                  Select prefix
                </div>
              ) : (
                <div>
                  <div
                    className="input-container-option input-dropdown input-selected"
                    htmlFor="phone-prefix"
                    style={{
                      padding: 0,
                    }}
                  >
                    {phonePrefix}
                  </div>
                </div>
              )}
              <RiArrowDownSLine className="arrow-icon" />
            </div>

            {showDropdownPrefix && (
              <div className="options" id="input-dropdown">
                <div
                  className="option"
                  onClick={() => handlePhonePrefixChange("+970")}
                >
                  +970
                </div>
                <div
                  className="option"
                  onClick={() => handlePhonePrefixChange("+972")}
                >
                  +972
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="input-container">
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
          {" "}
          <AiFillExclamationCircle /> {phoneNumberError}{" "}
        </span>
      )}

      <div className="input-container">
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <div
          className="input-container-option"
          htmlFor="email"
          onClick={() => document.getElementsByName("email")[0].focus()}
        >
          Email
        </div>
      </div>
      {emailError && (
        <span className="wrong-info">
          {" "}
          <AiFillExclamationCircle /> {emailError}{" "}
        </span>
      )}

      <div className="custom-select">
        <div
          className="selected-option"
          onClick={() => setShowDropdownGender(!showDropdownGender)}
        >
          {gender === "" ? (
            <div class="input-container-option input-dropdown" for="id-number">
              Select gender
            </div>
          ) : (
            <div>
              <div class="input-container-option input-dropdown-title">
                Select gender
              </div>
              <div
                class="input-container-option input-dropdown input-selected"
                for="id-number"
              >
                {gender}
              </div>
            </div>
          )}
          <RiArrowDownSLine className="arrow-icon" />
        </div>
        {showDropdownGender && (
          <div className="options" id="input-dropdown">
            <div
              className="option-title"
              onClick={() => handleGenderChange("")}
            >
              Select gender
            </div>
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
      {genderError && (
        <span className="wrong-info">
          {" "}
          <AiFillExclamationCircle /> {genderError}{" "}
        </span>
      )}

      <div className="input-group">
        <div className="input-container-group">
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
              onClick={() => document.getElementsByName("password")[0].focus()}
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
          {passwordError && <div className="wrong-info">{passwordError}</div>}
        </div>
        <div className="input-container-group">
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
          {" "}
          <AiFillExclamationCircle /> {AcceptPolicyError}{" "}
        </span>
      )}

      <button type="submit" className={`btn btn-primary sign`}>
        Sign Up
      </button>
    </form>
  );
};

export default Patients;
