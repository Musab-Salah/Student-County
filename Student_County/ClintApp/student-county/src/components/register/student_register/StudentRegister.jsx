import { useState, useMemo } from "react";
import { TbCheck } from "react-icons/tb";
import { RiArrowDownSLine } from "react-icons/ri";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiFillExclamationCircle,
} from "react-icons/ai";

import "../../../pages/sign_up/SignUp.css";
import useAuth from "../../../hooks/useAuth";
import useUniversities from "../../../hooks/useUniversities";
import useCollege from "../../../hooks/useCollege";

const Students = () => {
  // State Hooks
  const { Universities } = useUniversities();
  const { AuthLoader, studentRegister, AuthError, isSuccessfully } = useAuth();
  const { Colleges } = useCollege();
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phonePrefix, setPhonePrefix] = useState("+970"); // need check when its empty
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [gender, setGender] = useState("");
  const [selectUniv, setSelectUniv] = useState("");
  const [selectCollege, setSelectCollege] = useState("");
  const [userBo, setUser] = useState({});
  const [emailDomainName, setEmailDomainName] = useState("");

  const [showDropdownGender, setShowDropdownGender] = useState(false);
  const [showDropdownUniv, setShowDropdownUniv] = useState(false);
  const [showDropdownCollege, setShowDropdownCollege] = useState(false);
  const [showDropdownPrefix, setShowDropdownPrefix] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  // Error Hooks
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [AcceptPolicyError, setAcceptPolicyError] = useState("");
  const [genderError, setGenderError] = useState(false);
  const [selectUnivError, setSelectUnivError] = useState("");
  const [selectCollegeError, setSelectCollegeError] = useState("");

  const eyeIcon = showPassword ? (
    <AiFillEyeInvisible size={20} />
  ) : (
    <AiFillEye size={20} />
  );

  useMemo(
    () => {
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
    },
    // eslint-disable-next-line
    [
      showDropdownGender,
      showDropdownUniv,
      showDropdownCollege,
      showDropdownPrefix,
    ]
  );
  useMemo(
    () => setEmailDomainName(selectUniv.emailDomainName),
    // eslint-disable-next-line
    [selectUniv]
  );

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

  const handleUniversityChange = (uni) => {
    setUser({
      ...userBo,
      universityId: uni.id,
    });
    setSelectUniv(uni);
    setEmailDomainName(uni.emailDomainName);
    setSelectUnivError(false);
    setShowDropdownUniv(false);
  };
  const handleUsernameChange = (event) => {
    const result = event.target.value.replace(/[^a-z.0-9]/gi, "");
    setUser({
      ...userBo,
      email: result + emailDomainName,
      userName: result,
    });
    setUsername(result);
  };

  const handleCollegeChange = (college) => {
    setUser({
      ...userBo,
      collegeId: college.id,
    });
    setSelectCollege(college.name);
    setShowDropdownCollege(false);
    setSelectCollegeError(false);
  };

  const handlePasswordChange = (event) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&*])(?=.{6})/;
    if (!passwordRegex.test(event.target.value)) {
      setPasswordError(
        "Must be at least 6 characters, one non alphanumeric character, one digit (0-9), one uppercase (A-Z)!"
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
  };

  useMemo(() => {
    if (confirmPassword && confirmPassword !== userBo.password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError(false);
    }
  }, [confirmPassword, userBo.password]);

  const handleIdNumberChange = (event) => {
    setUser({
      ...userBo,
      idNumber: event.target.value,
    });
  };

  const handlePhoneNumberChange = (event) => {
    setUser({
      ...userBo,
      phoneNumber: phonePrefix + "-" + event.target.value,
    });
  };

  const handlePhonePrefixChange = (prefix) => {
    setPhonePrefix(prefix);
    setShowDropdownPrefix(false);
  };

  const handleAcceptPolicyChange = () => {
    setAcceptPolicy(!acceptPolicy);
    setAcceptPolicyError(false);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!gender) setGenderError("Please select your gender.");

    if (!selectUniv) setSelectUnivError("Please select your university.");

    if (!selectCollege) setSelectCollegeError("Please select your college.");
    if (
      !genderError &&
      !firstNameError &&
      !lastNameError &&
      !passwordError &&
      !confirmPasswordError &&
      !selectUnivError &&
      !selectCollegeError
    ) {
      !acceptPolicy
        ? setAcceptPolicyError("Please accept the terms and conditions.")
        : studentRegister(userBo);
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
              maxLength={20}
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
                  <div className="input-container-option input-dropdown input-selected">
                    {selectUniv.name}
                  </div>
                </div>
              )}
              <RiArrowDownSLine className="arrow-icon" />
            </div>
            {showDropdownUniv && (
              <div className="options" id="input-dropdown">
                <div className="option-title">Select University</div>
                {Object.values(Universities).map((university) => (
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
                  <div className="input-container-option input-dropdown input-selected">
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
                  Object.values(Colleges).map((college) => (
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
          onClick={() => document.getElementsByName("id-number")[0].focus()}
        >
          ID Number
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

      <div className="input-container">
        <input
          type="username"
          id="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          maxLength={20}
          autoComplete="off"
          required
        />
        <div
          className="input-container-option"
          onClick={() => document.getElementsByName("username")[0].focus()}
        >
          Username
        </div>
        <div className="UnivSuffix">
          {" "}
          {emailDomainName && !AuthError ? emailDomainName : "@mail.com"}
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
            <div className="option" onClick={() => handleGenderChange("Male")}>
              Male
            </div>
            <div
              className="option"
              onClick={() => handleGenderChange("Female")}
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
        <div
          className="loader"
          style={{ display: AuthLoader ? "block" : "none" }}
        />
        Sign Up
      </button>
      {AuthError && (
        <span className="wrong-info">
          <AiFillExclamationCircle />
          {AuthError}
        </span>
      )}
      {isSuccessfully && (
        <span className="success-info">
          <AiFillExclamationCircle />
          {"successful registration please confirm the email"}
        </span>
      )}
    </form>
  );
};

export default Students;
