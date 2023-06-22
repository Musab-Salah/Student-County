import usePatient from "../../../../hooks/usePatient";
import { useEffect, useMemo, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import "./PatientSection.css";
import { Helmet } from "react-helmet";
import useLoader from "../../../../hooks/useLoader";
import PatientCard from "../patient_card/PatientCard";
import useAuth from "../../../../hooks/useAuth";
import useUserRelationData from "../../../../hooks/useUserRelationData";
import useComponent from "../../../../hooks/useComponent";
import Menu from "../../../menu/menu";
import DashboardNavbar from "../../../navbar/dashboard_navbar/DashboardNavbar";
import PatientForm from "../patient_form/PatientForm";
import PatientView from "../patient_view/PatientView";
import "../../../../pages/dashboard/Dashboard.css";

const PatientSection = () => {
  const { decodedJwt } = useAuth();
  const { getPatient, PatientSuccess, setPatients, Patients } = usePatient();
  const { PatientLoader } = useLoader();
  const SORT_TYPES = ["Gender", "Date", "Age"];
  const SORT_TYPES_OWNE = ["Gender", "Date", "Age"];
  const { MyPatients, UserRelationDataLoader } = useUserRelationData();
  const [maxCards, setMaxCards] = useState(3);
  const { ButtonCards, filteredValue, setOptionMenu } = useComponent();

  const [SortTypeOwne, setSortTypeOwne] = useState("");
  const [sortType, setSortType] = useState("");
  const [showDropdownSort, setShowDropdownSort] = useState("");
  const [showDropdownSortOwne, setShowDropdownSortOwne] = useState("");
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
    getPatient();
    // eslint-disable-next-line
  }, [PatientSuccess]);
  useEffect(() => {
    return function cleanup() {
      setPatients("");
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
  return (
    <>
      <Helmet>
        <title>Patient</title>
      </Helmet>
      {(ButtonCards === "CreatePatient" || ButtonCards === "UpdatePatient") && (
        <PatientForm />
      )}

      {ButtonCards === "ViewPatient" && <PatientView />}

      <div style={{ opacity: ButtonCards ? 0.2 : 1 }}>
        <div className={`dashboard-container  `}>
          <Menu />
          <div className={`dashboard  `}>
            <DashboardNavbar />
            <div
              className="service-container-owne"
              style={{ display: MyPatients.length !== 0 ? "flex" : "none" }}
            >
              <div className="services-head">
                <div className="services-head-title">Your Patients</div>
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
                  Object.values(MyPatients)
                    .slice(0, maxCards)
                    .map((patient) => (
                      <PatientCard
                        lastName={patient.lastName}
                        firstName={patient.firstName}
                        age={patient.age}
                        gender={patient.gender}
                        typeOfTreatment={patient.typeOfTreatment}
                        createdOn={formatDate(patient.createdOn)}
                        key={patient.id}
                        id={patient.id}
                        userId={patient.userId}
                      />
                    ))}
                {sortType === "Gender" &&
                  Object.values(MyPatients)
                    .sort((a, b) => (a.gender > b.gender ? 1 : -1))
                    .slice(0, maxCards)
                    .map((patient) => (
                      <PatientCard
                        lastName={patient.lastName}
                        firstName={patient.firstName}
                        age={patient.age}
                        gender={patient.gender}
                        typeOfTreatment={patient.typeOfTreatment}
                        createdOn={formatDate(patient.createdOn)}
                        key={patient.id}
                        id={patient.id}
                        userId={patient.userId}
                      />
                    ))}
                {sortType === "Date" &&
                  Object.values(MyPatients)
                    .sort(
                      (a, b) =>
                        Date.parse(b.createdOn) - Date.parse(a.createdOn)
                    )
                    .slice(0, maxCards)
                    .map((patient) => (
                      <PatientCard
                        lastName={patient.lastName}
                        firstName={patient.firstName}
                        age={patient.age}
                        gender={patient.gender}
                        typeOfTreatment={patient.typeOfTreatment}
                        createdOn={formatDate(patient.createdOn)}
                        key={patient.id}
                        id={patient.id}
                        userId={patient.userId}
                      />
                    ))}
                {sortType === "Age" &&
                  Object.values(MyPatients)
                    .sort((a, b) => b.age - a.age)
                    .slice(0, maxCards)
                    .map((patient) => (
                      <PatientCard
                        lastName={patient.lastName}
                        firstName={patient.firstName}
                        age={patient.age}
                        gender={patient.gender}
                        typeOfTreatment={patient.typeOfTreatment}
                        createdOn={formatDate(patient.createdOn)}
                        key={patient.id}
                        id={patient.id}
                        userId={patient.userId}
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
                  style={{ display: PatientLoader ? "block" : "none" }}
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
                    Object.values(Patients)
                      .filter((patient) => patient.userId !== decodedJwt.uid)
                      .map((patient) => (
                        <PatientCard
                          lastName={patient.lastName}
                          firstName={patient.firstName}
                          age={patient.age}
                          gender={patient.gender}
                          typeOfTreatment={patient.typeOfTreatment}
                          createdOn={formatDate(patient.createdOn)}
                          key={patient.id}
                          id={patient.id}
                          userId={patient.userId}
                        />
                      ))
                  : !sortType &&
                    Object.values(filteredValue)
                      .filter((patient) => patient.userId !== decodedJwt.uid)
                      .map((patient) => (
                        <PatientCard
                          lastName={patient.lastName}
                          firstName={patient.firstName}
                          age={patient.age}
                          gender={patient.gender}
                          typeOfTreatment={patient.typeOfTreatment}
                          createdOn={formatDate(patient.createdOn)}
                          key={patient.id}
                          id={patient.id}
                          userId={patient.userId}
                        />
                      ))}

                {!filteredValue
                  ? sortType === "Gender" &&
                    Object.values(Patients)
                      .filter((patient) => patient.userId !== decodedJwt.uid)
                      .sort((a, b) => (a.gender > b.gender ? 1 : -1))
                      .map((patient) => (
                        <PatientCard
                          lastName={patient.lastName}
                          firstName={patient.firstName}
                          age={patient.age}
                          gender={patient.gender}
                          typeOfTreatment={patient.typeOfTreatment}
                          createdOn={formatDate(patient.createdOn)}
                          key={patient.id}
                          id={patient.id}
                          userId={patient.userId}
                        />
                      ))
                  : sortType === "Gender" &&
                    Object.values(filteredValue)
                      .filter((patient) => patient.userId !== decodedJwt.uid)
                      .sort((a, b) => (a.gender > b.gender ? 1 : -1))
                      .map((patient) => (
                        <PatientCard
                          lastName={patient.lastName}
                          firstName={patient.firstName}
                          age={patient.age}
                          gender={patient.gender}
                          typeOfTreatment={patient.typeOfTreatment}
                          createdOn={formatDate(patient.createdOn)}
                          key={patient.id}
                          id={patient.id}
                          userId={patient.userId}
                        />
                      ))}

                {!filteredValue
                  ? sortType === "Date" &&
                    Object.values(Patients)
                      .filter((patient) => patient.userId !== decodedJwt.uid)
                      .sort(
                        (a, b) =>
                          Date.parse(b.createdOn) - Date.parse(a.createdOn)
                      )
                      .map((patient) => (
                        <PatientCard
                          lastName={patient.lastName}
                          firstName={patient.firstName}
                          age={patient.age}
                          gender={patient.gender}
                          typeOfTreatment={patient.typeOfTreatment}
                          createdOn={formatDate(patient.createdOn)}
                          key={patient.id}
                          id={patient.id}
                          userId={patient.userId}
                        />
                      ))
                  : sortType === "Date" &&
                    Object.values(filteredValue)
                      .filter((patient) => patient.userId !== decodedJwt.uid)
                      .sort(
                        (a, b) =>
                          Date.parse(b.createdOn) - Date.parse(a.createdOn)
                      )
                      .map((patient) => (
                        <PatientCard
                          lastName={patient.lastName}
                          firstName={patient.firstName}
                          age={patient.age}
                          gender={patient.gender}
                          typeOfTreatment={patient.typeOfTreatment}
                          createdOn={formatDate(patient.createdOn)}
                          key={patient.id}
                          id={patient.id}
                          userId={patient.userId}
                        />
                      ))}

                {!filteredValue
                  ? sortType === "Age" &&
                    Object.values(Patients)
                      .filter((patient) => patient.userId !== decodedJwt.uid)
                      .sort((a, b) => b.age - a.age)
                      .map((patient) => (
                        <PatientCard
                          lastName={patient.lastName}
                          firstName={patient.firstName}
                          age={patient.age}
                          gender={patient.gender}
                          typeOfTreatment={patient.typeOfTreatment}
                          createdOn={formatDate(patient.createdOn)}
                          key={patient.id}
                          id={patient.id}
                          userId={patient.userId}
                        />
                      ))
                  : sortType === "Age" &&
                    Object.values(filteredValue)
                      .filter((patient) => patient.userId !== decodedJwt.uid)
                      .sort((a, b) => b.age - a.age)
                      .map((patient) => (
                        <PatientCard
                          lastName={patient.lastName}
                          firstName={patient.firstName}
                          age={patient.age}
                          gender={patient.gender}
                          typeOfTreatment={patient.typeOfTreatment}
                          createdOn={formatDate(patient.createdOn)}
                          key={patient.id}
                          id={patient.id}
                          userId={patient.userId}
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

export default PatientSection;
