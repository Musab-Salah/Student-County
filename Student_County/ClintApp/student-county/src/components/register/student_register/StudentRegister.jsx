import { useState, useEffect, useMemo } from "react";
import { TbCheck } from "react-icons/tb";
import { RiArrowDownSLine } from "react-icons/ri";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiFillExclamationCircle,
} from "react-icons/ai";
import useUniversities from "../../../hooks/useUniversities";
import useCollege from "./../../../hooks/useCollege";
import useAuth from "../../../hooks/useAuth";

import "../../../pages/sign_up/SignUp.css";

const Students = () => {
  // State Hooks
  const { Universities, UniversityError } = useUniversities();
  const { UserBo, register, UserError } = useAuth();
  const { Colleges } = useCollege();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [idNumber, setIdNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("+970"); // need check when its empty
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [gender, setGender] = useState("");
  const [selectUniv, setSelectUniv] = useState("");
  const [colleges, setColleges] = useState("");
  const [selectCollege, setSelectCollege] = useState("");
  const [userBo, setUser] = useState(UserBo);
  const [emailDomainName, setEmailDomainName] = useState();

  const [showDropdownGender, setShowDropdownGender] = useState(false);
  const [showDropdownUniv, setShowDropdownUniv] = useState(false);
  const [showDropdownCollege, setShowDropdownCollege] = useState(false);
  const [showDropdownPrefix, setShowDropdownPrefix] = useState(false);

  // Error Hooks
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [idNumberError, setIdNumberError] = useState("");
  const [AcceptPolicyError, setAcceptPolicyError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [selectUnivError, setSelectUnivError] = useState("");
  const [selectCollegeError, setSelectCollegeError] = useState("");

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
        setShowDropdownGender(false);
        setShowDropdownUniv(false);
        setShowDropdownCollege(false);
        setShowDropdownPrefix(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [
    showDropdownGender,
    showDropdownUniv,
    showDropdownCollege,
    showDropdownPrefix,
  ]);
  useMemo(() => setEmailDomainName(selectUniv.emailDomainName), [selectUniv]);

  const handleFirstNameChange = (event) => {
    const passwordRegex = /^([a-zA-Z])(?=.{6,})/;
    if (!passwordRegex.test(event.target.value)) {
      setFirstNameError(
        "must be at least 6 characters,one non alphanumeric character,one digit ('0'-'9'),one uppercase ('A'-'Z')"
      );
    } else {
      setUser({
        ...userBo,
        firstName: event.target.value,
      });
      setFirstNameError(false);
    }
  };

  const handleLastNameChange = (event) => {
    setUser({
      ...userBo,
      lastName: event.target.value,
    });
    setLastNameError("");
  };

  const handleUsernameChange = (event) => {
    var result = event.target.value.replace(/[^a-z.0-9]/gi, "");
    setUser({
      ...userBo,
      email: result,
      userName: result,
    });
    setUsername(result);
    setUsernameError("");
  };

  const handleUniversityChange = (uni) => {
    setUser({
      ...userBo,
      universityId: uni.id,
    });
    setSelectUniv(uni);
    setShowDropdownUniv(false);
  };

  const handleCollegeChange = (college) => {
    setUser({
      ...userBo,
      collegeId: college.id,
    });
    setSelectCollege(college.name);
    setSelectCollegeError("");
    setShowDropdownCollege(false);
  };

  const handlePasswordChange = (event) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
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

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordError("");

    // Check password and confirm password validity and set form validity accordingly
    if (
      event.target.value === userBo.password &&
      username.length > 0 &&
      password.length >= 6
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const handleIdNumberChange = (event) => {
    setUser({
      ...userBo,
      idNumber: event.target.value,
    });
    setIdNumberError("");
  };

  const handlePhoneNumberChange = (event) => {
    setUser({
      ...userBo,
      phoneNumber: event.target.value,
    });
    setPhoneNumberError("");
  };

  const handlePhonePrefixChange = (prefix) => {
    setPhonePrefix(prefix);
    setShowDropdownPrefix(false);

    const phoneSuffix = document.getElementById("phone-suffix");
    if (phoneSuffix) {
      phoneSuffix.textContent = prefix;
    }
  };

  const handleAcceptPolicyChange = (event) => {
    setAcceptPolicy(!acceptPolicy);
    setAcceptPolicyError("");
  };

  const handleGenderChange = (value) => {
    setUser({
      ...userBo,
      gender: value,
    });
    setGender(value);
    setShowDropdownGender(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate first name, last name, univ, username, password, ID number, phone number, password confirmation, gender, and the rules.
    let firstNameValid = true;
    let lastNameValid = true;
    let selectUnivValid = true;
    let selectCollegeValid = true;
    let usernameValid = true;
    let passwordValid = true;
    let idNumberValid = true;
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

    if (!selectUniv) {
      setSelectUnivError("Please select a university.");
      selectUnivValid = false;
    }

    if (!selectCollege) {
      setSelectCollegeError("Please select a college.");
      selectCollegeValid = false;
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
        selectUnivValid &&
        selectCollegeValid &&
        usernameValid &&
        passwordValid &&
        idNumberValid &&
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
        "username:",
        username,
        "password:",
        password,
        "showPassword:",
        showPassword,
        "idNumber:",
        idNumber,
        "phoneNumber:",
        phoneNumber,
        "phonePrefix:",
        phonePrefix,
        "confirmPassword:",
        confirmPassword,
        "acceptPolicy:",
        acceptPolicy,
        "isFormValid:",
        isFormValid,
        "gender:",
        gender,
        "selectUniv:",
        selectUniv,
        "selectCollege:",
        selectCollege
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
              onChange={handleFirstNameChange}
              maxLength={10}
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
              onChange={handleLastNameChange}
              maxLength={10}
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

      <div className="input-group">
        <div className="custom-select">
          <div className="custom-select">
            <div
              className="selected-option"
              onClick={() => setShowDropdownUniv(!showDropdownUniv)}
            >
              {!selectUniv ? (
                <div className="input-container-option input-dropdown">
                  Select University
                </div>
              ) : (
                <div>
                  <div className="input-container-option input-dropdown-title">
                    University
                  </div>
                  <div
                    className="input-container-option input-dropdown input-selected"
                    htmlFor="id-number"
                  >
                    {selectUniv.name}
                  </div>
                </div>
              )}
              <RiArrowDownSLine className="arrow-icon" />
            </div>
            {showDropdownUniv && (
              <div className="options" id="input-dropdown">
                <div className="option-title">Select University</div>
                {Universities.map((university) => (
                  <div
                    className="option"
                    key={university.id}
                    onClick={() => handleUniversityChange(university)}
                  >
                    {university.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          {selectUnivError && (
            <span className="wrong-info">
              <AiFillExclamationCircle />
              {selectUnivError}
            </span>
          )}{" "}
        </div>
        {selectUnivError && (
          <span className="wrong-info">
            <AiFillExclamationCircle />
            {selectUnivError}
          </span>
        )}
        <div className="custom-select">
          <div className="custom-select">
            <div
              className="selected-option"
              onClick={() => setShowDropdownCollege(!showDropdownCollege)}
            >
              {!selectCollege ? (
                <div className="input-container-option input-dropdown">
                  College Or Faculty
                </div>
              ) : (
                <div>
                  <div className="input-container-option input-dropdown-title">
                    College Or Faculty
                  </div>
                  <div
                    className="input-container-option input-dropdown input-selected"
                    htmlFor="id-number"
                  >
                    {selectCollege}
                  </div>
                </div>
              )}
              <RiArrowDownSLine className="arrow-icon" />
            </div>
            {showDropdownCollege && (
              <div className="options" id="input-dropdown">
                <div className="option-title">College Or Faculty</div>
                {emailDomainName ? (
                  Colleges.map((college) => (
                    <div
                      className="option"
                      key={college.id}
                      onClick={() => handleCollegeChange(college)}
                    >
                      {college.name}
                    </div>
                  ))
                ) : (
                  <div className="option">Choose the university first</div>
                )}
              </div>
            )}
          </div>
          {selectCollegeError && (
            <span className="wrong-info">
              <AiFillExclamationCircle />
              {selectCollegeError}
            </span>
          )}{" "}
        </div>
        {selectCollegeError && (
          <span className="wrong-info">
            <AiFillExclamationCircle />
            {selectCollegeError}
          </span>
        )}
      </div>

      <div className="input-container">
        <input
          type="number"
          id="id-number"
          name="id-number"
          onChange={handleIdNumberChange}
          maxLength={15}
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
          {" "}
          <AiFillExclamationCircle /> {idNumberError}{" "}
        </span>
      )}

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
            type="number"
            id="phone-number"
            name="phone-number"
            onChange={handlePhoneNumberChange}
            maxLength={13}
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
          htmlFor="username"
          onClick={() => document.getElementsByName("username")[0].focus()}
        >
          Username
        </div>
        <div className="UnivSuffix">
          {" "}
          {emailDomainName && !UserError ? emailDomainName : "@"}
        </div>
      </div>
      {usernameError && (
        <span className="wrong-info">
          {" "}
          <AiFillExclamationCircle /> {usernameError}{" "}
        </span>
      )}

      <div className="custom-select">
        <div
          className="selected-option"
          onClick={() => setShowDropdownGender(!showDropdownGender)}
        >
          {!gender ? (
            <div
              className="input-container-option input-dropdown"
              htmlFor="id-number"
            >
              Select gender
            </div>
          ) : (
            <div>
              <div className="input-container-option input-dropdown-title">
                Select gender
              </div>
              <div
                className="input-container-option input-dropdown input-selected"
                htmlFor="id-number"
              >
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
          {passwordError && (
            <span className="wrong-info">
              <AiFillExclamationCircle />
              {passwordError}
            </span>
          )}
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

export default Students;
