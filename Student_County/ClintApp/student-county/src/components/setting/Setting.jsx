import { useState, useMemo, useEffect } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiFillExclamationCircle,
} from "react-icons/ai";
import "../../pages/dashboard/Dashboard.css";

import "../../pages/sign_up/SignUp.css";
import useAuth from "../../hooks/useAuth";
import useUniversities from "../../hooks/useUniversities";
import useCollege from "../../hooks/useCollege";
import useUserRelationData from "../../hooks/useUserRelationData";
import useComponent from "../../hooks/useComponent";
import DashboardNavbar from "../navbar/dashboard_navbar/DashboardNavbar";
import Menu from "../menu/menu";

const Setting = () => {
  // State Hooks
  const { getUniversityById, University } = useUniversities();
  const { Colleges, getCollegeById, College } = useCollege();
  const {
    User,
    setUser,
    getUser,
    UserRelationDataError,
    UserSuccess,
    buttonsFormUserLoader,
    updateUser,
    getPatient,
    Patient,
    setPatient,
    updatePatient,
  } = useUserRelationData();
  const { decodedJwt } = useAuth();
  const { ButtonCards, setOptionMenu } = useComponent();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [gender, setGender] = useState("");
  const [selectUniv, setSelectUniv] = useState("");
  const [selectCollege, setSelectCollege] = useState("");
  const [userBo, setUserBo] = useState({});
  const [patientBo, setPatientBo] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");

  const [idNumber, setIdNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showDropdownGender, setShowDropdownGender] = useState(false);
  const [showDropdownUniv, setShowDropdownUniv] = useState(false);
  const [showDropdownCollege, setShowDropdownCollege] = useState(false);
  const [showDropdownPrefix, setShowDropdownPrefix] = useState(false);
  const [previousPassword, setPreviousPassword] = useState("");

  // Error Hooks
  const [previousPasswordError, setPreviousPasswordError] = useState();
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [idNumberError, setIdNumberError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [genderError, setGenderError] = useState(false);
  const [selectUnivError, setSelectUnivError] = useState("");
  const [selectCollegeError, setSelectCollegeError] = useState("");

  const eyeIcon = showPassword ? (
    <AiFillEyeInvisible size={20} />
  ) : (
    <AiFillEye size={20} />
  );
  const eyeIconN = showNewPassword ? (
    <AiFillEyeInvisible size={20} />
  ) : (
    <AiFillEye size={20} />
  );
  useMemo(() => {
    if (User) {
      setUserBo({
        ...userBo,
        id: User.id,
        firstName: User.firstName,
        lastName: User.lastName,
        idNumber: User.idNumber,
        gender: User.gender,
        universityId: User.universityId,
        collegeId: User.collegeId,
        userName: User.userName,
        email: User.email,
        phoneNumber: User.phoneNumber,
      });
    }
    // eslint-disable-next-line
  }, [User]);

  useMemo(() => {
    if (Patient) {
      setPatientBo({
        ...patientBo,
        id: Patient.id,
        firstName: Patient.firstName,
        lastName: Patient.lastName,
        gender: Patient.gender,
        userName: Patient.userName,
        email: Patient.email,
        phoneNumber: Patient.phoneNumber,
      });
    }
    // eslint-disable-next-line
  }, [Patient]);
  useEffect(() => {
    if (decodedJwt.roles !== "Patient") getUser(decodedJwt.uid);
    else getPatient(decodedJwt.uid);
  }, [UserSuccess]);
  useMemo(() => {
    if (User) {
      getUniversityById(User.universityId);
      getCollegeById(User.collegeId);
    }
  }, [User]);
  useEffect(() => {
    return function cleanup() {
      if (decodedJwt.roles !== "Patient") setUser("");
      else setPatient("");
      setOptionMenu("");
    };
    // eslint-disable-next-line
  }, []);

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

  const handleFirstNameChange = (event) => {
    const nameRegex = /^([a-zA-Z])(?=.{3,})/;
    if (!nameRegex.test(event.target.value)) {
      setFirstNameError("Please enter a valid name, for example: Musab");
    } else {
      setUserBo({
        ...userBo,
        firstName: event.target.value,
      });
      setFirstName(event.target.value);
      setFirstNameError(false);
    }
  };

  const handleLastNameChange = (event) => {
    const nameRegex = /^([a-zA-Z])(?=.{3,})/;
    if (!nameRegex.test(event.target.value)) {
      setLastNameError("Please enter a valid name, for example: Salah");
    } else {
      setUserBo({
        ...userBo,
        lastName: event.target.value,
      });
      setLastName(event.target.value);
      setLastNameError(false);
    }
  };

  const handleCollegeChange = (college) => {
    setUserBo({
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
      setUserBo({
        ...userBo,
        password: event.target.value,
      });
      setPassword(event.target.value);
      setPasswordError(false);
    }
  };
  const handlePreviousPasswordChange = (event) => {
    if (User.password !== event.target.value) {
      setPreviousPasswordError("Your Previous Password Not Valid");
    } else {
      setUserBo({
        ...userBo,
        password: event.target.value,
      });
      setPreviousPassword(event.target.value);
      setPreviousPasswordError(false);
    }
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleIdNumberChange = (event) => {
    const idNumberRegex = /^(?=.{4,})/;
    if (!idNumberRegex.test(event.target.value)) {
      setIdNumberError("Please Enter a valid ID Number.");
    } else {
      setUserBo({
        ...userBo,
        idNumber: event.target.value,
      });
      setIdNumber(event.target.value);
      setIdNumberError(false);
    }
  };

  const handlePhoneNumberChange = (event) => {
    const phoneNumberRegex = /^(?=.{1,})/;
    if (!phoneNumberRegex.test(event.target.value)) {
      setPhoneNumberError("Please Enter a valid phone number");
    } else {
      setUserBo({
        ...userBo,
        phoneNumber: event.target.value,
      });
      setPhoneNumber(event.target.value);
      setPhoneNumberError(false);
    }
  };

  const handleGenderChange = (value) => {
    setUserBo({
      ...userBo,
      gender: value,
    });
    setGender(value);
    setGenderError(false);
    setShowDropdownGender(false);
  };

  ////Patient////////////////////////////////////////
  const handlePatientFirstNameChange = (event) => {
    const nameRegex = /^([a-zA-Z])(?=.{3,})/;
    if (!nameRegex.test(event.target.value)) {
      setFirstNameError("Please enter a valid name, for example: Musab");
    } else {
      setPatientBo({
        ...patientBo,
        firstName: event.target.value,
      });
      setFirstName(event.target.value);
      setFirstNameError(false);
    }
  };

  const handlePatientLastNameChange = (event) => {
    const nameRegex = /^([a-zA-Z])(?=.{3,})/;
    if (!nameRegex.test(event.target.value)) {
      setLastNameError("Please enter a valid name, for example: Salah");
    } else {
      setPatientBo({
        ...patientBo,
        lastName: event.target.value,
      });
      setLastName(event.target.value);
      setLastNameError(false);
    }
  };

  const handlePatientPasswordChange = (event) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&*])(?=.{6})/;
    if (!passwordRegex.test(event.target.value)) {
      setPasswordError(
        "Must be at least 6 characters, one non alphanumeric character, one digit (0-9), one uppercase (A-Z)!"
      );
    } else {
      setPatientBo({
        ...patientBo,
        password: event.target.value,
      });
      setPassword(event.target.value);
      setPasswordError(false);
    }
  };
  const handlePatientPreviousPasswordChange = (event) => {
    if (Patient.password !== event.target.value) {
      setPreviousPasswordError("Your Previous Password Not Valid");
    } else {
      setPatientBo({
        ...patientBo,
        password: event.target.value,
      });
      setPreviousPassword(event.target.value);
      setPreviousPasswordError(false);
    }
  };

  const handlePatientConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  useMemo(() => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&*])(?=.{6})/;
    if (password && !passwordRegex.test(password)) {
      setPasswordError(
        "Must be at least 6 characters, one non alphanumeric character, one digit (0-9), one uppercase (A-Z)!"
      );
    } else {
      setPasswordError(false);
    }
    if (decodedJwt.roles !== "Patient") {
      if (confirmPassword && confirmPassword !== userBo.password) {
        setConfirmPasswordError("Passwords do not match.");
      } else {
        setConfirmPasswordError(false);
      }
    } else {
      if (confirmPassword && confirmPassword !== patientBo.password) {
        setConfirmPasswordError("Passwords do not match.");
      } else {
        setConfirmPasswordError(false);
      }
    }
  }, [confirmPassword, password]);

  const handlePatientPhoneNumberChange = (event) => {
    const phoneNumberRegex = /^(?=.{1,})/;
    if (!phoneNumberRegex.test(event.target.value)) {
      setPhoneNumberError("Please Enter a valid phone number");
    } else {
      setUserBo({
        ...userBo,
        phoneNumber: event.target.value,
      });
      setPhoneNumber(event.target.value);
      setPhoneNumberError(false);
    }
  };
  const handlePatientGenderChange = (value) => {
    setUserBo({
      ...userBo,
      gender: value,
    });
    setGender(value);
    setGenderError(false);
    setShowDropdownGender(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (decodedJwt.roles === "Patient" && !patientBo.gender)
      setGenderError("Please select your gender.");
    if (decodedJwt.roles !== "Patient" && !userBo.gender)
      setGenderError("Please select your gender.");
    if (decodedJwt.roles !== "Patient" && !userBo.universityId)
      setSelectUnivError("Please select your university.");
    if (decodedJwt.roles !== "Patient" && !userBo.collegeId)
      setSelectCollegeError("Please select your college.");
    if (
      !genderError &&
      !firstNameError &&
      !lastNameError &&
      !passwordError &&
      !confirmPasswordError &&
      !selectUnivError &&
      !selectCollegeError &&
      !previousPasswordError
    )
      if (decodedJwt.roles !== "Patient") updateUser(User.id, userBo);
      else updatePatient(Patient.id, patientBo);
  };

  return decodedJwt.roles !== "Patient" ? (
    <div style={{ opacity: ButtonCards ? 0.2 : 1 }}>
      <div className={`dashboard-container  `}>
        <Menu />
        <div className={`dashboard  `}>
          <DashboardNavbar />
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">
              <div className="input-container-group">
                <div className="input-container">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    onChange={handleFirstNameChange}
                    defaultValue={firstName ? firstName : userBo.firstName}
                    maxLength={20}
                    required
                  />
                  <div
                    className="input-container-option"
                    onClick={() =>
                      document.getElementsByName("firstName")[0].focus()
                    }
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
                    defaultValue={lastName ? lastName : userBo.lastName}
                    required
                  />
                  <div
                    className="input-container-option"
                    onClick={() =>
                      document.getElementsByName("lastName")[0].focus()
                    }
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
                    {!selectUniv && !University ? (
                      <div className="input-container-option input-dropdown">
                        Select University
                      </div>
                    ) : (
                      <div>
                        <div className="input-container-option input-dropdown-title">
                          University
                        </div>
                        <div className="input-container-option input-dropdown input-selected">
                          {selectUniv.name ? selectUniv.name : University.name}
                        </div>
                      </div>
                    )}
                    <RiArrowDownSLine className="arrow-icon" />
                  </div>
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
                    {!selectCollege && !College ? (
                      <div className="input-container-option input-dropdown">
                        College Or Faculty
                      </div>
                    ) : (
                      <div>
                        <div className="input-container-option input-dropdown-title">
                          College Or Faculty
                        </div>
                        <div className="input-container-option input-dropdown input-selected">
                          {selectCollege ? selectCollege : College.name}
                        </div>
                      </div>
                    )}
                    <RiArrowDownSLine className="arrow-icon" />
                  </div>
                  {showDropdownCollege && (
                    <div className="options" id="input-dropdown">
                      <div className="option-title">College Or Faculty</div>
                      {Object.values(Colleges).map((college) => (
                        <div
                          className="option"
                          key={college.id}
                          onClick={() => handleCollegeChange(college)}
                        >
                          {college.name}
                        </div>
                      ))}
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
                defaultValue={idNumber ? idNumber : userBo.idNumber}
                required
              />
              <div
                className="input-container-option"
                onClick={() =>
                  document.getElementsByName("id-number")[0].focus()
                }
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
            <div className="input-container" style={{ border: "0", gap: 0 }}>
              <div className="input-container">
                <input
                  type="text"
                  id="phone-number"
                  name="phone-number"
                  onChange={handlePhoneNumberChange}
                  maxLength={13}
                  defaultValue={phoneNumber ? phoneNumber : User.phoneNumber}
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
              {phoneNumberError && (
                <span className="wrong-info">
                  <AiFillExclamationCircle />
                  {phoneNumberError}
                </span>
              )}
            </div>

            <div className="input-container">
              <input
                type="username"
                id="username"
                name="username"
                maxLength={20}
                defaultValue={User.email}
                required
                disabled
              />
            </div>
            {userNameError && (
              <span className="wrong-info">
                <AiFillExclamationCircle />
                {userNameError}
              </span>
            )}
            <div className="custom-select">
              <div
                className="selected-option"
                onClick={() => setShowDropdownGender(!showDropdownGender)}
              >
                {!gender && !User ? (
                  <div className="input-container-option input-dropdown">
                    Select gender
                  </div>
                ) : (
                  <div>
                    <div className="input-container-option input-dropdown-title">
                      Select gender
                    </div>
                    <div className="input-container-option input-dropdown input-selected">
                      {gender ? gender : User.gender}
                    </div>
                  </div>
                )}
                <RiArrowDownSLine className="arrow-icon" />
              </div>
              {showDropdownGender && (
                <div className="options" id="input-dropdown">
                  <div className="option-title">Select gender</div>
                  <div
                    className="option"
                    onClick={() => handleGenderChange("Male")}
                  >
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
                    name="Previouspassword"
                    onChange={handlePreviousPasswordChange}
                    required
                    //value={previousPassword}
                  />
                  <div
                    className="input-container-option"
                    onClick={() =>
                      document.getElementsByName("Previouspassword")[0].focus()
                    }
                  >
                    Previous Password
                  </div>
                  <button
                    type="button"
                    className="eye-wrapper"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {eyeIcon}
                  </button>
                </div>
                {previousPasswordError && (
                  <span className="wrong-info">
                    <AiFillExclamationCircle />
                    {previousPasswordError}
                  </span>
                )}
              </div>
              <div className="input-container-group">
                <div className="input-container">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="password"
                    onChange={handlePasswordChange}
                  />
                  <div
                    className="input-container-option"
                    onClick={() =>
                      document.getElementsByName("password")[0].focus()
                    }
                  >
                    New Password
                  </div>
                  <button
                    type="button"
                    className="eye-wrapper"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {eyeIconN}
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
                    type={showNewPassword ? "text" : "password"}
                    id="confirm-password"
                    name="confirm-password"
                    onChange={handleConfirmPasswordChange}
                  />
                  <div
                    className="input-container-option"
                    onClick={() =>
                      document.getElementsByName("confirm-password")[0].focus()
                    }
                  >
                    Confirm New Password
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

            <button
              disabled={
                firstName ||
                lastName ||
                gender ||
                selectCollege ||
                idNumber ||
                phoneNumber ||
                password
                  ? false
                  : true
              }
              type="submit"
              className={`btn btn-primary sign ${
                firstName ||
                lastName ||
                gender ||
                selectCollege ||
                idNumber ||
                phoneNumber ||
                password
                  ? ""
                  : "disabled"
              }`}
            >
              <div
                className="loader"
                style={{ display: buttonsFormUserLoader ? "block" : "none" }}
              />
              Update
            </button>
            {UserRelationDataError && (
              <span className="wrong-info">
                <AiFillExclamationCircle />
                {UserRelationDataError}
              </span>
            )}
            {UserSuccess && (
              <span className="success-info">
                <AiFillExclamationCircle />
                {"successful Update"}
              </span>
            )}
          </form>
        </div>
      </div>
    </div>
  ) : (
    ///Patient
    <div style={{ opacity: ButtonCards ? 0.2 : 1 }}>
      <div className={`dashboard-container  `}>
        <Menu />
        <div className={`dashboard  `}>
          <DashboardNavbar />
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">
              <div className="input-container-group">
                <div className="input-container">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    onChange={handlePatientFirstNameChange}
                    defaultValue={firstName ? firstName : patientBo.firstName}
                    maxLength={20}
                    required
                  />
                  <div
                    className="input-container-option"
                    onClick={() =>
                      document.getElementsByName("firstName")[0].focus()
                    }
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
                    onChange={handlePatientLastNameChange}
                    maxLength={20}
                    defaultValue={lastName ? lastName : patientBo.lastName}
                    required
                  />
                  <div
                    className="input-container-option"
                    onClick={() =>
                      document.getElementsByName("lastName")[0].focus()
                    }
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
              <div className="input-container">
                <input
                  type="text"
                  maxLength={40}
                  id="phone-number"
                  name="phone-number"
                  onChange={handlePatientPhoneNumberChange}
                  defaultValue={
                    phoneNumber ? phoneNumber : patientBo.phoneNumber
                  }
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
              {phoneNumberError && (
                <span className="wrong-info">
                  <AiFillExclamationCircle />
                  {phoneNumberError}
                </span>
              )}
            </div>
            <div className="input-group">
              <div className="input-container">
                <input
                  type="text"
                  id="username"
                  name="username"
                  maxLength={20}
                  defaultValue={Patient.userName}
                  disabled
                />
              </div>
              <div className="input-container">
                <input
                  type="text"
                  id="email"
                  name="email"
                  maxLength={20}
                  defaultValue={Patient.email}
                  disabled
                />
              </div>
              {userNameError && (
                <span className="wrong-info">
                  <AiFillExclamationCircle />
                  {userNameError}
                </span>
              )}
            </div>
            <div className="custom-select">
              <div
                className="selected-option"
                onClick={() => setShowDropdownGender(!showDropdownGender)}
              >
                {!gender && !Patient ? (
                  <div className="input-container-option input-dropdown">
                    Select gender
                  </div>
                ) : (
                  <div>
                    <div className="input-container-option input-dropdown-title">
                      Select gender
                    </div>
                    <div className="input-container-option input-dropdown input-selected">
                      {gender ? gender : Patient.gender}
                    </div>
                  </div>
                )}
                <RiArrowDownSLine className="arrow-icon" />
              </div>
              {showDropdownGender && (
                <div className="options" id="input-dropdown">
                  <div className="option-title">Select gender</div>
                  <div
                    className="option"
                    onClick={() => handlePatientGenderChange("Male")}
                  >
                    Male
                  </div>
                  <div
                    className="option"
                    onClick={() => handlePatientGenderChange("Female")}
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
                    name="Previouspassword"
                    onChange={handlePatientPreviousPasswordChange}
                    required
                    //value={previousPassword}
                  />
                  <div
                    className="input-container-option"
                    onClick={() =>
                      document.getElementsByName("Previouspassword")[0].focus()
                    }
                  >
                    Previous Password
                  </div>
                  <button
                    type="button"
                    className="eye-wrapper"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {eyeIcon}
                  </button>
                </div>
                {previousPasswordError && (
                  <span className="wrong-info">
                    <AiFillExclamationCircle />
                    {previousPasswordError}
                  </span>
                )}
              </div>
              <div className="input-container-group">
                <div className="input-container">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="password"
                    onChange={handlePatientPasswordChange}
                  />
                  <div
                    className="input-container-option"
                    onClick={() =>
                      document.getElementsByName("password")[0].focus()
                    }
                  >
                    New Password
                  </div>
                  <button
                    type="button"
                    className="eye-wrapper"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {eyeIconN}
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
                    type={showNewPassword ? "text" : "password"}
                    id="confirm-password"
                    name="confirm-password"
                    onChange={handlePatientConfirmPasswordChange}
                  />
                  <div
                    className="input-container-option"
                    onClick={() =>
                      document.getElementsByName("confirm-password")[0].focus()
                    }
                  >
                    Confirm New Password
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

            <button
              disabled={
                firstName ||
                lastName ||
                gender ||
                selectCollege ||
                idNumber ||
                phoneNumber ||
                patientBo.password
                  ? false
                  : true
              }
              type="submit"
              className={`btn btn-primary sign ${
                firstName ||
                lastName ||
                gender ||
                selectCollege ||
                idNumber ||
                phoneNumber ||
                patientBo.password
                  ? ""
                  : "disabled"
              }`}
            >
              <div
                className="loader"
                style={{ display: buttonsFormUserLoader ? "block" : "none" }}
              />
              Update
            </button>
            {UserRelationDataError && (
              <span className="wrong-info">
                <AiFillExclamationCircle />
                {UserRelationDataError}
              </span>
            )}
            {UserSuccess && (
              <span className="success-info">
                <AiFillExclamationCircle />
                {"Successful Update"}
              </span>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Setting;
