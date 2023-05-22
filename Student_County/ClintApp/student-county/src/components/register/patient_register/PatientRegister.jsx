import { useState, useEffect, useMemo } from "react";
import { TbCheck } from "react-icons/tb";
import { RiArrowDownSLine } from "react-icons/ri";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiFillExclamationCircle,
} from "react-icons/ai";
import useAuth from "../../../hooks/useAuth";

import "../../../pages/sign_up/SignUp.css";
import useLoader from "../../../hooks/useLoader";

const Patients = () => {
  // State Hook
  const { patientRegister, AuthError, isSuccessfully } = useAuth();
  const { AuthLoader } = useLoader();
  const [showPassword, setShowPassword] = useState(false);
  const [phonePrefix, setPhonePrefix] = useState("+970");
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [gender, setGender] = useState("");
  const [userBo, setUser] = useState();
  const [username, setUsername] = useState("");

  const [showDropdownPrefix, setShowDropdownPrefix] = useState(false);
  const [showDropdownGender, setShowDropdownGender] = useState(false);

  // Error Hook
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [AcceptPolicyError, setAcceptPolicyError] = useState("");
  const [genderError, setGenderError] = useState("");

  const eyeIcon = showPassword ? (
    <AiFillEyeInvisible size={20} />
  ) : (
    <AiFillEye size={20} />
  );

  useMemo(() => {
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
    const nameRegex = /^([a-zA-Z])(?=.{3,})/;
    if (!nameRegex.test(event.target.value)) {
      setFirstNameError("Please enter a valid name, for example: Musab");
    } else {
      setUser({
        ...userBo,
        firstName: event.target.value,
      });
      setFirstNameError(false);
    }
  };

  const handleLastNameChange = (event) => {
    const nameRegex = /^([a-zA-Z])(?=.{3,})/;
    if (!nameRegex.test(event.target.value)) {
      setLastNameError("Please enter a valid name, for example: Salah");
    } else {
      setUser({
        ...userBo,
        lastName: event.target.value,
      });
      setLastNameError(false);
    }
  };
  const handleUsernameChange = (event) => {
    var result = event.target.value.replace(/[^a-z.0-9]/gi, "");
    setUser({
      ...userBo,
      userName: result,
    });
    setUsername(result);
  };
  const handlePhonePrefixChange = (prefix) => {
    setPhonePrefix(prefix);
    setShowDropdownPrefix(false);
  };

  const handlePhoneNumberChange = (event) => {
    setUser({
      ...userBo,
      phoneNumber: phonePrefix + "-" + event.target.value,
    });
  };

  const handleEmailChange = (event) => {
    const emailPattern = /^(?=.*[@])(?=.{6,})(?=.{6,})/;

    if (!emailPattern.test(event.target.value)) {
      setEmailError(
        "Please enter a valid name, for example: example@example.com"
      );
    } else {
      setUser({
        ...userBo,
        email: event.target.value,
      });
      setEmailError("");
    }
  };

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
        password: event.target.value,
      });
      setPasswordError(false);
    }
  };

  const handleGenderChange = (value) => {
    setUser({
      ...userBo,
      gender: value,
    });
    setGender(value);
    setGenderError(false);
    setShowDropdownGender(false);
  };

  const handleConfirmPasswordChange = (event) => {
    if (event.target.value !== userBo.password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError(false);
    }
  };

  const handleAcceptPolicyChange = () => {
    setAcceptPolicy(!acceptPolicy);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    userBo.gender
      ? setGenderError(false)
      : setGenderError("Please select your gender.");

    if (
      !genderError &&
      !firstNameError &&
      !lastNameError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError
    ) {
      !acceptPolicy
        ? setAcceptPolicyError("Please accept the terms and conditions.")
        : patientRegister(userBo);
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
              onChange={handleFirstNameChange}
              maxLength={10}
              required
            />
            <div
              className="input-container-option"
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
              onChange={handleLastNameChange}
              maxLength={10}
              required
            />
            <div
              className="input-container-option"
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
              {!phonePrefix ? (
                <div className="input-container-option input-dropdown">
                  Select prefix
                </div>
              ) : (
                <div>
                  <div
                    className="input-container-option input-dropdown input-selected"
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
            type="number"
            id="phone-number"
            name="phone-number"
            onChange={handlePhoneNumberChange}
            maxLength={13}
            required
          />
          <div
            className="input-container-option"
            onClick={() =>
              document.getElementsByName("phone-number")[0].focus()
            }
          >
            Phone Number
          </div>
        </div>
      </div>

      <div className="input-group">
        <div className="input-container-group">
          <div className="input-container">
            <input
              type="username"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              maxLength={20}
              required
            />
            <div
              className="input-container-option"
              onClick={() => document.getElementsByName("username")[0].focus()}
            >
              Username
            </div>
          </div>
        </div>
        <div className="input-container-group">
          <div className="input-container">
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleEmailChange}
              maxLength={50}
              required
            />
            <div
              className="input-container-option"
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
        </div>
      </div>

      <div className="custom-select">
        <div
          className="selected-option"
          onClick={() => setShowDropdownGender(!showDropdownGender)}
        >
          {!gender ? (
            <div className="input-container-option input-dropdown">
              Select gender
            </div>
          ) : (
            <div>
              <div className="input-container-option input-dropdown-title">
                Select gender
              </div>
              <div className="input-container-option input-dropdown input-selected">
                {gender}
              </div>
            </div>
          )}
          <RiArrowDownSLine className="arrow-icon" />
        </div>
        {showDropdownGender && (
          <div className="options" id="input-dropdown">
            <div className="option-title">Select gender</div>
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
              onChange={handleConfirmPasswordChange}
              required
            />
            <div
              className="input-container-option"
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

      {AuthError && (
        <span className="wrong-info">
          <AiFillExclamationCircle />
          {AuthError}
        </span>
      )}
      <button type="submit" className={`btn btn-primary sign`}>
        <div
          className="loader"
          style={{ display: AuthLoader ? "block" : "none" }}
        />
        Sign Up
      </button>
      {isSuccessfully && (
        <span className="success-info">
          <AiFillExclamationCircle />
          {"successful registration please confirm the email"}
        </span>
      )}
    </form>
  );
};

export default Patients;
