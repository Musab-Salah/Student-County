import { useState, useEffect, useMemo, useDeferredValue } from "react";
import useComponent from "../../../../hooks/useComponent";
import { RiArrowDownSLine } from "react-icons/ri";
import { AiFillExclamationCircle } from "react-icons/ai";
import DialogConfirmation from "../../../dialog_confirmation/DialogConfirmation";
import "./RideForm.css";
import useLoader from "../../../../hooks/useLoader";
import useRides from "../../../../hooks/useRides";
import useLocation from "../../../../hooks/useLocation";
import { GrTableAdd } from "react-icons/gr";
import { BiCheck } from "react-icons/bi";
import { IoCarOutline } from "react-icons/io5";
import AddLoc from "../add_loc/AddLoc";
import ChooseLocation from "./../../../map/choose_location/ChooseLocation";

const RideForm = () => {
  const { setButtonCards, ButtonCards } = useComponent();
  const {
    RideSuccess,
    createRide,
    RideError,
    updateRide,
    Ride,
    setRide,
    getTimeSlot,
    TimeSlot,
    setTimeSlot,
    setError,
    cleanupError,
    Latitude,
    Longitude,
  } = useRides();
  const {
    getLocations,
    Locations,
    LocationForm,
    setLocationForm,
    getLocationByIdform,
    setLocation,
  } = useLocation();
  // State Hook

  const [step, setStep] = useState(1); // Current step of the form
  const [carDescription, setCarDescription] = useState("");
  const [deleteDialogState, setDeleteDialogState] = useState("");
  const [addDialogState, setAddDialogState] = useState("");

  const [longDescription, setLongDescription] = useState("");
  const [emptySeats, setEmptySeats] = useState("");
  const [location, setLocationform] = useState(false);
  const [ride, setRideBo] = useState({ timeSlots: [] });
  const { FormRideLoader, ButtonsFormRideLoader, DeleteButtonsFormRideLoader } =
    useLoader();
  const [days, setDay] = useState([]);
  const [query, setQuery] = useState("");
  const deferredInput = useDeferredValue(query);

  // Error Hook
  const [locationError, setLocationError] = useState("");
  const carNames = [
    "Mercedes-Benz",
    "BMW",
    "Audi",
    "Volkswagen",
    "Toyota",
    "Honda",
    "Hyundai",
    "Kia",
    "Nissan",
    "Ford",
    "Chevrolet",
    "Jeep",
    "Land Rover",
    "Mitsubishi",
    "Peugeot",
    "Lexus",
    "Volvo",
    "Subaru",
    "Mazda",
    "Suzuki",
    "Renault",
    "Fiat",
    "Citroën",
    "Opel",
    "Skoda",
    "Mini Cooper",
    "Porsche",
    "Jaguar",
    "Tesla",
    "Infiniti",
    "Seat",
    "Alfa Romeo",
    "MG",
    "Geely",
    "Great Wall",
    "Chery",
    "Haval",
    "JAC",
    "Foton",
    "Brilliance",
    "Lifan",
    "Luxgen",
  ];
  const [carDescriptionError, setCarDescriptionError] = useState("");
  const [shortDescriptionError, setShortDescriptionError] = useState("");
  const [longDescriptionError, setLongDescriptionError] = useState("");
  const [emptySeatsError, setEmptySeatsError] = useState("");
  const [DayError, setDayError] = useState("");
  const [showDropdownLocation, setShowDropdownLocation] = useState(false);
  const [ShowDropdownCar, setShowDropdownCar] = useState(false);
  /////////
  const [validatePersonalInformation, setValidatePersonalInformation] =
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
        setShowDropdownLocation(false);
        setShowDropdownCar(false);
        setQuery("");
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showDropdownLocation, ShowDropdownCar]);

  useEffect(() => {
    if (Ride) {
      setCarDescription(Ride.carDescription);
      setLongDescription(Ride.longDescription);
      setEmptySeats(Ride.emptySeats);
      getLocationByIdform(Ride.locationId);
      setRideBo((prevRide) => ({
        ...prevRide,
        ...Ride,
        id: !Ride.isDeleted ? Ride.id : 0,
        timeSlots:
          Ride.isDeleted && Array.isArray(TimeSlot)
            ? TimeSlot.map((slot) => ({
                ...slot,
                id: 0,
              }))
            : TimeSlot,
        isDeleted: Ride.isDeleted,
        ...(Ride.isDeleted
          ? {}
          : {
              createdBy: Ride.createdBy,
              createdOn: Ride.createdOn,
              modifiedBy: Ride.modifiedBy,
              modifiedOn: Ride.modifiedOn,
            }),
      }));
    }
    // eslint-disable-next-line
  }, [Ride, TimeSlot]);

  useEffect(() => {
    if (TimeSlot) {
      // Add the days from TimeSlot to the days array
      const timeSlotDays = TimeSlot.map((slot) => slot.day);
      setDay((prevDays) => [...prevDays, ...timeSlotDays]);
    }
  }, [TimeSlot]);
  useEffect(() => {
    if (Ride) getTimeSlot(Ride.id);
  }, [Ride]);
  useEffect(() => {
    setLocationform(LocationForm);
  }, [LocationForm]);
  useEffect(() => {
    getLocations();
  }, []);
  useMemo(() => {
    if (RideSuccess) {
      sleep(2000).then(() => {
        setButtonCards("");
      });
    }
    // eslint-disable-next-line
  }, [RideSuccess]);

  useEffect(() => {
    return function cleanup() {
      setButtonCards("");
      setLocationForm("");
      setRide("");
      setTimeSlot("");
      setDay([]);
    };
    // eslint-disable-next-line
  }, []);

  const filteredLocations = Object.values(Locations).filter(
    (Location) =>
      Location.cityName.toLowerCase().includes(deferredInput.toLowerCase()) ||
      Location.townName.toLowerCase().includes(deferredInput.toLowerCase())
  );
  const filteredCars = Object.values(carNames).filter((car) =>
    car.toLowerCase().includes(deferredInput.toLowerCase())
  );

  const handleCarDescription = (value) => {
    setRideBo({
      ...ride,
      carDescription: value,
    });
    setCarDescription(value);
    setCarDescriptionError(false);
    setShowDropdownCar(false);
  };

  const handelDay = (selectedDay) => {
    if (days.includes(selectedDay)) {
      // If selectedDay is already in the day array, remove it
      setDay((prevDay) => prevDay.filter((day) => day !== selectedDay));

      // Remove the corresponding time slot from TimeSlots
      setRideBo((prevRide) => ({
        ...prevRide,
        timeSlots: prevRide.timeSlots.filter(
          (slot) => slot.day !== selectedDay
        ),
      }));
    } else {
      // If selectedDay is not in the day array, add it
      setDay((prevDay) => [...prevDay, selectedDay]);
    }
  };
  useMemo(() => {
    if (days.length > 0) setDayError(false);
  }, [days]);
  const handleLongDescription = (e) => {
    const nameRegex = /^(?=.{10,})/;
    if (!nameRegex.test(e.target.value)) {
      setLongDescriptionError(
        "Please lengthen this text to 10 characters or more"
      );
    } else {
      setRideBo({
        ...ride,
        longDescription: e.target.value,
      });
      setLongDescription(e.target.value);
      setLongDescriptionError(false);
    }
  };
  const handleSetEmptySeats = (e) => {
    const nameRegex = /^(?=.{1,})/;
    if (!nameRegex.test(e.target.value)) {
      setEmptySeatsError("Please lengthen this number to 1 or more");
    } else {
      setRideBo({
        ...ride,
        emptySeats: e.target.value,
      });
      setEmptySeats(e.target.value);
      setEmptySeatsError(false);
    }
  };
  const handleDelete = (event) => {
    event.preventDefault();
    if (!Ride.isDeleted) setDeleteDialogState(true);
    else {
      setError("Already deleted");
      cleanupError();
    }
  };
  useMemo(() => {
    // Validate personal information fields here

    if (carDescription && longDescription && emptySeats)
      setValidatePersonalInformation(true);
    else setValidatePersonalInformation(false);
  }, [carDescription, longDescription, emptySeats]);

  useMemo(() => {
    // Validate medical information fields here
    if (days.length > 0) setValidateMedicalInformation(true);
    else setValidateMedicalInformation(false);
  }, [days]);

  const handleChange = (day, name, value) => {
    setRideBo((prevRide) => {
      let updatedTimeSlots = [...prevRide.timeSlots];
      const existingSlotIndex = updatedTimeSlots.findIndex(
        (slot) => slot.day === day
      );

      if (existingSlotIndex !== -1) {
        updatedTimeSlots[existingSlotIndex][name] = value;
      } else {
        const newSlot = {
          day: day,
          [name]: value,
          rideEntityId: prevRide ? prevRide.id : null, // Set RideEntityId to 0 if Ride is null
        };
        updatedTimeSlots.push(newSlot);
      }

      return { ...prevRide, timeSlots: updatedTimeSlots };
    });
  };

  const handleNext = (event) => {
    event.preventDefault();

    if (step === 1) {
      if (!carDescription) setCarDescriptionError("Please select a car ");
      // Validate the first part of the form and proceed to the next step if valid
      if (validatePersonalInformation) {
        setStep(2);
      }
    } else if (step === 2) {
      if (!Latitude || !Longitude) setLocationError("Please select a location");
      setStep(3);
    } else if (step === 3) {
      if (days.length <= 0) setDayError("Please select a day");
      // Validate the second part of the form and submit if valid
      if (validateMedicalInformation) {
        handleSubmit(event);
      }
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (Ride.isDeleted) createRide(ride);
    else if (carDescription && ButtonCards === "UpdateRide")
      updateRide(Ride.id, ride);
    else if (carDescription && ButtonCards === "CreateRide") createRide(ride);
  };
  return (
    <>
      {deleteDialogState && (
        <DialogConfirmation
          setDeleteDialogState={setDeleteDialogState}
          id={Ride.id}
          serviceName={Ride.serviceName}
        />
      )}
      {addDialogState && <AddLoc setAddDialogState={setAddDialogState} />}

      <div
        style={{
          opacity: deleteDialogState || addDialogState ? 0.2 : 1,
        }}
      >
        <div className="create-section">
          <div
            className="container-load-form"
            style={{ display: FormRideLoader ? "block" : "none" }}
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
          {step === 1 && (
            <>
              <form
                style={{ display: FormRideLoader ? "none" : "flex" }}
                className="form-create"
                onSubmit={handleNext}
              >
                <div className="form-title ">
                  Add A New{" "}
                  <span style={{ color: "#8D37FF" }}>&nbsp;Ride.</span>{" "}
                </div>
                <div className="steps-container">
                  <div className="step-line"></div>
                  <div className="step step-active">
                    <div className="step-icon-container">
                      <IoCarOutline className="step-icon" />
                    </div>
                    <div className="step-title">Ride Info</div>
                  </div>
                  <div className="step-line"></div>
                  <div className="step">
                    <div className="step-icon-container">
                      <GrTableAdd className="step-icon" />
                    </div>
                    <div className="step-title">Schedule Info</div>
                  </div>
                  <div className="step-line"></div>
                </div>
                <div className="vertical-line" />
                <div className="form-input-container">
                  <div className="form-title-paragraph ">
                    Ride Details
                    <div className="form-paragraph">
                      Please provide the following details about the ride you
                      are adding.
                    </div>
                  </div>

                  <div className="custom-select">
                    <div
                      className="selected-option"
                      onClick={() => setShowDropdownCar(!ShowDropdownCar)}
                    >
                      {!carDescription ? (
                        <div className="input-container-option input-dropdown">
                          Select car name
                        </div>
                      ) : (
                        <div>
                          <div className="input-container-option input-dropdown-title">
                            Select car name
                          </div>
                          <div className="input-container-option input-dropdown input-selected">
                            {carDescription}
                          </div>
                        </div>
                      )}
                      <RiArrowDownSLine className="arrow-icon" />
                    </div>
                    {ShowDropdownCar && (
                      <div className="options" id="input-dropdown">
                        <div className="option-title">Select car name</div>
                        <input
                          type="text"
                          placeholder="Search Car..."
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          className="input-search"
                        />
                        {filteredCars.map((carName) => (
                          <div
                            className="option"
                            key={carName}
                            onClick={() => handleCarDescription(carName)}
                          >
                            {carName}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {carDescriptionError && (
                    <span className="wrong-info">
                      <AiFillExclamationCircle />
                      {carDescriptionError}
                    </span>
                  )}
                  {/* <div className="custom-select">
                    <div
                      className="selected-option"
                      onClick={() =>
                        setShowDropdownLocation(!showDropdownLocation)
                      }
                    >
                      {!location ? (
                        <div className="input-container-option input-dropdown">
                          Select Your Location
                        </div>
                      ) : (
                        <div>
                          <div className="input-container-option input-dropdown-title">
                            Select Your Location
                          </div>
                          <div className="input-container-option input-dropdown input-selected">
                            {location.cityName}
                            {" , "}
                            {location.townName}{" "}
                          </div>
                        </div>
                      )}
                      <RiArrowDownSLine className="arrow-icon" />
                    </div>
                    {showDropdownLocation && (
                      <div className="options" id="input-dropdown">
                        <div className="option-title">Select Your Location</div>
                        <input
                          type="text"
                          placeholder="Search locations..."
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          className="input-search"
                        />
                        {filteredLocations.map((Location) => (
                          <div
                            className="option"
                            key={Location.id}
                            onClick={() => handleLocationChange(Location)}
                          >
                            {Location.cityName}, {Location.townName}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {locationError && (
                    <span className="wrong-info">
                      {" "}
                      <AiFillExclamationCircle /> {locationError}{" "}
                    </span>
                  )}
                  <div
                    onClick={() => setAddDialogState(true)}
                    className="step-title-add-loc"
                  >
                    Your town is not in the list ?
                  </div> */}

                  <div className={`input-container `}>
                    <input
                      type="number"
                      name="emptySeats"
                      defaultValue={emptySeats ? emptySeats : ride.emptySeats}
                      onChange={handleSetEmptySeats}
                      required
                    />

                    <div
                      className="input-container-option"
                      onClick={() =>
                        document.getElementsByName("emptySeats")[0].focus()
                      }
                    >
                      EmptySeats
                    </div>
                  </div>
                  {emptySeatsError && (
                    <span className="wrong-info">
                      {" "}
                      <AiFillExclamationCircle /> {emptySeatsError}{" "}
                    </span>
                  )}
                  <div className="form-title-paragraph ">
                    Additional Details
                    <div className="form-paragraph">
                      Can you provide more info about the ride? ex: Estimated
                      duration, roads and towns to be traversed, and any planned
                      stops before arriving at the university etc...
                    </div>
                  </div>
                  <div className="input-container textarea-input">
                    <textarea
                      maxLength={300}
                      type="text"
                      defaultValue={
                        longDescription ? longDescription : ride.longDescription
                      }
                      name="longdescription"
                      onChange={handleLongDescription}
                      className="input-container "
                      required
                    />
                    <div
                      className="input-container-option textarea-input-placeholder"
                      onClick={() =>
                        document.getElementsByName("longdescription")[0].focus()
                      }
                    >
                      Description.
                    </div>
                  </div>
                  {longDescriptionError && (
                    <span className="wrong-info">
                      <AiFillExclamationCircle />
                      {longDescriptionError}
                    </span>
                  )}

                  <div className="buttons">
                    {
                      <button
                        className="btn btn-primary btn-fill"
                        type="submit"
                      >
                        Next
                      </button>
                    }
                    {ButtonCards === "UpdateRide" ? (
                      <button
                        onClick={handleDelete}
                        className={`btn btn-primary btn-fill `}
                      >
                        <div
                          className="loader"
                          style={{
                            display: DeleteButtonsFormRideLoader
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
                  {RideError && (
                    <span className="wrong-info">
                      <AiFillExclamationCircle />
                      {RideError}
                    </span>
                  )}
                  {RideSuccess && (
                    <span className="success-info">
                      <AiFillExclamationCircle />
                      {RideSuccess}
                    </span>
                  )}
                </div>
              </form>
            </>
          )}
          {step === 2 && (
            <>
              <form
                style={{ display: FormRideLoader ? "none" : "flex" }}
                className="form-create"
                onSubmit={handleNext}
              >
                <div className="form-input-container">
                  {/* Add Step 2 JSX here */}
                  {/* Include necessary input fields and logic for Step 2 */}
                  <ChooseLocation />
                  <div className="buttons">
                    <button
                      type="submit"
                      className={`btn btn-primary btn-fill`}
                    >
                      Next
                    </button>
                    <button
                      onClick={() => setStep(1)}
                      className={`btn btn-secondary btn-fill`}
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
                </div>
              </form>
            </>
          )}

          {step === 3 && (
            <>
              <form
                style={{ display: FormRideLoader ? "none" : "flex" }}
                className="form-create"
                onSubmit={handleNext}
              >
                <div className="form-title ">
                  Add A New{" "}
                  <span style={{ color: "#8D37FF" }}>&nbsp;Ride.</span>{" "}
                </div>
                <div className="steps-container">
                  <div className="step-line"></div>
                  <div className="step step-active">
                    <div className="step-icon-container">
                      <BiCheck className="step-icon" />
                    </div>
                    <div className="step-title">
                      {/* Patient Info */}
                      Completed
                    </div>
                  </div>
                  <div className="step-line"></div>
                  <div className="step step-active">
                    <div className="step-icon-container">
                      <GrTableAdd className="step-icon" />
                    </div>
                    <div className="step-title">Schedule Info</div>
                  </div>
                  <div className="step-line"></div>
                </div>
                <div className="vertical-line" />
                <div className="form-input-container">
                  <div className="input-and-title-container">
                    <div className="form-title-paragraph ">Choose the days</div>
                    <div className="input-select-group-day">
                      <label className="input-select-group-label">
                        <input
                          onClick={() => handelDay("Saturday")}
                          type="radio"
                          name="Saturday"
                          value="Saturday"
                        />
                        <div
                          className={`input-select-day ${
                            days.includes("Saturday")
                              ? "input-selected-group"
                              : ""
                          } `}
                        >
                          <div className="input-select-title">Sat</div>
                          {days.includes("Saturday") && (
                            <BiCheck className="input-selected-icon" />
                          )}
                        </div>
                      </label>
                      <label className="input-select-group-label">
                        <input
                          onClick={() => handelDay("Sunday")}
                          type="radio"
                          name="Sunday"
                          value="Sunday"
                        />
                        <div
                          className={`input-select-day ${
                            days.includes("Sunday")
                              ? "input-selected-group"
                              : ""
                          } `}
                        >
                          <div className="input-select-title">Sun</div>
                          {days.includes("Sunday") && (
                            <BiCheck className="input-selected-icon" />
                          )}
                        </div>
                      </label>

                      <label className="input-select-group-label">
                        <input
                          onClick={() => handelDay("Monday")}
                          type="radio"
                          name="Monday"
                          value="Monday"
                        />
                        <div
                          className={`input-select-day ${
                            days.includes("Monday")
                              ? "input-selected-group"
                              : ""
                          } `}
                        >
                          <div className="input-select-title">Mon</div>
                          {days.includes("Monday") && (
                            <BiCheck className="input-selected-icon" />
                          )}
                        </div>
                      </label>
                      <label className="input-select-group-label">
                        <input
                          onClick={() => handelDay("Tuesday")}
                          type="radio"
                          name="Tuesday"
                          value="Tuesday"
                        />
                        <div
                          className={`input-select-day ${
                            days.includes("Tuesday")
                              ? "input-selected-group"
                              : ""
                          } `}
                        >
                          <div className="input-select-title">Tue</div>
                          {days.includes("Tuesday") && (
                            <BiCheck className="input-selected-icon" />
                          )}
                        </div>
                      </label>
                      <label className="input-select-group-label">
                        <input
                          onClick={() => handelDay("Wednesday")}
                          type="radio"
                          name="Wednesday"
                          value="Wednesday"
                        />
                        <div
                          className={`input-select-day ${
                            days.includes("Wednesday")
                              ? "input-selected-group"
                              : ""
                          } `}
                        >
                          <div className="input-select-title">Wed</div>
                          {days.includes("Wednesday") && (
                            <BiCheck className="input-selected-icon" />
                          )}
                        </div>
                      </label>
                      <label className="input-select-group-label">
                        <input
                          onClick={() => handelDay("Thursday")}
                          type="radio"
                          name="Thursday"
                          value="Thursday"
                        />
                        <div
                          className={`input-select-day ${
                            days.includes("Thursday")
                              ? "input-selected-group"
                              : ""
                          } `}
                        >
                          <div className="input-select-title">Thu</div>
                          {days.includes("Thursday") && (
                            <BiCheck className="input-selected-icon" />
                          )}
                        </div>
                      </label>
                    </div>
                    {DayError && (
                      <span className="wrong-info">
                        <AiFillExclamationCircle />
                        {DayError}
                      </span>
                    )}
                  </div>

                  <div className="input-and-title-container">
                    <div className="form-title-paragraph ">
                      Add Time To Go & Time To Leave For Each Day
                    </div>
                    <div className="input-group-day">
                      {days.map((day, index) => (
                        <div key={day}>
                          <div className="input-container-group-time">
                            <div className="input-title">{day}:</div>{" "}
                            <input
                              className="input-time"
                              type="time"
                              id={`timeToGo-${index}`}
                              name="timeToGo"
                              defaultValue={
                                ride.timeSlots.find((slot) => slot.day === day)
                                  ?.timeToGo
                              }
                              onChange={(event) =>
                                handleChange(
                                  day,
                                  event.target.name,
                                  event.target.value
                                )
                              }
                            />
                            <div className="form-paragraph">Time To Go</div>
                            <div className="input-container-group-time">
                              <input
                                className="input-time"
                                type="time"
                                id={`timeToLeave-${index}`}
                                name="timeToLeave"
                                defaultValue={
                                  ride.timeSlots.find(
                                    (slot) => slot.day === day
                                  )?.timeToLeave
                                }
                                onChange={(event) =>
                                  handleChange(
                                    day,
                                    event.target.name,
                                    event.target.value
                                  )
                                }
                              />
                              <div className="form-paragraph">
                                Time To Leave
                              </div>
                            </div>
                          </div>
                          <div className="vertical-line" />
                        </div>
                      ))}
                    </div>{" "}
                  </div>
                  <div className="buttons">
                    {ButtonCards === "UpdateRide" && !Ride.isDeleted ? (
                      <button
                        type="submit"
                        className={`btn btn-primary btn-fill`}
                      >
                        <div
                          className="loader"
                          style={{
                            display: ButtonsFormRideLoader ? "block" : "none",
                          }}
                        />
                        Update
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary btn-fill"
                        type="submit"
                      >
                        {Ride.isDeleted ? "Re-Publish" : "Publish"}
                      </button>
                    )}
                    <button
                      onClick={() => setStep(2)}
                      className={`btn btn-secondary btn-fill`}
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

                  {RideSuccess && (
                    <span className="success-info">
                      <AiFillExclamationCircle />
                      {RideSuccess}
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

export default RideForm;
