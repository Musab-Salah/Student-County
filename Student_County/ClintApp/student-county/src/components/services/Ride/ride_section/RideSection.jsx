import RideCard from "../ride_card/RideCard";
import useRides from "../../../../hooks/useRides";
import { useEffect, useMemo, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import "./RideSection.css";
import { Helmet } from "react-helmet";
import useLoader from "../../../../hooks/useLoader";
import useLocation from "../../../../hooks/useLocation";

const RideSection = ({ filteredValue }) => {
  const { Rides, getRides, Success, setRides } = useRides();
  const { getLocations, Locations } = useLocation();
  const { RideLoader } = useLoader();
  const SORT_TYPES = ["Name", "Date", "Price"];
  const [showDropdownType, setShowDropdownType] = useState("");
  const [sortType, setSortType] = useState("");
  const [showDropdownSort, setShowDropdownSort] = useState("");
  const [nowLocation, setNowLocation] = useState("");

  useMemo(() => {
    const handleOutsideClick = (event) => {
      if (
        !event.target.closest(".custom-select") &&
        !event.target.closest(".input-container-option")
      ) {
        setShowDropdownType(false);
        setShowDropdownSort(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
    // eslint-disable-next-line
  }, [showDropdownType, showDropdownSort]);

  const getMyLocation = (locationId) => {
    const foundLocation = Locations.find(
      (location) => location.id === locationId
    );
    setNowLocation(foundLocation);
  };

  useEffect(() => {
    getRides();
    getLocations();
    // eslint-disable-next-line
  }, [Success]);
  useEffect(() => {
    return function cleanup() {
      setRides("");
    };
    // eslint-disable-next-line
  }, []);
  const handleSortChange = (sort) => {
    setSortType(sort);
    setShowDropdownSort(false);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      const formattedTime = date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "numeric",
      });
      return formattedTime;
    } else if (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    ) {
      return "Yesterday";
    } else {
      const formattedDate = date.toLocaleDateString([], {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return formattedDate;
    }
  };
  return (
    <>
      <Helmet>
        <title>Ride</title>
      </Helmet>
      <div className="service-container">
        <div className="services-head">
          <div className="services-head-title">Find Services</div>
          <div className="filterboxs">
            <div className="input-group">
              <div className="custom-select">
                <div
                  className="selected-option"
                  onClick={() => setShowDropdownSort(!showDropdownSort)}
                >
                  {!sortType ? (
                    <div className="input-container-option input-dropdown">
                      Sort By
                    </div>
                  ) : (
                    <div>
                      <div className="input-container-option input-dropdown-title">
                        Sort By
                      </div>
                      <div className="input-container-option input-dropdown input-selected">
                        {sortType}
                      </div>
                    </div>
                  )}

                  <RiArrowDownSLine className="arrow-icon" />
                </div>
                {showDropdownSort && (
                  <div className="options" id="input-dropdown">
                    <div className="option-title">Sort By</div>
                    {SORT_TYPES.map((sort, index) => (
                      <div
                        key={index}
                        className="option"
                        onClick={() => handleSortChange(sort)}
                      >
                        {sort}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="cards">
          <div
            className="loader-overview"
            style={{ display: RideLoader ? "block" : "none" }}
          >
            <div className="loader-square"></div>
            <div className="loader-square"></div>
            <div className="loader-square"></div>
            <div className="loader-square"></div>
            <div className="loader-square"></div>
            <div className="loader-square"></div>
            <div className="loader-square"></div>
          </div>

          {!filteredValue
            ? !sortType &&
              Object.values(Rides).map((ride) => (
                <RideCard
                  createdOn={formatDate(ride.createdOn)}
                  key={ride.id}
                  id={ride.id}
                  ride={ride}
                  studentId={ride.studentId}
                  carDescription={ride.carDescription}
                  shortDescription={ride.shortDescription}
                  emptySeats={ride.emptySeats}
                  locationId={ride.locationId}
                />
              ))
            : !sortType &&
              Object.values(filteredValue).map((ride) => (
                <RideCard
                  createdOn={formatDate(ride.createdOn)}
                  key={ride.id}
                  id={ride.id}
                  ride={ride}
                  studentId={ride.studentId}
                  carDescription={ride.carDescription}
                  shortDescription={ride.shortDescription}
                  emptySeats={ride.emptySeats}
                  locationId={ride.locationId}
                />
              ))}
          {!filteredValue
            ? sortType === "Name" &&
              Object.values(Rides)
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((ride) => (
                  <RideCard
                    createdOn={formatDate(ride.createdOn)}
                    key={ride.id}
                    id={ride.id}
                    ride={ride}
                    studentId={ride.studentId}
                    carDescription={ride.carDescription}
                    shortDescription={ride.shortDescription}
                    emptySeats={ride.emptySeats}
                    locationId={ride.locationId}
                  />
                ))
            : sortType === "Name" &&
              Object.values(filteredValue)
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((ride) => (
                  <RideCard
                    createdOn={formatDate(ride.createdOn)}
                    key={ride.id}
                    id={ride.id}
                    ride={ride}
                    studentId={ride.studentId}
                    carDescription={ride.carDescription}
                    shortDescription={ride.shortDescription}
                    emptySeats={ride.emptySeats}
                    locationId={ride.locationId}
                  />
                ))}
          {!filteredValue
            ? sortType === "Date" &&
              Object.values(Rides)
                .sort(
                  (a, b) => Date.parse(b.createdOn) - Date.parse(a.createdOn)
                )
                .map((ride) => (
                  <RideCard
                    createdOn={formatDate(ride.createdOn)}
                    key={ride.id}
                    id={ride.id}
                    ride={ride}
                    studentId={ride.studentId}
                    carDescription={ride.carDescription}
                    shortDescription={ride.shortDescription}
                    emptySeats={ride.emptySeats}
                    locationId={ride.locationId}
                  />
                ))
            : sortType === "Date" &&
              Object.values(filteredValue)
                .sort(
                  (a, b) => Date.parse(b.createdOn) - Date.parse(a.createdOn)
                )
                .map((ride) => (
                  <RideCard
                    createdOn={formatDate(ride.createdOn)}
                    key={ride.id}
                    id={ride.id}
                    ride={ride}
                    studentId={ride.studentId}
                    carDescription={ride.carDescription}
                    shortDescription={ride.shortDescription}
                    emptySeats={ride.emptySeats}
                    locationId={ride.locationId}
                  />
                ))}
          {!filteredValue
            ? sortType === "Price" &&
              Object.values(Rides)
                .sort((a, b) => b.price - a.price)
                .map((ride) => (
                  <RideCard
                    createdOn={formatDate(ride.createdOn)}
                    key={ride.id}
                    id={ride.id}
                    ride={ride}
                    studentId={ride.studentId}
                    carDescription={ride.carDescription}
                    shortDescription={ride.shortDescription}
                    emptySeats={ride.emptySeats}
                    locationId={ride.locationId}
                  />
                ))
            : sortType === "Price" &&
              Object.values(filteredValue)
                .sort((a, b) => b.price - a.price)
                .map((ride) => (
                  <RideCard
                    createdOn={formatDate(ride.createdOn)}
                    key={ride.id}
                    id={ride.id}
                    ride={ride}
                    studentId={ride.studentId}
                    carDescription={ride.carDescription}
                    shortDescription={ride.shortDescription}
                    emptySeats={ride.emptySeats}
                    locationId={ride.locationId}
                  />
                ))}
        </div>
      </div>
    </>
  );
};

export default RideSection;
