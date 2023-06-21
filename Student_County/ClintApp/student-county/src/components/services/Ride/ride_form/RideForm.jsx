import { useState, useEffect, useMemo } from "react";
import useComponent from "../../../../hooks/useComponent";
import { RiArrowDownSLine } from "react-icons/ri";
import { AiFillExclamationCircle } from "react-icons/ai";
import DialogConfirmation from "../../../dialog_confirmation/DialogConfirmation";
import "./RideForm.css";
import useLoader from "../../../../hooks/useLoader";
import useRides from "../../../../hooks/useRides";
import useLocation from "../../../../hooks/useLocation";

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
  const [carDescription, setCarDescription] = useState("");
  const [deleteDialogState, setDeleteDialogState] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [emptySeats, setEmptySeats] = useState("");
  const [location, setLocationform] = useState(false);
  const [ride, setRideBo] = useState({});
  const { FormRideLoader, ButtonsFormRideLoader, DeleteButtonsFormRideLoader } =
    useLoader();

  // Error Hook
  const [locationError, setLocationformError] = useState("");

  const [carDescriptionError, setCarDescriptionError] = useState("");
  const [shortDescriptionError, setShortDescriptionError] = useState("");
  const [longDescriptionError, setLongDescriptionError] = useState("");
  const [emptySeatsError, setEmptySeatsError] = useState("");

  const [showDropdownLocation, setShowDropdownLocation] = useState(false);

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
    console.log(ride.locationId);
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
      setCarDescriptionError(false);
    }
  };
  const handleShortDescription = (e) => {
    const nameRegex = /^(?=.{0,})/;
    if (!nameRegex.test(e.target.value)) {
      setShortDescriptionError(
        "Please lengthen this text to 10 characters or more"
      );
    } else {
      setRideBo({
        ...ride,
        shortDescription: e.target.value,
      });
      setShortDescriptionError(false);
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
      setEmptySeatsError(false);
    }
  };
  const handleDelete = (event) => {
    event.preventDefault();
    setDeleteDialogState(true);
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
          <form
            style={{ display: FormRideLoader ? "none" : "flex" }}
            className="form-create"
            onSubmit={handleSubmit}
          >
            <div className="form-title ">
              Add A New <span style={{ color: "#8D37FF" }}>&nbsp;Ride.</span>{" "}
            </div>
            <div className="vertical-line" />
            <div className="form-input-container">
              <div className="form-title-paragraph ">
                Ride Details
                <div className="form-paragraph">
                  Please provide the following details about the ride you are
                  adding.
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
                  onClick={() => setShowDropdownLocation(!showDropdownLocation)}
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
                    <div className="option-title"> Select Your Location</div>
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
              <div className="input-container">
                <input
                  type="text"
                  name="shortdescription"
                  defaultValue={
                    shortDescription ? shortDescription : ride.shortDescription
                  }
                  onChange={handleShortDescription}
                  maxLength={100}
                />
                <div
                  className="input-container-option"
                  onClick={() =>
                    document.getElementsByName("shortdescription")[0].focus()
                  }
                >
                  Additional Info
                </div>
              </div>
              {shortDescriptionError && (
                <span className="wrong-info">
                  <AiFillExclamationCircle />
                  {shortDescriptionError}
                </span>
              )}
              {/* <button type="submit" className={`btn btn-primary sign ${!isFormValid ? 'disabled' : ''}`}>  */}
              <div className="buttons">
                {ButtonCards === "UpdateRide" ? (
                  <button type="submit" className={`btn btn-primary btn-fill`}>
                    <div
                      className="loader"
                      style={{
                        display: ButtonsFormRideLoader ? "block" : "none",
                      }}
                    />
                    Update
                  </button>
                ) : (
                  <button type="submit" className={`btn btn-primary btn-fill `}>
                    <div
                      className="loader"
                      style={{
                        display: ButtonsFormRideLoader ? "block" : "none",
                      }}
                    />
                    Publish
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
                        display: DeleteButtonsFormRideLoader ? "block" : "none",
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
        </div>
      </div>
    </>
  );
};

export default RideForm;
