import { useState, useEffect, useMemo } from "react";
import useComponent from "../../../../hooks/useComponent";
import { RiArrowDownSLine } from "react-icons/ri";
import { AiFillExclamationCircle } from "react-icons/ai";
import DialogConfirmation from "../../../dialog_confirmation/DialogConfirmation";
import "./RideForm.css";
import useLoader from "../../../../hooks/useLoader";
import useRides from "../../../../hooks/useRides";
import useLocation from "../../../../hooks/useLocation";
import { FaRegAddressCard } from "react-icons/fa";
import { MdOutlineMedicalInformation } from "react-icons/md";
import { BiCheck } from "react-icons/bi";

const RideForm = () => {
  const { setButtonCards, ButtonCards } = useComponent();
  const { RideSuccess, createRide, RideError, updateRide, Ride, setRide } =
    useRides();
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
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [emptySeats, setEmptySeats] = useState("");
  const [location, setLocationform] = useState(false);
  const [ride, setRideBo] = useState({ TimeSlots: [] });
  const { FormRideLoader, ButtonsFormRideLoader, DeleteButtonsFormRideLoader } =
    useLoader();
  const [days, setDay] = useState([]);

  // Error Hook
  const [locationError, setLocationformError] = useState("");

  const [carDescriptionError, setCarDescriptionError] = useState("");
  const [shortDescriptionError, setShortDescriptionError] = useState("");
  const [longDescriptionError, setLongDescriptionError] = useState("");
  const [emptySeatsError, setEmptySeatsError] = useState("");
  const [DayError, setDayError] = useState("");
  const [showDropdownLocation, setShowDropdownLocation] = useState(false);
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
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showDropdownLocation]);

  useMemo(() => {
    if (Ride) {
      setCarDescription(Ride.carDescription);
      setShortDescription(Ride.shortDescription);
      setLongDescription(Ride.longDescription);
      setEmptySeats(Ride.emptySeats);
      getLocationByIdform(Ride.locationId);
      setRideBo({
        ...ride,
        studentId: Ride.studentId,
        id: Ride.id,
        CarDescription: Ride.carDescription,
        shortDescription: Ride.shortDescription,
        longDescription: Ride.longDescription,
        emptySeats: Ride.emptySeats,
        location: Ride.locationId,
      });
    }
    // eslint-disable-next-line
  }, [Ride]);
  useMemo(() => {
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
    };
    // eslint-disable-next-line
  }, []);

  const handleLocationChange = (location) => {
    setRideBo({
      ...ride,
      locationId: location.id,
    });
    setLocationform(location);
    setLocationformError(false);
    setShowDropdownLocation(false);
  };

  const handleCarDescription = (e) => {
    const nameRegex = /^(?=.{0,})/;
    if (!nameRegex.test(e.target.value)) {
      setCarDescriptionError(
        "Please enter a valid name, for example: Software Engineering"
      );
    } else {
      setRideBo({
        ...ride,
        carDescription: e.target.value,
      });
      setCarDescription(e.target.value);
      setCarDescriptionError(false);
    }
  };

  const handelDay = (selectedDay) => {
    if (days.includes(selectedDay)) {
      // If selectedDay is already in the day array, remove it
      setDay((prevDay) => prevDay.filter((day) => day !== selectedDay));

      // Remove the corresponding time slot from TimeSlots
      setRideBo((prevRide) => ({
        ...prevRide,
        TimeSlots: prevRide.TimeSlots.filter(
          (slot) => slot.Day !== selectedDay
        ),
      }));
    } else {
      // If selectedDay is not in the day array, add it
      setDay((prevDay) => [...prevDay, selectedDay]);
    }
  };

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
    setDeleteDialogState(true);
  };
  useMemo(() => {
    // Validate personal information fields here
    if (carDescription && longDescription && emptySeats && location)
      setValidatePersonalInformation(true);
    else setValidatePersonalInformation(false);
  }, [carDescription, longDescription, emptySeats, location]);

  useMemo(() => {
    // Validate medical information fields here
    if (days) setValidateMedicalInformation(true);
    else setValidateMedicalInformation(false);
  }, [days]);

  const handleChange = (day, name, value) => {
    setRideBo((prevRide) => {
      let updatedTimeSlots = [...prevRide.TimeSlots];

      if (days.includes(day)) {
        const existingSlotIndex = updatedTimeSlots.findIndex(
          (slot) => slot.Day === day
        );

        if (existingSlotIndex !== -1) {
          updatedTimeSlots[existingSlotIndex][name] = value;
        } else {
          const newSlot = {
            Day: day,
            [name]: value,
          };
          updatedTimeSlots.push(newSlot);
        }
      } else {
        // Remove the day from TimeSlots if it's not present in days
        updatedTimeSlots = updatedTimeSlots.filter((slot) => slot.Day !== day);
      }

      return { ...prevRide, TimeSlots: updatedTimeSlots };
    });

    // Remove the day from the day array if it's not present in days
    setDay((prevDay) =>
      prevDay.filter((selectedDay) => days.includes(selectedDay))
    );
  };

  const handleNext = (event) => {
    event.preventDefault();

    if (step === 1) {
      // Validate the first part of the form and proceed to the next step if valid
      if (validatePersonalInformation) {
        setStep(2);
      }
    } else if (step === 2) {
      // Validate the second part of the form and submit if valid
      if (validateMedicalInformation) {
        handleSubmit(event);
      }
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!location) setLocationformError("Please enter a location");
    if (location && ButtonCards === "UpdateRide") updateRide(Ride.id, ride);
    else if (location && ButtonCards === "CreateRide") createRide(ride);
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
      <div style={{ opacity: deleteDialogState ? 0.2 : 1 }}>
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
                      <MdOutlineMedicalInformation className="step-icon" />
                    </div>
                    <div className="step-title">Patient Info</div>
                  </div>
                  <div className="step-line"></div>
                  <div className="step">
                    <div className="step-icon-container">
                      <FaRegAddressCard className="step-icon" />
                    </div>
                    <div className="step-title">Medical Status</div>
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
                  <div className="input-container">
                    <input
                      maxLength={40}
                      type="text"
                      name="carDescription"
                      defaultValue={
                        carDescription ? carDescription : ride.carDescription
                      }
                      onChange={handleCarDescription}
                    />
                    <div
                      className="input-container-option"
                      onClick={() =>
                        document.getElementsByName("carDescription")[0].focus()
                      }
                    >
                      Car Description
                    </div>
                  </div>
                  {carDescriptionError && (
                    <span className="wrong-info">
                      <AiFillExclamationCircle />
                      {carDescriptionError}
                    </span>
                  )}
                  <div className="custom-select">
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
                        <div className="option-title">
                          {" "}
                          Select Your Location
                        </div>
                        {Object.values(Locations).map((Location) => (
                          <div
                            className="option"
                            key={Location.id}
                            onClick={() => handleLocationChange(Location)}
                          >
                            {Location.cityName}
                            {" , "}
                            {Location.townName}
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
                    {ButtonCards === "UpdateRide" ? (
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
                        Next
                      </button>
                    )}
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
                      <FaRegAddressCard className="step-icon" />
                    </div>
                    <div className="step-title">Medical Status</div>
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
                              name="TimeToGo"
                              value={
                                ride.TimeSlots.find((slot) => slot.Day === day)
                                  ?.TimeToGo || ""
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
                                name="TimeToLeave"
                                value={
                                  ride.TimeSlots.find(
                                    (slot) => slot.Day === day
                                  )?.TimeToLeave || ""
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
                    {ButtonCards === "UpdateRide" ? (
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
                        Publish
                      </button>
                    )}
                    <button
                      onClick={() => setStep(1)}
                      className={`btn btn-secondary btn-fill`}
                    >
                      Back
                    </button>
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
