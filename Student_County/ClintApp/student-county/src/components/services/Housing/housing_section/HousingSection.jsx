import { useEffect, useMemo, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import "./HousingSection.css";
import { Helmet } from "react-helmet";
import useLoader from "../../../../hooks/useLoader";
import HousingCard from "../housing_card/HousingCard";
import useHousings from "../../../../hooks/useHousings";

const HousingSection = ({ filteredValue }) => {
  const { getHousings, Success, setHousing, Housings } = useHousings();
  const { HousingLoader } = useLoader();
  const SORT_TYPES = ["Name", "Date", "Age"];
  const [showDropdownType, setShowDropdownType] = useState("");
  const [sortType, setSortType] = useState("");
  const [showDropdownSort, setShowDropdownSort] = useState("");

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

  useEffect(() => {
    getHousings();
    // eslint-disable-next-line
  }, [Success]);
  useEffect(() => {
    return function cleanup() {
      setHousing("");
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
        <title>Housing</title>
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
            style={{ display: HousingLoader ? "block" : "none" }}
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
              Object.values(Housings).map((housing) => (
                <HousingCard
                  studentName={housing.studentName}
                  createdOn={formatDate(housing.createdOn)}
                  key={housing.id}
                  id={housing.id}
                  studentId={housing.studentId}
                  homeType={housing.homeType}
                  rentalPrice={housing.rentalPrice}
                  address={housing.address}
                  city={housing.city}
                  province={housing.province}
                  typeOfContract={housing.typeOfContract}
                  bedRoom={housing.bedRoom}
                  bathRoom={housing.bathRoom}
                />
              ))
            : !sortType &&
              Object.values(filteredValue).map((housing) => (
                <HousingCard
                  studentName={housing.studentName}
                  createdOn={formatDate(housing.createdOn)}
                  key={housing.id}
                  id={housing.id}
                  studentId={housing.userId}
                  homeType={housing.homeType}
                  rentalPrice={housing.rentalPrice}
                  address={housing.address}
                  city={housing.city}
                  province={housing.province}
                  typeOfContract={housing.typeOfContract}
                  bedRoom={housing.bedRoom}
                  bathRoom={housing.bathRoom}
                />
              ))}
          {!filteredValue
            ? sortType === "Name" &&
              Object.values(Housings)
                .sort((a, b) => (a.userName > b.userName ? 1 : -1))
                .map((housing) => (
                  <HousingCard
                    studentName={housing.studentName}
                    createdOn={formatDate(housing.createdOn)}
                    key={housing.id}
                    id={housing.id}
                    studentId={housing.userId}
                    homeType={housing.homeType}
                    rentalPrice={housing.rentalPrice}
                    address={housing.address}
                    city={housing.city}
                    province={housing.province}
                    typeOfContract={housing.typeOfContract}
                    bedRoom={housing.bedRoom}
                    bathRoom={housing.bathRoom}
                  />
                ))
            : sortType === "Name" &&
              Object.values(filteredValue)
                .sort((a, b) => (a.userName > b.userName ? 1 : -1))
                .map((housing) => (
                  <HousingCard
                    studentName={housing.studentName}
                    createdOn={formatDate(housing.createdOn)}
                    key={housing.id}
                    id={housing.id}
                    studentId={housing.userId}
                    homeType={housing.homeType}
                    rentalPrice={housing.rentalPrice}
                    address={housing.address}
                    city={housing.city}
                    province={housing.province}
                    typeOfContract={housing.typeOfContract}
                    bedRoom={housing.bedRoom}
                    bathRoom={housing.bathRoom}
                  />
                ))}
          {!filteredValue
            ? sortType === "Date" &&
              Object.values(Housings)
                .sort(
                  (a, b) => Date.parse(b.createdOn) - Date.parse(a.createdOn)
                )
                .map((housing) => (
                  <HousingCard
                    studentName={housing.studentName}
                    createdOn={formatDate(housing.createdOn)}
                    key={housing.id}
                    id={housing.id}
                    studentId={housing.userId}
                    homeType={housing.homeType}
                    rentalPrice={housing.rentalPrice}
                    address={housing.address}
                    city={housing.city}
                    province={housing.province}
                    typeOfContract={housing.typeOfContract}
                    bedRoom={housing.bedRoom}
                    bathRoom={housing.bathRoom}
                  />
                ))
            : sortType === "Date" &&
              Object.values(filteredValue)
                .sort(
                  (a, b) => Date.parse(b.createdOn) - Date.parse(a.createdOn)
                )
                .map((housing) => (
                  <HousingCard
                    studentName={housing.studentName}
                    createdOn={formatDate(housing.createdOn)}
                    key={housing.id}
                    id={housing.id}
                    studentId={housing.userId}
                    homeType={housing.homeType}
                    rentalPrice={housing.rentalPrice}
                    address={housing.address}
                    city={housing.city}
                    province={housing.province}
                    typeOfContract={housing.typeOfContract}
                    bedRoom={housing.bedRoom}
                    bathRoom={housing.bathRoom}
                  />
                ))}
          {!filteredValue
            ? sortType === "Age" &&
              Object.values(Housings)
                .sort((a, b) => b.age - a.age)
                .map((housing) => (
                  <HousingCard
                    studentName={housing.studentName}
                    createdOn={formatDate(housing.createdOn)}
                    key={housing.id}
                    id={housing.id}
                    studentId={housing.userId}
                    homeType={housing.homeType}
                    rentalPrice={housing.rentalPrice}
                    address={housing.address}
                    city={housing.city}
                    province={housing.province}
                    typeOfContract={housing.typeOfContract}
                    bedRoom={housing.bedRoom}
                    bathRoom={housing.bathRoom}
                  />
                ))
            : sortType === "Age" &&
              Object.values(filteredValue)
                .sort((a, b) => b.age - a.age)
                .map((housing) => (
                  <HousingCard
                    studentName={housing.studentName}
                    createdOn={formatDate(housing.createdOn)}
                    key={housing.id}
                    id={housing.id}
                    studentId={housing.userId}
                    homeType={housing.homeType}
                    rentalPrice={housing.rentalPrice}
                    address={housing.address}
                    city={housing.city}
                    province={housing.province}
                    typeOfContract={housing.typeOfContract}
                    bedRoom={housing.bedRoom}
                    bathRoom={housing.bathRoom}
                  />
                ))}
        </div>
      </div>
    </>
  );
};

export default HousingSection;
