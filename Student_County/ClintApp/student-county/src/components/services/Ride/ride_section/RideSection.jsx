import RideCard from "../ride_card/RideCard";
import useRides from "../../../../hooks/useRides";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import "./RideSection.css";
import { Helmet } from "react-helmet";
import useLoader from "../../../../hooks/useLoader";
import useLocation from "../../../../hooks/useLocation";
import useAuth from "../../../../hooks/useAuth";
import useUserRelationData from "../../../../hooks/useUserRelationData";
import useComponent from "../../../../hooks/useComponent";
import DashboardNavbar from "../../../navbar/dashboard_navbar/DashboardNavbar";
import Menu from "../../../menu/menu";
import RideForm from "../ride_form/RideForm";
import RideView from "../ride_view/RideView";
import "../../../../pages/dashboard/Dashboard.css";
import GeolocationApp from "../../../geo_location/GeoLocation";
import GoogleMapApi from './../../../google_map_api/GoogleMapApi';


const RideSection = () => {
  const { decodedJwt } = useAuth();
  const { Rides, getRides, RideSuccess, setRides } = useRides();
  const { getLocations, Locations } = useLocation();
  const { RideLoader } = useLoader();
  const SORT_TYPES = ["Gender", "Date", "Empty Seats"];
  const SORT_TYPES_OWNE = ["Gender", "Date", "Empty Seats"];
  const [maxCards, setMaxCards] = useState(3);
  const { ButtonCards, filteredValue, setOptionMenu } = useComponent();

  const [SortTypeOwne, setSortTypeOwne] = useState("");
  const [sortType, setSortType] = useState("");
  const [showDropdownSort, setShowDropdownSort] = useState("");
  const [showDropdownSortOwne, setShowDropdownSortOwne] = useState("");
  const { MyRides, UserRelationDataLoader } = useUserRelationData();
  const [showDropdownCollege, setShowDropdownCollege] = useState(false);
  const [selectLocation, setSelectLocation] = useState("");

  const [nowLocation, setNowLocation] = useState("");
  const [query, setQuery] = useState("");

  const deferredInput = useDeferredValue(query);

  const filteredCitys = Object.values(Locations).filter(
    (Location) =>
      Location.cityName.toLowerCase().includes(deferredInput.toLowerCase()) ||
      Location.townName.toLowerCase().includes(deferredInput.toLowerCase())
  );
  const handleShowMore = () => {
    setMaxCards(maxCards + 3);
  };
  useMemo(() => {
    const handleOutsideClick = (event) => {
      if (
        !event.target.closest(".custom-select") &&
        !event.target.closest(".input-container-option")
      ) {
        setShowDropdownSortOwne(false);
        setShowDropdownCollege(false);
        setShowDropdownSort(false);
        setQuery("");
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
    // eslint-disable-next-line
  }, [showDropdownSortOwne, showDropdownSort, showDropdownCollege]);

  useEffect(() => {
    getLocations();
    getRides();
    // eslint-disable-next-line
  }, [RideSuccess]);
  useEffect(() => {
    return function cleanup() {
      setRides("");
      setOptionMenu("");
    };
    // eslint-disable-next-line
  }, []);
  const handleSortChange = (sort) => {
    setSortType(sort);
    setShowDropdownSort(false);
  };

  const handleSortOwneChange = (sort) => {
    setSortTypeOwne(sort);
    setShowDropdownSortOwne(false);
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
  const handleLocationChange = (college) => {
    if (college) setSelectLocation(college);
    else setSelectLocation(false);
    setShowDropdownCollege(false);
  };

  return (
    <>
      <Helmet>
        <title>Ride</title>
      </Helmet>
      {(ButtonCards === "CreateRide" || ButtonCards === "UpdateRide") && (
        <RideForm />
      )}
      {ButtonCards === "ViewRide" && <RideView />}
      <GeolocationApp />
      <GoogleMapApi/>
      <div style={{ opacity: ButtonCards ? 0.2 : 1 }}>
        <div className={`dashboard-container  `}>
          <Menu />
          <div className={`dashboard  `}>
            <DashboardNavbar />
            <div
              className="service-container-owne"
              style={{ display: MyRides.length !== 0 ? "flex" : "none" }}
            >

              <div className="services-head">
                <div className="services-head-title">Your Ride</div>
                <div className="filterboxs">
                  <div className="input-group">
                    <div className="custom-select">
                      <div
                        className="selected-option"
                        onClick={() =>
                          setShowDropdownSortOwne(!showDropdownSortOwne)
                        }
                      >
                        {!SortTypeOwne ? (
                          <div className="input-container-option input-dropdown">
                            Sort By
                          </div>
                        ) : (
                          <div>
                            <div className="input-container-option input-dropdown-title">
                              Sort By
                            </div>
                            <div className="input-container-option input-dropdown input-selected">
                              {SortTypeOwne}
                            </div>
                          </div>
                        )}

                        <RiArrowDownSLine className="arrow-icon" />
                      </div>
                      {showDropdownSortOwne && (
                        <div className="options" id="input-dropdown">
                          <div className="option-title">Sort By</div>
                          {SORT_TYPES_OWNE.map((sort, index) => (
                            <div
                              key={index}
                              className="option"
                              onClick={() => handleSortOwneChange(sort)}
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
              <div className="cards-owne">
                <div
                  className="loader-overview"
                  style={{ display: UserRelationDataLoader ? "block" : "none" }}
                >
                  <div className="loader-square"></div>
                  <div className="loader-square"></div>
                  <div className="loader-square"></div>
                  <div className="loader-square"></div>
                  <div className="loader-square"></div>
                  <div className="loader-square"></div>
                  <div className="loader-square"></div>
                </div>

                {!sortType &&
                  Object.values(MyRides)
                    .slice(0, maxCards)
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
                        longDescription={ride.longDescription}
                        gender={ride.gender}
                      />
                    ))}
                {sortType === "Gender" &&
                  Object.values(MyRides)
                    .sort((a, b) => (a.gender > b.gender ? 1 : -1))
                    .slice(0, maxCards)
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
                        longDescription={ride.longDescription}
                        gender={ride.gender}
                      />
                    ))}
                {sortType === "Date" &&
                  Object.values(MyRides)
                    .sort(
                      (a, b) =>
                        Date.parse(b.createdOn) - Date.parse(a.createdOn)
                    )
                    .slice(0, maxCards)
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
                        longDescription={ride.longDescription}
                        gender={ride.gender}
                      />
                    ))}
                {sortType === "Empty Seats" &&
                  Object.values(MyRides)
                    .sort((a, b) => b.emptySeats - a.emptySeats)
                    .slice(0, maxCards)
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
                        longDescription={ride.longDescription}
                        gender={ride.gender}
                      />
                    ))}
              </div>
              <div className="show-more-button">
                <div
                  className="btn btn-primary btn-fill btn-show"
                  onClick={handleShowMore}
                >
                  Show More
                </div>
              </div>
              <div className="vertical-line"></div>
            </div>
            <div className="service-container">
              <div className="services-head">
                <div className="services-head-title">Find Services</div>
                <div className="filterboxs">
                  <div className="input-group">
                    <div className="custom-select-select-by-college">
                      <div className="custom-select">
                        <div
                          className="selected-option"
                          onClick={() =>
                            setShowDropdownCollege(!showDropdownCollege)
                          }
                        >
                          {!selectLocation ? (
                            <div
                              className="input-container-option input-dropdown"
                              style={{ width: "max-content" }}
                            >
                              Select By Location
                            </div>
                          ) : (
                            <div>
                              <div
                                className="input-container-option input-dropdown-title"
                                style={{ width: "max-content" }}
                              >
                                Select By Location
                              </div>
                              <div className="input-container-option input-dropdown input-selected">
                                {selectLocation.cityName},
                                {selectLocation.townName}
                              </div>
                            </div>
                          )}
                          <RiArrowDownSLine className="arrow-icon" />
                        </div>
                        {showDropdownCollege && (
                          <div className="options" id="input-dropdown">
                            <div className="option-title">Location</div>

                            <input
                              type="text"
                              placeholder="Search Location..."
                              value={query}
                              onChange={(e) => setQuery(e.target.value)}
                              className="input-search"
                            />
                            <div
                              onClick={() => handleLocationChange(false)}
                              className="option"
                            >
                              All
                            </div>
                            {filteredCitys.map((college) => (
                              <div
                                className="option"
                                key={college.id}
                                onClick={() => handleLocationChange(college)}
                              >
                                {college.cityName},{college.townName}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
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
                    Object.values(Rides)
                      .filter((loc) =>
                        selectLocation
                          ? loc.locationId === selectLocation.id
                          : true
                      )
                      .filter((ride) => ride.studentId !== decodedJwt.uid)
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
                          longDescription={ride.longDescription}
                          gender={ride.gender}
                        />
                      ))
                  : !sortType &&
                    Object.values(filteredValue)
                      .filter((loc) =>
                        selectLocation
                          ? loc.locationId === selectLocation.id
                          : true
                      )
                      .filter((ride) => ride.studentId !== decodedJwt.uid)
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
                          longDescription={ride.longDescription}
                          gender={ride.gender}
                        />
                      ))}

                {!filteredValue
                  ? sortType === "Gender" &&
                    Object.values(Rides)
                      .filter((ride) => ride.studentId !== decodedJwt.uid)
                      .sort((a, b) => (a.gender > b.gender ? 1 : -1))
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
                          longDescription={ride.longDescription}
                          gender={ride.gender}
                        />
                      ))
                  : sortType === "Gender" &&
                    Object.values(filteredValue)
                      .filter((ride) => ride.studentId !== decodedJwt.uid)
                      .sort((a, b) => (a.gender > b.gender ? 1 : -1))
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
                          longDescription={ride.longDescription}
                          gender={ride.gender}
                        />
                      ))}

                {!filteredValue
                  ? sortType === "Date" &&
                    Object.values(Rides)
                      .filter((ride) => ride.studentId !== decodedJwt.uid)
                      .sort(
                        (a, b) =>
                          Date.parse(b.createdOn) - Date.parse(a.createdOn)
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
                          longDescription={ride.longDescription}
                          gender={ride.gender}
                        />
                      ))
                  : sortType === "Date" &&
                    Object.values(filteredValue)
                      .filter((ride) => ride.studentId !== decodedJwt.uid)
                      .sort(
                        (a, b) =>
                          Date.parse(b.createdOn) - Date.parse(a.createdOn)
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
                          longDescription={ride.longDescription}
                          gender={ride.gender}
                        />
                      ))}

                {!filteredValue
                  ? sortType === "Empty Seats" &&
                    Object.values(Rides)
                      .filter((ride) => ride.studentId !== decodedJwt.uid)
                      .sort((a, b) => b.emptySeats - a.emptySeats)
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
                          longDescription={ride.longDescription}
                          gender={ride.gender}
                        />
                      ))
                  : sortType === "Empty Seats" &&
                    Object.values(filteredValue)
                      .filter((ride) => ride.studentId !== decodedJwt.uid)
                      .sort((a, b) => b.emptySeats - a.emptySeats)
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
                          longDescription={ride.longDescription}
                          gender={ride.gender}
                        />
                      ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RideSection;
