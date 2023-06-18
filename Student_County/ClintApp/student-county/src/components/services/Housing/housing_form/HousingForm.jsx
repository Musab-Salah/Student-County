import { useState, useEffect, useMemo } from "react";
import useComponent from "../../../../hooks/useComponent";
import { RiArrowDownSLine } from "react-icons/ri";
import { TbCheck } from "react-icons/tb";
import { AiFillExclamationCircle } from "react-icons/ai";
import { FaHome, FaLock } from "react-icons/fa";
import { BiCheck } from "react-icons/bi";
import { MdApartment } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import DialogConfirmation from "../../../dialog_confirmation/DialogConfirmation";
import "./HousingForm.css";
import useLoader from "../../../../hooks/useLoader";
import useHousings from "../../../../hooks/useHousings";
import StepForm from "./StepForm";

const HousingForm = () => {
  const { setButtonCards, ButtonCards } = useComponent();
  const {
    HousingSuccess,
    createHousing,
    HousingError,
    updateHousing,
    Housing,
    setHousing,
  } = useHousings();
  // State Hook
  const [step, setStep] = useState(1); // Current step of the form
  const [nationalId, setNationalId] = useState("");
  const [furnishings, setFurnishings] = useState(false);
  const [homeType, setHomeType] = useState("");
  const [roomType, setRoomType] = useState("");
  const [bedRoom, setBedRoom] = useState("");
  const [bathRoom, setBathRoom] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [address, setAddress] = useState("");
  const [rentalPrice, setRentalPrice] = useState("");

  const [typeOfContract, setTypeOfContract] = useState("");

  const [deleteDialogState, setDeleteDialogState] = useState("");
  const [housing, setHousingBo] = useState({});
  const {
    FormHousingLoader,
    ButtonsFormHousingLoader,
    DeleteButtonsFormHousingLoader,
  } = useLoader();

  // Error Hook
  const [nationalIdError, setNationalIdError] = useState();
  const [cityError, setCityError] = useState();
  const [provinceError, setProvinceError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [rentalPriceError, setRentalPriceError] = useState("");
  const [typeOfContractError, setTypeOfContractError] = useState("null");
  const [homeTypeError, setHomeTypeError] = useState("");
  const [roomTypeError, setRoomTypeError] = useState("");
  const [bedRoomError, setBedRoomError] = useState("");
  const [bathRoomError, setBathRoomError] = useState("");
  ////////////////////////////////////////////////////////////////
  const [showDropdownTypeOfContract, setShowDropdownTypeOfContract] =
    useState(false);
  ///////////////////////////////////////////////////////////////////
  const [validatePersonalInformation, setValidatePersonalInformation] =
    useState();
  const [validateHomeInfo, setValidateHomeInfo] = useState();
  const [validateHomeDescription, setValidateHomeDescription] = useState();
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useMemo(() => {
    const handleOutsideClick = (event) => {
      if (
        !event.target.closest(".custom-select") &&
        !event.target.closest(".input-container-option")
      ) {
        setShowDropdownTypeOfContract(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showDropdownTypeOfContract]);

  useMemo(() => {
    if (Housing) {
      setNationalId(Housing.nationalId);
      setCity(Housing.city);
      setProvince(Housing.province);
      setAddress(Housing.address);
      setTypeOfContract(Housing.typeOfContract);
      setHomeType(Housing.homeType);
      setRoomType(Housing.roomType);
      setBedRoom(Housing.bedRoom);
      setBathRoom(Housing.bathRoom);
      setRentalPrice(Housing.rentalPrice);
      setFurnishings(Housing.furnishings);
      setHousingBo({
        ...housing,
        userId: Housing.userId,
        id: Housing.id,
        nationalId: Housing.nationalId,
        city: Housing.city,
        province: Housing.province,
        address: Housing.address,
        typeOfContract: Housing.typeOfContract,
        homeType: Housing.homeType,
        roomType: Housing.roomType,
        bedRoom: Housing.bedRoom,
        bathRoom: Housing.bathRoom,
        rentalPrice: Housing.rentalPrice,
        furnishings: Housing.furnishings,
      });
    }
    // eslint-disable-next-line
  }, [Housing]);
  useMemo(() => {
    if (HousingSuccess) {
      sleep(2000).then(() => {
        setButtonCards("");
      });
    }
    // eslint-disable-next-line
  }, [HousingSuccess]);

  useEffect(() => {
    return function cleanup() {
      setButtonCards("");
      setHousing("");
    };
    // eslint-disable-next-line
  }, []);

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

  const handleFurnishingsChange = () => {
    setFurnishings(!furnishings);
  };
  useMemo(() => {
    setHousingBo({
      ...housing,
      furnishings: furnishings,
    });
  }, [furnishings]);
  const handleRentalPrice = (e) => {
    const ageRegex = /^(?=.{1,})/;
    if (!ageRegex.test(e.target.value)) {
      setRentalPriceError("Please Enter a valid Rental Price");
    } else {
      setHousingBo({
        ...housing,
        rentalPrice: e.target.value,
      });
      setRentalPrice(e.target.value);
      setRentalPriceError(false);
    }
  };
  const handelHomeType = (type) => {
    setHousingBo({
      ...housing,
      homeType: type,
    });
    setHomeType(type);
    setHomeTypeError(false);
  };

  const handelRoomType = (type) => {
    setHousingBo({
      ...housing,
      roomType: type,
    });
    setRoomType(type);
    setRoomTypeError(false);
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

  const handleBedRoom = (e) => {
    const addressRegex = /^(?=.{1,})/;
    if (!addressRegex.test(e.target.value)) {
      setBedRoomError("Please Enter a valid BedRoom");
    } else {
      setHousingBo({
        ...housing,
        bedRoom: e.target.value,
      });
      setBedRoom(e.target.value);
      setBedRoomError(false);
    }
  };

  const handleBathRoom = (e) => {
    const addressRegex = /^(?=.{1,})/;
    if (!addressRegex.test(e.target.value)) {
      setBathRoomError("Please Enter a valid BathRoom");
    } else {
      setHousingBo({
        ...housing,
        bathRoom: e.target.value,
      });
      setBathRoom(e.target.value);
      setBathRoomError(false);
    }
  };

  useMemo(() => {
    if (typeOfContractError === "null") setTypeOfContractError(false);
    else if (!typeOfContract)
      setTypeOfContractError("please select a type Of Contract");
  }, [typeOfContract]);

  const handleDelete = (event) => {
    event.preventDefault();
    setDeleteDialogState(true);
  };
  useMemo(() => {
    // Validate personal information fields here
    if (nationalId) setValidatePersonalInformation(true);
    else setValidatePersonalInformation(false);
  }, [nationalId]);

  useMemo(() => {
    // Validate HOME INFO fields here
    if (city && address && typeOfContract && province && rentalPrice)
      setValidateHomeInfo(true);
    else setValidateHomeInfo(false);
  }, [city, province, typeOfContract, rentalPrice, address]);

  useMemo(() => {
    // Validate Home Description fields here
    if (homeType && roomType && bedRoom && bathRoom)
      setValidateHomeDescription(true);
    else setValidateHomeDescription(false);
  }, [homeType, roomType, bedRoom, bathRoom]);

  const handleNext = (e) => {
    if (step === 1) {
      if (validatePersonalInformation) {
        setStep(2);
      }
    } else if (step === 2) {
      if (validateHomeInfo) {
        setStep(3);
      }
    }
  };
  const handelBack = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      validatePersonalInformation &&
      validateHomeInfo &&
      validateHomeDescription &&
      ButtonCards === "UpdateHousing"
    )
      updateHousing(Housing.id, housing);
    else if (
      validatePersonalInformation &&
      validateHomeInfo &&
      validateHomeDescription &&
      ButtonCards === "CreateHousing"
    )
      createHousing(housing);
  };
  return (
    <>
      {deleteDialogState && (
        <DialogConfirmation
          setDeleteDialogState={setDeleteDialogState}
          serviceName={Housing.serviceName}
          id={Housing.id}
        />
      )}

      <div style={{ opacity: deleteDialogState ? 0.2 : 1 }}>
        <div className="create-section">
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
              >
                <div className="form-title ">
                  Add A New <span style={{ color: "#8D37FF" }}>House.</span>{" "}
                </div>
                <StepForm currentStep={step} />
                <div className="form-input-container">
                  <div className="form-title-paragraph ">
                    Personal Information
                    <div className="form-paragraph">
                      Please provide your up-to-date personal information so we
                      can reach you easily if needed.
                    </div>
                  </div>

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
                  <div className="form-note">
                    *For the safety of students, we require your National ID N°.
                    Rest assured, it will remain securely stored in our database
                    and will not be shared with others.
                  </div>
                  <div className="buttons">
                    <button
                      className="btn btn-primary btn-fill"
                      onClick={() => handleNext()}
                    >
                      Next
                    </button>
                    {ButtonCards === "UpdateHousing" ? (
                      <button
                        onClick={handleDelete}
                        className={`btn btn-primary btn-fill`}
                      >
                        <div
                          className="loader"
                          style={{
                            display: DeleteButtonsFormHousingLoader
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
                      className={`btn btn-secondary btn-fill`}
                    >
                      Cancel
                    </button>
                  </div>
                  {HousingSuccess && (
                    <span className="success-info">
                      <AiFillExclamationCircle />
                      {HousingSuccess}
                    </span>
                  )}
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
                <div className="form-title ">
                  Tell us about your{" "}
                  <span style={{ color: "#8D37FF" }}>House.</span>{" "}
                </div>
                <StepForm currentStep={step} />
                <div className="form-input-container">
                  <div className="form-title-paragraph ">
                    Home AdDRESS
                    <div className="form-paragraph ">
                      Kindly provide the complete address of your residence with
                      the name of the residence, including street, city,
                      province.
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
                  <div className="input-group">
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
                  <div className="form-title-paragraph ">
                    Home INFORMATION
                    <div className="form-paragraph ">
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
                            Type Of Contract
                          </div>
                        ) : (
                          <div>
                            <div className="input-container-option input-dropdown-title">
                              Type Of Contract
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
                            Select The Type Of Contract
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
                  <div className="input-container-group">
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
                      <div className="CurrencySuffix">₪</div>
                    </div>
                  </div>
                  {rentalPriceError && (
                    <span className="wrong-info">
                      <AiFillExclamationCircle />
                      {rentalPriceError}
                    </span>
                  )}
                  <div
                    checked={furnishings}
                    onClick={handleFurnishingsChange}
                    className="form-checking"
                  >
                    <div
                      className={`form-checkbox ${furnishings ? "true" : ""}`}
                    >
                      {furnishings && <TbCheck />}
                    </div>
                    <div className="form-label-chechbox form-note">
                      Inclusive of all Furnishings .
                    </div>
                  </div>
                  <div className="buttons">
                    <button
                      onClick={() => {
                        setStep(3);
                        handleNext();
                      }}
                      className={`btn btn-primary btn-fill`}
                    >
                      Next
                    </button>
                    <button
                      onClick={handelBack}
                      className={`btn btn-primary btn-fill`}
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setButtonCards("")}
                      className={`btn btn-secondary btn-fill`}
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
                  {HousingSuccess && (
                    <span className="success-info">
                      <AiFillExclamationCircle />
                      {HousingSuccess}
                    </span>
                  )}
                </div>
              </form>
            </>
          )}

          {step === 3 && (
            <>
              <form
                style={{ display: FormHousingLoader ? "none" : "flex" }}
                className="form-create"
              >
                <div className="form-title ">
                  Tell us about your{" "}
                  <span style={{ color: "#8D37FF" }}>House.</span>{" "}
                </div>
                <StepForm currentStep={step} />
                <div className="form-input-container">
                  <div className="form-title-paragraph ">
                    Home Description
                    <div className="form-paragraph ">
                      Tell us something more about your home. It's big house
                      with many rooms and baths or maybe it's a modern
                      apartment?
                    </div>
                  </div>

                  <div className="input-and-title-container">
                    <div className="input-title">Home Type</div>
                    <div className="input-select-group">
                      <label className="input-select-group-label">
                        <input
                          onClick={() => handelHomeType("House")}
                          type="radio"
                          name="hometype"
                          value="House"
                        />
                        <div
                          className={`input-select ${
                            homeType === "House" ? "input-selected-group" : ""
                          } `}
                        >
                          <FaHome className="input-select-icon" />
                          <div className="input-select-title">House</div>
                          {homeType === "House" && (
                            <BiCheck className="input-selected-icon" />
                          )}
                        </div>
                      </label>

                      <label className="input-select-group-label">
                        <input
                          onClick={() => handelHomeType("Apartment")}
                          type="radio"
                          name="hometype"
                          value="Apartment"
                        />
                        <div
                          className={`input-select ${
                            homeType === "Apartment"
                              ? "input-selected-group"
                              : ""
                          } `}
                        >
                          <MdApartment className="input-select-icon" />
                          <div className="input-select-title">Apartment</div>
                          {homeType === "Apartment" && (
                            <BiCheck className="input-selected-icon" />
                          )}
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="input-and-title-container">
                    <div className="input-title">Room Type</div>
                    <div className="input-select-group">
                      <label className="input-select-group-label">
                        <input
                          onClick={() => handelRoomType("Private")}
                          type="radio"
                          name="roomtype"
                          value="Private"
                        />
                        <div
                          className={`input-select ${
                            roomType === "Private" ? "input-selected-group" : ""
                          } `}
                        >
                          <FaLock className="input-select-icon" />
                          <div className="input-select-title">Private Room</div>
                          {roomType === "Private" && (
                            <BiCheck className="input-selected-icon" />
                          )}{" "}
                        </div>
                      </label>

                      <label className="input-select-group-label">
                        <input
                          onClick={() => handelRoomType("Common")}
                          type="radio"
                          name="roomtype"
                          value="Common"
                        />
                        <div
                          className={`input-select ${
                            roomType === "Common" ? "input-selected-group" : ""
                          } `}
                        >
                          <HiUsers className="input-select-icon" />
                          <div className="input-select-title">Common Room</div>
                          {roomType === "Common" && (
                            <BiCheck className="input-selected-icon" />
                          )}{" "}
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="input-and-title-container">
                    <div className="input-title">Bed & Bath</div>
                    <div className="input-group">
                      <div className="input-container">
                        <input
                          maxLength={40}
                          type="number"
                          name="bedroom"
                          defaultValue={bedRoom ? bedRoom : housing.bedRoom}
                          onChange={handleBedRoom}
                          required
                        />
                        <div
                          className="input-container-option"
                          onClick={() =>
                            document.getElementsByName("bedroom")[0].focus()
                          }
                        >
                          Bedroom
                        </div>
                      </div>
                      {bedRoomError && (
                        <span className="wrong-info">
                          <AiFillExclamationCircle />
                          {bedRoomError}
                        </span>
                      )}
                      <div className="input-container">
                        <input
                          maxLength={40}
                          type="number"
                          name="bathroom"
                          defaultValue={bathRoom ? bathRoom : housing.bathRoom}
                          onChange={handleBathRoom}
                          required
                        />
                        <div
                          className="input-container-option"
                          onClick={() =>
                            document.getElementsByName("bathroom")[0].focus()
                          }
                        >
                          Bathroom
                        </div>
                      </div>
                      {bathRoomError && (
                        <span className="wrong-info">
                          <AiFillExclamationCircle />
                          {bathRoomError}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="buttons">
                    <button
                      onClick={handleSubmit}
                      className={`btn btn-primary btn-fill`}
                    >
                      Publish
                    </button>
                    <button
                      onClick={handelBack}
                      className={`btn btn-primary btn-fill`}
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setButtonCards("")}
                      className={`btn btn-secondary btn-fill`}
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
                  {HousingSuccess && (
                    <span className="success-info">
                      <AiFillExclamationCircle />
                      {HousingSuccess}
                    </span>
                  )}
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default HousingForm;
