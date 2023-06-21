import { useEffect, useMemo, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import "./HousingSection.css";
import { Helmet } from "react-helmet";
import useLoader from "../../../../hooks/useLoader";
import HousingCard from "../housing_card/HousingCard";
import useHousings from "../../../../hooks/useHousings";
import useUserRelationData from "../../../../hooks/useUserRelationData";
import useAuth from "../../../../hooks/useAuth";
import useComponent from "../../../../hooks/useComponent";
import Menu from "../../../menu/menu";
import HousingView from "./../housing_view/HousingView";
import DashboardNavbar from "../../../navbar/dashboard_navbar/DashboardNavbar";
import HousingForm from "../housing_form/HousingForm";
import "../../../../pages/dashboard/Dashboard.css";

const HousingSection = () => {
  const { getHousings, HousingSuccess, setHousings, Housings } = useHousings();
  const { HousingLoader } = useLoader();
  const SORT_TYPES = ["Gender", "Date", "Rental Price"];
  const SORT_TYPES_OWNE = ["Gender", "Date", "Rental Price"];
  const [maxCards, setMaxCards] = useState(3);

  const [sortTypeOwne, setSortTypeOwne] = useState("");
  const [sortType, setSortType] = useState("");
  const [showDropdownSortOwne, setShowDropdownSortOwne] = useState("");
  const [showDropdownSort, setShowDropdownSort] = useState("");
  const { MyHousings, UserRelationDataLoader } = useUserRelationData();
  const { decodedJwt } = useAuth();
  const { ButtonCards, filteredValue, setOptionMenu } = useComponent();

  useMemo(() => {
    const handleOutsideClick = (event) => {
      if (
        !event.target.closest(".custom-select") &&
        !event.target.closest(".input-container-option")
      ) {
        setShowDropdownSortOwne(false);
        setShowDropdownSort(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
    // eslint-disable-next-line
  }, [showDropdownSortOwne, showDropdownSort]);

  useEffect(() => {
    getHousings();
    // eslint-disable-next-line
  }, [HousingSuccess]);
  useEffect(() => {
    return function cleanup() {
      setHousings("");
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

  const handleShowMore = () => {
    setMaxCards(maxCards + 3);
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
      {(ButtonCards === "CreateHousing" || ButtonCards === "UpdateHousing") && (
        <HousingForm />
      )}

      {ButtonCards === "ViewHousing" && <HousingView />}

      <div style={{ opacity: ButtonCards ? 0.2 : 1 }}>
        <div className={`dashboard-container  `}>
          <Menu />
          <div className={`dashboard  `}>
            <DashboardNavbar />

            <div
              className="service-container-owne"
              style={{ display: MyHousings.length !== 0 ? "flex" : "none" }}
            >
              <div className="services-head">
                <div className="services-head-title">Your Housing</div>
                <div className="filterboxs">
                  <div className="input-group">
                    <div className="custom-select">
                      <div
                        className="selected-option"
                        onClick={() =>
                          setShowDropdownSortOwne(!showDropdownSortOwne)
                        }
                      >
                        {!sortTypeOwne ? (
                          <div className="input-container-option input-dropdown">
                            Sort By
                          </div>
                        ) : (
                          <div>
                            <div className="input-container-option input-dropdown-title">
                              Sort By
                            </div>
                            <div className="input-container-option input-dropdown input-selected">
                              {sortTypeOwne}
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
                  Object.values(MyHousings)
                    .slice(0, maxCards)
                    .map((housing) => (
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
                    ))}
                {sortType === "Gender" &&
                  Object.values(MyHousings)
                    .sort((a, b) => (a.gender > b.gender ? 1 : -1))
                    .slice(0, maxCards)
                    .map((housing) => (
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
                    ))}
                {sortType === "Date" &&
                  Object.values(MyHousings)
                    .sort(
                      (a, b) =>
                        Date.parse(b.createdOn) - Date.parse(a.createdOn)
                    )
                    .slice(0, maxCards)
                    .map((housing) => (
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
                    ))}
                {sortType === "Rental Price" &&
                  Object.values(MyHousings)
                    .sort((a, b) => b.rentalPrice - a.rentalPrice)
                    .slice(0, maxCards)
                    .map((housing) => (
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
                    ))}
              </div>
              <div className="show-more-button">
                <div
                  className="btn btn-primary btn-fill"
                  onClick={handleShowMore}
                >
                  Show More
                </div>
              </div>
            </div>
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
                    Object.values(Housings)
                      .filter((housing) => housing.studentId !== decodedJwt.uid)
                      .map((housing) => (
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
                    Object.values(filteredValue)
                      .filter((housing) => housing.studentId !== decodedJwt.uid)
                      .map((housing) => (
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
                      ))}

                {!filteredValue
                  ? sortType === "Gender" &&
                    Object.values(Housings)
                      .filter((housing) => housing.studentId !== decodedJwt.uid)
                      .sort((a, b) => (a.gender > b.gender ? 1 : -1))
                      .map((housing) => (
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
                  : sortType === "Gender" &&
                    Object.values(filteredValue)
                      .filter((housing) => housing.studentId !== decodedJwt.uid)
                      .sort((a, b) => (a.gender > b.gender ? 1 : -1))
                      .map((housing) => (
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
                      ))}

                {!filteredValue
                  ? sortType === "Date" &&
                    Object.values(Housings)
                      .filter((housing) => housing.studentId !== decodedJwt.uid)
                      .sort(
                        (a, b) =>
                          Date.parse(b.createdOn) - Date.parse(a.createdOn)
                      )
                      .map((housing) => (
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
                  : sortType === "Date" &&
                    Object.values(filteredValue)
                      .filter((housing) => housing.studentId !== decodedJwt.uid)
                      .sort(
                        (a, b) =>
                          Date.parse(b.createdOn) - Date.parse(a.createdOn)
                      )
                      .map((housing) => (
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
                      ))}

                {!filteredValue
                  ? sortType === "Rental Price" &&
                    Object.values(Housings)
                      .filter((housing) => housing.studentId !== decodedJwt.uid)
                      .sort((a, b) => b.rentalPrice - a.rentalPrice)
                      .map((housing) => (
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
                  : sortType === "Rental Price" &&
                    Object.values(filteredValue)
                      .filter((housing) => housing.studentId !== decodedJwt.uid)
                      .sort((a, b) => b.rentalPrice - a.rentalPrice)
                      .map((housing) => (
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
                      ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HousingSection;
