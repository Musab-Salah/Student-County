import { useState, useEffect, useMemo } from "react";
import useComponent from "../../../../hooks/useComponent";
import { RiArrowDownSLine } from "react-icons/ri";
import { AiFillExclamationCircle } from "react-icons/ai";
import usePatient from "../../../../hooks/usePatient";
import DialogConfirmation from "../../../dialog_confirmation/DialogConfirmation";
import "./PatientForm.css";
import useLoader from "../../../../hooks/useLoader";

const PatientForm = () => {
  const { setButtonCards, ButtonCards } = useComponent();
  const {
    Success,
    createPatient,
    PatientError,
    updatePatient,
    Patient,
    setPatient,
    typeOfTreatments,
    currentIllnessess,
  } = usePatient();
  // State Hook
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nationalIdNumber, setNationalIdNumber] = useState("");
  const [additionalInformation, setAdditionalInformation] = useState("");
  const [age, setAge] = useState("");
  const [typeOfTreatment, setTypeOfTreatment] = useState([]);
  const [selectedTreatments, setSelectedTreatments] = useState([]);
  const [currentIllnesses, setCurrentIllnesses] = useState("");
  const [sensitivity, setSensitivity] = useState("");
  const [currentlyUsedMedicines, setCurrentlyUsedMedicines] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");

  const [deleteDialogState, setDeleteDialogState] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [price, setPrice] = useState("");
  const [theWay, setTheWay] = useState("");
  const [condition, setCondition] = useState("");
  const [patient, setPatientBo] = useState({});
  const {
    FormPatientLoader,
    ButtonsFormPatientLoader,
    DeleteButtonsFormPatientLoader,
  } = useLoader();

  // Error Hook
  const [theWayError, setTheWayError] = useState("");
  const [conditionError, setConditionError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [additionalInformationError, setAdditionalInformationError] =
    useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [nationalIdNumberError, setNationalIdNumberError] = useState();
  const [ageError, setAgeError] = useState();
  const [typeOfTreatmentError, setTypeOfTreatmentError] = useState("");
  const [currentIllnessesError, setCurrentIllnessesError] = useState("");
  const [sensitivityError, setSensitivityError] = useState();
  const [currentlyUsedMedicinesError, setCurrentlyUsedMedicinesError] =
    useState("");
  const [addressError, setAddressError] = useState();
  const [genderError, setGenderError] = useState();


  ////////////////////////////////////////////////////////////////
  const [showDropdownTheWay, setShowDropdownTheWay] = useState(false);
  const [showDropdownCondition, setShowDropdownCondition] = useState(false);
  const [showDropdownTypeOfTreatment, setShowDropdownTypeOfTreatment] =
    useState(false);
  const [showDropdownCurrentIllnesses, setShowDropdownCurrentIllnesses] =
    useState(false);
  const [showDropdownGender, setShowDropdownGender] = useState(false);
  ///////////////////////////////////////////////////////////////////
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useMemo(() => {
    const handleOutsideClick = (event) => {
      if (
        !event.target.closest(".custom-select") &&
        !event.target.closest(".input-container-option")
      ) {
        setShowDropdownTheWay(false);
        setShowDropdownCondition(false);
        setShowDropdownTypeOfTreatment(false);
        setShowDropdownCurrentIllnesses(false);
        setShowDropdownGender(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [
    showDropdownTheWay,
    showDropdownCondition,
    showDropdownTypeOfTreatment,
    showDropdownCurrentIllnesses,
    showDropdownGender,
  ]);

  useMemo(() => {
    setFirstName(Patient.firstName);
    setLastName(Patient.lastName);
    setPhoneNumber(Patient.phoneNumber);
    setAdditionalInformation(Patient.additionalInformation);
    setNationalIdNumber(Patient.nationalIdNumber);
    setAge(Patient.age);
    setTypeOfTreatment(Patient.typeOfTreatment);
    setCurrentIllnesses(Patient.currentIllnesses);
    setSensitivity(Patient.sensitivity);
    setCurrentlyUsedMedicines(patient.currentlyUsedMedicines);
    setAddress(patient.address);
    setGender(patient.gender);

    setPatientBo({
      ...patient,
      studentId: Patient.studentId,
      id: Patient.id,
      firstName: Patient.firstName,
      lastName: Patient.lastName,
      phoneNumber: Patient.phoneNumber,
      nationalIdNumber: Patient.nationalIdNumber,
      additionalInformation: Patient.additionalInformation,
      age: Patient.age,
      typeOfTreatment: Patient.typeOfTreatment,
      currentIllnesses: Patient.currentIllnesses,
      sensitivity: Patient.sensitivity,
      currentlyUsedMedicines: Patient.currentlyUsedMedicines,
      address: Patient.address,
      gender: Patient.gender,
    });
    // eslint-disable-next-line
  }, [Patient]);
  useMemo(() => {
    if (Success) {
      sleep(2000).then(() => {
        setButtonCards("");
      });
    }
    // eslint-disable-next-line
  }, [Success]);

  useEffect(() => {
    return function cleanup() {
      setButtonCards("");
      setPatient("");
    };
    // eslint-disable-next-line
  }, []);

  const handleSetFirstName = (e) => {
    const firstNameRegex = /^([a-zA-Z])(?=.{3,})/;
    if (!firstNameRegex.test(e.target.value)) {
      setFirstNameError(
        "Please enter a valid firstName, for example: Software Engineering"
      );
    } else {
      setPatientBo({
        ...patient,
        firstName: e.target.value,
      });
      setFirstNameError(false);
    }
  };

  const handleSetLastName = (e) => {
    const lastNameRegex = /^([a-zA-Z])(?=.{3,})/;
    if (!lastNameRegex.test(e.target.value)) {
      setLastNameError(
        "Please enter a valid firstName, for example: Software Engineering"
      );
    } else {
      setPatientBo({
        ...patient,
        lastName: e.target.value,
      });
      setLastNameError(false);
    }
  };
  const handlePhoneNumber = (e) => {
    const phoneNumberRegex = /^(?=.{1,})/;
    if (!phoneNumberRegex.test(e.target.value)) {
      setPhoneNumberError("Please Enter a valid phone number");
    } else {
      setPatientBo({
        ...patient,
        phoneNumber: e.target.value,
      });
      setPhoneNumberError(false);
    }
  };

  const handleNationalIdNumber = (e) => {
    const nationalIdNumberRegex = /^(?=.{1,})/;
    if (!nationalIdNumberRegex.test(e.target.value)) {
      setNationalIdNumberError("Please Enter a valid national number");
    } else {
      setPatientBo({
        ...patient,
        nationalIdNumber: e.target.value,
      });
      setNationalIdNumberError(false);
    }
  };

  const handleAdditionalInformation = (e) => {
    const additionalInformationRegex = /^(?=.{0,})/;
    if (!additionalInformationRegex.test(e.target.value)) {
      setAdditionalInformationError(
        "Please lengthen this text to 10 characters or more"
      );
    } else {
      setPatientBo({
        ...patient,
        additionalInformation: e.target.value,
      });
      setAdditionalInformationError(false);
    }
  };

  const handleAge = (e) => {
    const ageRegex = /^(?=.{1,})/;
    if (!ageRegex.test(e.target.value)) {
      setAgeError("Please Enter a valid age");
    } else {
      setPatientBo({
        ...patient,
        age: e.target.value,
      });
      setAgeError(false);
    }
  };
  const handleSensitivity = (e) => {
    const sensitivityRegex = /^(?=.{1,})/;
    if (!sensitivity.test(e.target.value)) {
      setSensitivityError("Please Enter a valid Sensitivity");
    } else {
      setPatientBo({
        ...patient,
        sensitivity: e.target.value,
      });
      setSensitivityError(false);
    }
  };

  const handleCurrentlyUsedMedicines = (e) => {
    const currentlyUsedMedicinesRegex = /^(?=.{1,})/;
    if (!currentlyUsedMedicinesRegex.test(e.target.value)) {
      setCurrentlyUsedMedicinesError("Please Enter a valid age");
    } else {
      setPatientBo({
        ...patient,
        currentlyUsedMedicines: e.target.value,
      });
      setCurrentlyUsedMedicinesError(false);
    }
  };

  const handleAddress = (e) => {
    const addressRegex = /^(?=.{1,})/;
    if (!addressRegex.test(e.target.value)) {
      setAddressError("Please Enter a valid Address");
    } else {
      setPatientBo({
        ...patient,
        address: e.target.value,
      });
      setAddressError(false);
    }
  };


   const handleTypeOfTreatment = (treatment) => {
    const treatmentIndex = selectedTreatments.indexOf(treatment);
    if (treatmentIndex > -1) {
      // Treatment already selected, remove it
      const updatedTreatments = [...selectedTreatments];
      updatedTreatments.splice(treatmentIndex, 1);
      setSelectedTreatments(updatedTreatments);
    } else {
      // Treatment not selected, add it
      setSelectedTreatments([...selectedTreatments, treatment]);
    }
  };



  const handleCurrentIllnesses = (value) => {
    setPatientBo({
      ...patient,
      currentIllnesses: value,
    });
    setCurrentIllnesses(value);
    setCurrentIllnessesError(false);
    setShowDropdownCurrentIllnesses(false);
  };
  const handleGender = (value) => {
    setPatientBo({
      ...patient,
      gender: value,
    });
    setGender(value);
    setGenderError(false);
    setShowDropdownGender(false);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    setDeleteDialogState(true);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (ButtonCards === "UpdatePatient") updatePatient(Patient.id, patient);
    else if (ButtonCards === "CreatePatient") createPatient(patient);
  };
  return (
    <>
      {deleteDialogState && (
        <DialogConfirmation
          setDeleteDialogState={setDeleteDialogState}
          id={Patient.id}
        />
      )}
      <div style={{ opacity: deleteDialogState ? 0.2 : 1 }}>
        <div className="Create-section">
          <div
            className="container-load-form"
            style={{ display: FormPatientLoader ? "block" : "none" }}
          >
            <div className="block-load-form"></div>
            <div className="block-load-form"></div>
            <div className="block-load-form"></div>
            <div className="block-load-form"></div>
            <div className="block-load-form"></div>
            <div className="block-load-form"></div>
            <div className="block-load-form"></div>
            <div className="block-load-form"></div>
            <div className="block-load-form"></div>
            <div className="block-load-form"></div>
            <div className="block-load-form"></div>
            <div className="block-load-form"></div>
            <div className="block-load-form"></div>
            <div className="block-load-form"></div>
            <div className="block-load-form"></div>
            <div className="block-load-form"></div>
          </div>
          <form
            style={{ display: FormPatientLoader ? "none" : "flex" }}
            className="form-create"
            onSubmit={handleSubmit}
          >
            <div className="input-group">
              <div className="input-container-group">
                <div className="input-container">
                  <input
                    maxLength={40}
                    type="text"
                    name="firstName"
                    defaultValue={firstName ? firstName : patient.firstName}
                    onChange={handleSetFirstName}
                    required
                  />
                  <div
                    className="input-container-option"
                    onClick={() =>
                      document.getElementsByName("firstName")[0].focus()
                    }
                  >
                    FirstName
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
                    maxLength={40}
                    type="text"
                    name="lastName"
                    defaultValue={lastName ? lastName : patient.lastName}
                    onChange={handleSetLastName}
                    required
                  />
                  <div
                    className="input-container-option"
                    onClick={() =>
                      document.getElementsByName("lastName")[0].focus()
                    }
                  >
                    LastName
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
              <div className="input-container-group">
                <div className={`input-container`}>
                  <input
                    type="number"
                    name="phonenumber"
                    maxLength={15}
                    defaultValue={
                      phoneNumber ? phoneNumber : patient.phoneNumber
                    }
                    onChange={handlePhoneNumber}
                    required
                  />

                  <div
                    className="input-container-option"
                    onClick={() =>
                      document.getElementsByName("phonenumber")[0].focus()
                    }
                  >
                    Phone Number
                  </div>
                </div>
                {phoneNumberError && (
                  <span className="wrong-info">
                    {" "}
                    <AiFillExclamationCircle /> {phoneNumberError}{" "}
                  </span>
                )}
              </div>
              <div className="input-container-group">
                <div className={`input-container`}>
                  <input
                    type="number"
                    name="nationalidnumber"
                    maxLength={15}
                    defaultValue={
                      nationalIdNumber
                        ? nationalIdNumber
                        : patient.nationalIdNumber
                    }
                    onChange={handleNationalIdNumber}
                    required
                  />

                  <div
                    className="input-container-option"
                    onClick={() =>
                      document.getElementsByName("nationalidnumber")[0].focus()
                    }
                  >
                    National Id Number
                  </div>
                </div>
                {nationalIdNumberError && (
                  <span className="wrong-info">
                    {" "}
                    <AiFillExclamationCircle /> {nationalIdNumberError}{" "}
                  </span>
                )}
              </div>
            </div>
            <div className="input-container">
              <input
                type="text"
                name="additionalinformation"
                defaultValue={
                  additionalInformation
                    ? additionalInformation
                    : patient.additionalInformation
                }
                onChange={handleAdditionalInformation}
              />
              <div
                className="input-container-option"
                onClick={() =>
                  document.getElementsByName("additionalinformation")[0].focus()
                }
              >
                Additional Information
              </div>
            </div>
            {additionalInformationError && (
              <span className="wrong-info">
                <AiFillExclamationCircle />
                {additionalInformationError}
              </span>
            )}
            <div className="input-group">
              <div className="input-container-group">
                <div className={`input-container`}>
                  <input
                    type="number"
                    name="age"
                    maxLength={2}
                    defaultValue={age ? age : patient.age}
                    onChange={handleAge}
                    required
                  />

                  <div
                    className="input-container-option"
                    onClick={() => document.getElementsByName("age")[0].focus()}
                  >
                    Age
                  </div>
                </div>
                {ageError && (
                  <span className="wrong-info">
                    {" "}
                    <AiFillExclamationCircle /> {ageError}{" "}
                  </span>
                )}
              </div>
              {/* for Gender */}
              <div className="input-container-group">
                <div className="custom-select">
                  <div
                    className="selected-option"
                    onClick={() => setShowDropdownGender(!showDropdownGender)}
                  >
                    {!gender ? (
                      <div className="input-container-option input-dropdown">
                        Gender
                      </div>
                    ) : (
                      <div>
                        <div className="input-container-option input-dropdown-title">
                          Gender
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
                      <div className="option-title">Select The Gender</div>
                      <div
                        className="option"
                        onClick={() => handleGender("Male")}
                      >
                        Male
                      </div>
                      <div
                        className="option"
                        onClick={() => handleGender("Female")}
                      >
                        Female
                      </div>
                    </div>
                  )}
                </div>
                {genderError && (
                  <span className="wrong-info">
                    <AiFillExclamationCircle />
                    {genderError}
                  </span>
                )}
              </div>
            </div>
            {/* for TypeOfTreatment */}
          <div className="custom-select">
            <div className="selected-option" onClick={() =>
                        setShowDropdownTypeOfTreatment(!showDropdownTypeOfTreatment)
                      }>
              {!selectedTreatments.length ? (
                <div className="input-container-option input-dropdown">
                  Select Type Of Treatment
                </div>
              ) : (
                <div>
                  <div className="input-container-option input-dropdown-title">
                    Select Type Of Treatment
                  </div>
                  <div className="input-container-option input-dropdown input-selected">
                    {selectedTreatments.join(', ')}
                  </div>
                </div>
              )}
              <RiArrowDownSLine className="arrow-icon" />
            </div>
              {showDropdownTypeOfTreatment && (
                <div className="options" id="input-dropdown">
                  <div className="option-title">Select Type Of Treatment</div>
                  {Object.values(typeOfTreatments).map((treatment) => (
                    <div
                      className={`option${selectedTreatments.includes(treatment) ? ' selected' : ''}`}
                      key={treatment}
                      onClick={() => handleTypeOfTreatment(treatment)}
                    >
                      {treatment}
                    </div>
                  ))}
                </div>
              )}
          </div>
            {typeOfTreatmentError && (
                  <span className="wrong-info">
                    <AiFillExclamationCircle />
                    {typeOfTreatmentError}
                  </span>
              )}
               {/* for CurrentIllnesses */}
                <div className="custom-select">
                  <div
                    className="selected-option"
                    onClick={() =>
                      setShowDropdownCurrentIllnesses(!showDropdownCurrentIllnesses)
                    }
                  >
                    {!currentIllnesses ? (
                      <div className="input-container-option input-dropdown">
                        Select Current Illnesses
                      </div>
                    ) : (
                      <div>
                        <div className="input-container-option input-dropdown-title">
                          Select Current Illnesses
                        </div>
                        <div className="input-container-option input-dropdown input-selected">
                          {currentIllnesses}
                        </div>
                      </div>
                    )}
                    <RiArrowDownSLine className="arrow-icon" />
                  </div>
                  {showDropdownCurrentIllnesses && (
                    <div className="options" id="input-dropdown">
                      <div className="option-title"> Select Current Illnesses</div>
                      {Object.values(currentIllnessess).map((illnesses) => (
                        <div
                          className="option"
                          key={illnesses.id}
                          onClick={() => handleCurrentIllnesses(illnesses)}
                        >
                          {illnesses}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {currentIllnessesError && (
                  <span className="wrong-info">
                    <AiFillExclamationCircle />
                    {currentIllnessesError}
                  </span>
                )}

                <div className="buttons">
                  {ButtonCards === "UpdatePatient" ? (
                    <button type="submit" className={`btn btn-primary `}>
                      <div
                        className="loader"
                        style={{
                          display: ButtonsFormPatientLoader ? "block" : "none",
                        }}
                      />
                      Update
                    </button>
                  ) : (
                    <button type="submit" className={`btn btn-primary `}>
                      <div
                        className="loader"
                        style={{
                          display: ButtonsFormPatientLoader ? "block" : "none",
                        }}
                      />
                      Publish
                    </button>
                  )}
                  {ButtonCards === "UpdatePatient" ? (
                    <button onClick={handleDelete} className={`btn btn-primary `}>
                      <div
                        className="loader"
                        style={{
                          display: DeleteButtonsFormPatientLoader
                            ? "block"
                            : "none",
                        }}
                      />
                      Delete
                    </button>
                  ) : (
                    ""
                  )}
                  <button
                    onClick={() => setButtonCards("")}
                    className={`btn btn-secondary `}
                  >
                    Cancel
                  </button>
                </div>
                {PatientError && (
                  <span className="wrong-info">
                    <AiFillExclamationCircle />
                    {PatientError}
                  </span>
                )}
                {Success && (
                  <span className="success-info">
                    <AiFillExclamationCircle />
                    {Success}
                  </span>
                )}
              </form>
            </div>
          </div>
    </>
  );
};

export default PatientForm;
