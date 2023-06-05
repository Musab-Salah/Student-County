import { useState, useEffect, useMemo } from "react";
import useComponent from "../../../../hooks/useComponent";
import { RiArrowDownSLine } from "react-icons/ri";
import { AiFillExclamationCircle } from "react-icons/ai";
import DialogConfirmation from "../../../dialog_confirmation/DialogConfirmation";
import "./HousingForm.css";
import useLoader from "../../../../hooks/useLoader";
import useHousings from "../../../../hooks/useHousings";
import StepForm from "./StepForm";

const HousingForm = () => {
  const { setButtonCards, ButtonCards } = useComponent();
  const {
    Success,
    createHousing,
    HousingError,
    updateHousing,
    Housing,
    setHousing,
    typeOfTreatments,
    currentIllnessess,
  } = useHousings();
  // State Hook
  const [step, setStep] = useState(1); // Current step of the form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [additionalInformation, setAdditionalInformation] = useState("");
  const [age, setAge] = useState("");
  const [typeOfTreatment, setTypeOfTreatment] = useState("");
  const [selectedTreatments, setSelectedTreatments] = useState([]);
  const [currentIllnesses, setCurrentIllnesses] = useState("");
  const [selectedIllnesses, setSelectedIllnesses] = useState([]);

  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [address, setAddress] = useState("");
  const [typeOfContract, setTypeOfContract] = useState("");

  const [deleteDialogState, setDeleteDialogState] = useState("");
  const [housing, setHousingBo] = useState({});
  const {
    FormHousingLoader,
    ButtonsFormHousingLoader,
    DeleteButtonsFormHousingLoader,
  } = useLoader();

  // Error Hook

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [additionalInformationError, setAdditionalInformationError] =
    useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [nationalIdError, setNationalIdError] = useState();
  const [ageError, setAgeError] = useState();
  const [typeOfTreatmentError, setTypeOfTreatmentError] = useState("null");
  const [currentIllnessesError, setCurrentIllnessesError] = useState("null");
  const [cityError, setCityError] = useState();
  const [provinceError, setProvinceError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [typeOfContractError, setTypeOfContractError] = useState("null");

  ////////////////////////////////////////////////////////////////
  const [showDropdownTypeOfTreatment, setShowDropdownTypeOfTreatment] =
    useState(false);
  const [showDropdownCurrentIllnesses, setShowDropdownCurrentIllnesses] =
    useState(false);
  const [showDropdownTypeOfContract, setShowDropdownTypeOfContract] =
    useState(false);
  ///////////////////////////////////////////////////////////////////
  const [validateContactInformation, setValidateContactInformation] =
    useState();
  const [validateMedicalInformation, setValidateMedicalInformation] =
    useState();
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useMemo(() => {
    const handleOutsideClick = (event) => {
      if (
        !event.target.closest(".custom-select") &&
        !event.target.closest(".input-container-option")
      ) {
        setShowDropdownTypeOfTreatment(false);
        setShowDropdownCurrentIllnesses(false);
        setShowDropdownTypeOfContract(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [
    showDropdownTypeOfTreatment,
    showDropdownCurrentIllnesses,
    showDropdownTypeOfContract,
  ]);

  useMemo(() => {
    if (Housing) {
      setFirstName(Housing.firstName);
      setLastName(Housing.lastName);
      setPhoneNumber(Housing.phoneNumber);
      setAdditionalInformation(Housing.additionalInformation);
      setNationalId(Housing.nationalId);
      setAge(Housing.age);
      setTypeOfTreatment(Housing.typeOfTreatment);
      setCurrentIllnesses(Housing.currentIllnesses);
      setCity(Housing.city);
      setProvince(Housing.province);
      setAddress(Housing.address);
      setTypeOfContract(Housing.typeOfContract);

      setHousingBo({
        ...housing,
        userId: Housing.userId,
        id: Housing.id,
        firstName: Housing.firstName,
        lastName: Housing.lastName,
        phoneNumber: Housing.phoneNumber,
        nationalId: Housing.nationalId,
        additionalInformation: Housing.additionalInformation,
        age: Housing.age,
        typeOfTreatment: Housing.typeOfTreatment,
        currentIllnesses: Housing.currentIllnesses,
        city: Housing.city,
        province: Housing.province,
        address: Housing.address,
        typeOfContract: Housing.typeOfContract,
      });
    }
    // eslint-disable-next-line
  }, [Housing]);
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
      setHousing("");
    };
    // eslint-disable-next-line
  }, []);

  const handleSetFirstName = (e) => {
    const firstNameRegex = /^([a-zA-Z])(?=.{3,})/;
    if (!firstNameRegex.test(e.target.value)) {
      setFirstNameError("Please enter a valid FirstName, for example: Musab");
    } else {
      setHousingBo({
        ...housing,
        firstName: e.target.value,
      });
      setFirstName(e.target.value);
      setFirstNameError(false);
    }
  };

  const handleSetLastName = (e) => {
    const lastNameRegex = /^([a-zA-Z])(?=.{3,})/;
    if (!lastNameRegex.test(e.target.value)) {
      setLastNameError("Please enter a valid LastName, for example: Salah");
    } else {
      setHousingBo({
        ...housing,
        lastName: e.target.value,
      });
      setLastName(e.target.value);
      setLastNameError(false);
    }
  };
  const handlePhoneNumber = (e) => {
    const phoneNumberRegex = /^(?=.{1,})/;
    if (!phoneNumberRegex.test(e.target.value)) {
      setPhoneNumberError("Please Enter a valid phone number");
    } else {
      setHousingBo({
        ...housing,
        phoneNumber: e.target.value,
      });
      setPhoneNumber(e.target.value);
      setPhoneNumberError(false);
    }
  };

  const handleNationalId = (e) => {
    const nationalIdRegex = /^(?=.{1,})/;
    if (!nationalIdRegex.test(e.target.value)) {
      setNationalIdError("Please Enter a valid national number");
    } else {
      setHousingBo({
        ...housing,
        nationalId: e.target.value,
      });
      setNationalId(e.target.value);
      setNationalIdError(false);
    }
  };

  const handleAdditionalInformation = (e) => {
    const additionalInformationRegex = /^(?=.{0,})/;
    if (!additionalInformationRegex.test(e.target.value)) {
      setAdditionalInformationError(
        "Please lengthen this text to 10 characters or more"
      );
    } else {
      setHousingBo({
        ...housing,
        additionalInformation: e.target.value,
      });
      setAdditionalInformation(e.target.value);
      setAdditionalInformationError(false);
    }
  };

  const handleAge = (e) => {
    const ageRegex = /^(?=.{1,})/;
    if (!ageRegex.test(e.target.value)) {
      setAgeError("Please Enter a valid age");
    } else {
      setHousingBo({
        ...housing,
        age: e.target.value,
      });
      setAge(e.target.value);
      setAgeError(false);
    }
  };
  const handleCity = (e) => {
    const cityRegex = /^(?=.{1,})/;
    if (!cityRegex.test(e.target.value)) {
      setCityError("Please Enter a valid City");
    } else {
      setHousingBo({
        ...housing,
        city: e.target.value,
      });
      setCity(e.target.value);
      setCityError(false);
    }
  };

  const handleProvince = (e) => {
    const provinceRegex = /^(?=.{1,})/;
    if (!provinceRegex.test(e.target.value)) {
      setProvinceError("Please Enter a valid province");
    } else {
      setHousingBo({
        ...housing,
        province: e.target.value,
      });
      setProvince(e.target.value);
      setProvinceError(false);
    }
  };

  const handleAddress = (e) => {
    const addressRegex = /^(?=.{1,})/;
    if (!addressRegex.test(e.target.value)) {
      setAddressError("Please Enter a valid Address");
    } else {
      setHousingBo({
        ...housing,
        address: e.target.value,
      });
      setAddress(e.target.value);
      setAddressError(false);
    }
  };

  const handleTypeOfContract = (value) => {
    setHousingBo({
      ...housing,
      typeOfContract: value,
    });
    setTypeOfContract(value);
    setTypeOfContractError(false);
    setShowDropdownTypeOfContract(false);
  };

  useMemo(() => {
    if (typeOfContractError === "null") setTypeOfContractError(false);
    else if (!typeOfContract)
      setTypeOfContractError("please select a typeOfContract");
  }, [typeOfContract]);

  useMemo(() => {
    if (typeOfTreatmentError === "null") setTypeOfTreatmentError(false);
    else if (selectedTreatments.length === 0)
      setTypeOfTreatmentError("Please select a type of treatment");
  }, [selectedTreatments]);

  useMemo(() => {
    if (currentIllnessesError === "null") setCurrentIllnessesError(false);
    else if (selectedIllnesses.length === 0)
      setCurrentIllnessesError("Please select a current Illnesses");
  }, [selectedIllnesses]);

  const handleDelete = (event) => {
    event.preventDefault();
    setDeleteDialogState(true);
  };
  useMemo(() => {
    // Validate contact information fields here
    if (phoneNumber && nationalId) setValidateContactInformation(true);
    else setValidateContactInformation(false);
  }, [phoneNumber, nationalId]);

  useMemo(() => {
    // Validate medical information fields here
    if (city && currentIllnesses && typeOfTreatment && province)
      setValidateMedicalInformation(true);
    else setValidateMedicalInformation(false);
  }, [city, province, typeOfTreatment, currentIllnesses]);

  const handleNext = (event) => {
    if (step === 1 || step === 3) event.preventDefault();

    if (step === 1) {
      // Validate the first part of the form and proceed to the next step if valid
      if (validateContactInformation) {
        setStep(2);
      }
    } else if (step === 2) {
      // Validate the second part of the form and submit if valid
      if (validateMedicalInformation) {
        setStep(3);
      }
    }
  };
  const handelBack = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log(housing);
    if (
      typeOfContract &&
      selectedTreatments.length !== 0 &&
      selectedIllnesses.length !== 0 &&
      ButtonCards === "UpdateHousing"
    )
      updateHousing(Housing.id, housing);
    else if (
      typeOfContract &&
      selectedTreatments.length !== 0 &&
      selectedIllnesses.length !== 0 &&
      ButtonCards === "CreateHousing"
    )
      createHousing(housing);
  };
  return (
    <>
      {deleteDialogState && (
        <DialogConfirmation
          setDeleteDialogState={setDeleteDialogState}
          id={Housing.id}
        />
      )}

      <div style={{ opacity: deleteDialogState ? 0.2 : 1 }}>
        <div className="housing-create-section">
          <div
            className="container-load-form"
            style={{ display: FormHousingLoader ? "block" : "none" }}
          >
            {[...Array(16)].map((_, index) => (
              <div key={index} className="block-load-form"></div>
            ))}
          </div>

          {step === 1 && (
            <>
              <form
                style={{ display: FormHousingLoader ? "none" : "flex" }}
                className="form-create"
                onSubmit={handleNext}
              >
                <div className="hosing-form-title ">
                  Add A New <span style={{ color: "#8D37FF" }}>House.</span>{" "}
                </div>
                <StepForm currentStep={step} />
                <div className="hosing-form-title-paragraph ">
                  Contact Information
                  <div className="hosing-form-paragraph ">
                    Please provide your up-to-date contact information so we can
                    reach you easily if needed.
                  </div>
                </div>
                <div className="input-container">
                  <input
                    maxLength={40}
                    type="number"
                    name="phoneNumber"
                    defaultValue={
                      phoneNumber ? phoneNumber : housing.phoneNumber
                    }
                    onChange={handlePhoneNumber}
                    required
                  />
                  <div
                    className="input-container-option"
                    onClick={() =>
                      document.getElementsByName("phoneNumber")[0].focus()
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
                <div className="input-container-group">
                  <div className="input-container">
                    <input
                      maxLength={40}
                      type="number"
                      name="NationalID"
                      defaultValue={
                        nationalId ? nationalId : housing.nationalId
                      }
                      onChange={handleNationalId}
                      required
                    />
                    <div
                      className="input-container-option"
                      onClick={() =>
                        document.getElementsByName("NationalID")[0].focus()
                      }
                    >
                      National ID
                    </div>
                  </div>
                  {nationalIdError && (
                    <span className="wrong-info">
                      <AiFillExclamationCircle />
                      {nationalIdError}
                    </span>
                  )}
                </div>
                <div className="housing-form-note">
                  *For the safety of students, we require your National ID N°.
                  Rest assured, it will remain securely stored in our database
                  and will not be shared with others.
                </div>
                <div className="housing-form-buttons">
                  <button
                    className="housing-form-btn btn-primary"
                    type="submit"
                  >
                    Next
                  </button>
                  <button
                    onClick={() => setButtonCards("")}
                    className={`housing-form-btn btn-secondary `}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <form
                style={{ display: FormHousingLoader ? "none" : "flex" }}
                className="form-create"
              >
                <div className="hosing-form-title ">
                  Tell us about your{" "}
                  <span style={{ color: "#8D37FF" }}>House.</span>{" "}
                </div>
                <StepForm currentStep={step} />
                <div className="hosing-form-title-paragraph ">
                  Home AdDRESS
                  <div className="hosing-form-paragraph ">
                    Kindly provide the complete address of your residence with
                    the name of the residence, including street, city, province.
                  </div>
                </div>
                <div
                  className="input-container"
                  style={{ minWidth: "100%", maxWidth: "392.31px" }}
                >
                  <input
                    type="text"
                    name="Address"
                    defaultValue={address ? address : housing.address}
                    onChange={handleAddress}
                    required
                  />
                  <div
                    className="input-container-option"
                    onClick={() =>
                      document.getElementsByName("Address")[0].focus()
                    }
                  >
                    Address
                  </div>
                </div>
                {addressError && (
                  <span className="wrong-info">
                    <AiFillExclamationCircle />
                    {addressError}
                  </span>
                )}
                <div className="housing-input-group">
                  <div className="input-container-group">
                    <div className="input-container">
                      <input
                        maxLength={40}
                        type="text"
                        name="city"
                        defaultValue={city ? city : housing.city}
                        onChange={handleCity}
                        required
                      />
                      <div
                        className="input-container-option"
                        onClick={() =>
                          document.getElementsByName("city")[0].focus()
                        }
                      >
                        City
                      </div>
                    </div>
                    {cityError && (
                      <span className="wrong-info">
                        <AiFillExclamationCircle />
                        {cityError}
                      </span>
                    )}
                  </div>
                  <div className="input-container-group">
                    <div className="input-container">
                      <input
                        maxLength={40}
                        type="text"
                        name="province"
                        defaultValue={province ? province : housing.province}
                        onChange={handleProvince}
                        required
                      />
                      <div
                        className="input-container-option"
                        onClick={() =>
                          document.getElementsByName("province")[0].focus()
                        }
                      >
                        Province
                      </div>
                    </div>
                    {provinceError && (
                      <span className="wrong-info">
                        <AiFillExclamationCircle />
                        {provinceError}
                      </span>
                    )}
                  </div>
                </div>
                <div className="hosing-form-title-paragraph ">
                  Home INFORMATION
                  <div className="hosing-form-paragraph ">
                    Please provide information regarding the type of contract,
                    rental price, furniture
                  </div>
                </div>
                {/* for TypeOfContract */}
                <div className="input-container-group">
                  <div className="custom-select">
                    <div
                      className="selected-option"
                      onClick={() =>
                        setShowDropdownTypeOfContract(
                          !showDropdownTypeOfContract
                        )
                      }
                    >
                      {!typeOfContract ? (
                        <div className="input-container-option input-dropdown">
                          TypeOfContract
                        </div>
                      ) : (
                        <div>
                          <div className="input-container-option input-dropdown-title">
                            TypeOfContract
                          </div>
                          <div className="input-container-option input-dropdown input-selected">
                            {typeOfContract}
                          </div>
                        </div>
                      )}
                      <RiArrowDownSLine className="arrow-icon" />
                    </div>
                    {showDropdownTypeOfContract && (
                      <div className="options" id="input-dropdown">
                        <div className="option-title">
                          Select The TypeOfContract
                        </div>
                        <div
                          className="option"
                          onClick={() => handleTypeOfContract("Monthly")}
                        >
                          Monthly
                        </div>
                        <div
                          className="option"
                          onClick={() => handleTypeOfContract("Semester")}
                        >
                          Semester
                        </div>
                        <div
                          className="option"
                          onClick={() => handleTypeOfContract("Annual")}
                        >
                          Annual
                        </div>
                      </div>
                    )}
                  </div>
                  {typeOfContractError && (
                    <span className="wrong-info">
                      <AiFillExclamationCircle />
                      {typeOfContractError}
                    </span>
                  )}
                </div>
                <div className="input-container">
                  <input
                    maxLength={40}
                    type="number"
                    name="RentalPrice"
                    defaultValue={
                      rentalPrice ? rentalPrice : housing.rentalPrice
                    }
                    onChange={handleRentalPrice}
                    required
                  />
                  <div
                    className="input-container-option"
                    onClick={() =>
                      document.getElementsByName("RentalPrice")[0].focus()
                    }
                  >
                    Rental Price
                  </div>
                </div>
                {rentalPriceError && (
                  <span className="wrong-info">
                    <AiFillExclamationCircle />
                    {rentalPriceError}
                  </span>
                )}

                <div className="housing-form-buttons">
                  <button
                    onClick={() => {
                      setStep(3);
                      handleNext();
                    }}
                    className={`btn btn-primary `}
                  >
                    Next
                  </button>
                  <button onClick={handelBack} className={`btn btn-primary `}>
                    Back
                  </button>
                  <button
                    onClick={() => setButtonCards("")}
                    className={`btn btn-secondary `}
                  >
                    Cancel
                  </button>
                </div>
                {HousingError && (
                  <span className="wrong-info">
                    <AiFillExclamationCircle />
                    {HousingError}
                  </span>
                )}
                {Success && (
                  <span className="success-info">
                    <AiFillExclamationCircle />
                    {Success}
                  </span>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default HousingForm;
