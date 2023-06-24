import React, { useDeferredValue, useEffect, useMemo, useState } from "react";
import useLocation from "../../../../hooks/useLocation";
import useComponent from "../../../../hooks/useComponent";
import { RiArrowDownSLine } from "react-icons/ri";
import { AiFillExclamationCircle } from "react-icons/ai";

const AddLoc = ({ setAddDialogState }) => {
  const {
    FormLocationLoader,
    getLocations,
    Locations,
    createLocation,
    LocationSuccess,
  } = useLocation();
  const [query, setQuery] = useState("");
  const [location, setLocationBo] = useState({});
  const deferredInput = useDeferredValue(query);
  const [townNameError, setTownNameError] = useState("");

  const cityNames = [
    "Jerusalem",
    "Ramallah",
    "Bethlehem",
    "Nablus",
    "Hebron",
    "Gaza City",
    "Jenin",
    "Tulkarm",
    "Jericho",
    "Rafah",
  ];
  const [ShowDropdownCar, setShowDropdownCar] = useState(false);
  useEffect(() => {
    getLocations();
  }, []);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useMemo(() => {
    if (LocationSuccess) {
      sleep(2000).then(() => {
        setAddDialogState("");
      });
    }
    // eslint-disable-next-line
  }, [LocationSuccess]);
  useMemo(() => {
    const handleOutsideClick = (event) => {
      if (
        !event.target.closest(".custom-select") &&
        !event.target.closest(".input-container-option")
      ) {
        setShowDropdownCar(false);
        setQuery("");
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [ShowDropdownCar]);
  const filteredCitys = Object.values(cityNames).filter((car) =>
    car.toLowerCase().includes(deferredInput.toLowerCase())
  );

  const handleCity = (value) => {
    setLocationBo({
      ...location,
      cityName: value,
    });
    setShowDropdownCar(false);
    setTownNameError(false);
  };
  const handleTownName = (e) => {
    const townNameRegex = /^([a-zA-Z])(?=.{1,})/;
    const inputValue = e.target.value;
    const capitalizedValue =
      inputValue.charAt(0).toUpperCase() + inputValue.slice(1);

    if (!townNameRegex.test(capitalizedValue)) {
      setTownNameError("Please enter a valid TownName, for example: Nablus");
    } else {
      setLocationBo({
        ...location,
        townName: capitalizedValue,
      });
      setTownNameError(false);
    }
  };
  useEffect(() => {
    return function cleanup() {
      getLocations();
    };
    // eslint-disable-next-line
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location.cityName || !location.townName)
      setTownNameError("Please choise a city and  enter a  town ");
    else {
      const hasDuplicateLocation = Locations.some(
        (loc) =>
          loc.cityName.toLowerCase() === location.cityName.toLowerCase() &&
          loc.townName.toLowerCase() === location.townName.toLowerCase()
      );
      if (hasDuplicateLocation) {
        setTownNameError("Already exists.");
      } else {
        createLocation(location);
      }
    }
  };
  return (
    <>
      <div className="create-section">
        <div
          className="container-load-form"
          style={{ display: FormLocationLoader ? "block" : "none" }}
        >
          {[...Array(16)].map((_, index) => (
            <div key={index} className="block-load-form"></div>
          ))}
        </div>

        <form
          style={{ display: FormLocationLoader ? "none" : "flex" }}
          className="form-create"
          onSubmit={handleSubmit}
        >
          <div className="form-title">
            Add A New
            <span className="form-title-sw">&nbsp;Location.</span>
          </div>

          <div className="form-input-container">
            <div className="input-group">
              <div className="custom-select">
                <div
                  className="selected-option"
                  onClick={() => setShowDropdownCar(!ShowDropdownCar)}
                >
                  {!location.cityName ? (
                    <div className="input-container-option input-dropdown">
                      Select city name{" "}
                    </div>
                  ) : (
                    <div>
                      <div className="input-container-option input-dropdown-title">
                        Select city name
                      </div>
                      <div className="input-container-option input-dropdown input-selected">
                        {location.cityName}
                      </div>
                    </div>
                  )}
                  <RiArrowDownSLine className="arrow-icon" />
                </div>
                {ShowDropdownCar && (
                  <div className="options" id="input-dropdown">
                    <div className="option-title">Select A City</div>
                    <input
                      type="text"
                      placeholder="Search City..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="input-search"
                    />
                    {filteredCitys.map((carName) => (
                      <div
                        className="option"
                        key={carName}
                        onClick={() => handleCity(carName)}
                      >
                        {carName}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="input-container-group">
                <div className="input-container">
                  <input
                    maxLength={40}
                    type="text"
                    name="townName"
                    onChange={handleTownName}
                    required
                  />
                  <div
                    className="input-container-option"
                    onClick={() =>
                      document.getElementsByName("townName")[0].focus()
                    }
                  >
                    Town Name
                  </div>
                </div>
              </div>
            </div>
            <div className="buttons">
              <button className="btn btn-primary btn-fill" type="submit">
                Add
              </button>

              <button
                onClick={() => setAddDialogState("")}
                className={`btn btn-secondary btn-fill`}
              >
                Cancel
              </button>
            </div>
            {townNameError && (
              <span className="wrong-info">
                <AiFillExclamationCircle />
                {townNameError}
              </span>
            )}
            {LocationSuccess && (
              <span className="success-info">
                <AiFillExclamationCircle />
                {LocationSuccess}
              </span>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default AddLoc;
