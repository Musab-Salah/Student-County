import { useState, useEffect, useMemo } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { FaBook, FaHome, FaUserCircle } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import BookCard from "../services/books/book_card/BookCard";
import { Helmet } from "react-helmet";
import "./Overview.css";
import "../../pages/dashboard/Dashboard.css";

import useUserRelationData from "../../hooks/useUserRelationData";
import HousingCard from "../services/Housing/housing_card/HousingCard";
import PatientCard from "../services/Patient/patient_card/PatientCard";
import RideCard from "../services/Ride/ride_card/RideCard";
import ToolCard from "../services/Tools/tool_card/ToolCard";
import { TbTools } from "react-icons/tb";
import WithPermission from "../../certificates/WithPermission";
import { IoCarOutline } from "react-icons/io5";
import useComponent from "../../hooks/useComponent";
import useAuth from "../../hooks/useAuth";
import DashboardNavbar from "../navbar/dashboard_navbar/DashboardNavbar";
import Menu from "../menu/menu";
import PatientForm from "../services/Patient/patient_form/PatientForm";
import BooksForm from "../services/books/books_form/BooksForm";
import HousingForm from "../services/Housing/housing_form/HousingForm";
import ToolForm from "../services/Tools/tool_form/ToolForm";
import RideForm from "../services/Ride/ride_form/RideForm";
import BooksView from "../services/books/books_view/BooksView";
import PatientView from "../services/Patient/patient_view/PatientView";
import HousingView from "../services/Housing/housing_view/HousingView";
import ToolView from "../services/Tools/tool_view/ToolView";
import RideView from "../services/Ride/ride_view/RideView";
import useBooks from "../../hooks/useBooks";
import useRides from "../../hooks/useRides";
import useHousings from "../../hooks/useHousings";
import useTools from "../../hooks/useTools";
import usePatient from "../../hooks/usePatient";

const Overview = () => {
  const TYPES = ["All", "Book", "Ride", "House", "Patient", "Tools"];
  const {
    getMyAllUserRelationDatas,
    getAllRecentActivity,
    UserRelationDataLoader,
    MyBooks,
    MyTools,
    MyHousings,
    MyPatients,
    MyRides,
    AllActivity,
  } = useUserRelationData(); //[0]books ,[1]housings,[2]rides,[3]tools,[4]patients
  const { decodedJwt } = useAuth();
  const { setBook } = useBooks();
  const { setRide } = useRides();
  const { setHousing } = useHousings();
  const { setTool } = useTools();
  const { setPatient } = usePatient();

  const { ButtonCards, filteredValue, setOptionMenu } = useComponent();

  const { setButtonCards } = useComponent();
  const [selectType, setSelectType] = useState("");
  const [showDropdownType, setShowDropdownType] = useState(false);
  const [showDropdownSort, setShowDropdownSort] = useState(false);

  const [Bookslength, setBookslength] = useState("");
  const [Housingslength, setHousingslength] = useState("");
  const [Rideslength, setRideslength] = useState("");
  const [Toolslength, setToolslength] = useState("");
  const [Patientslength, setPatientslength] = useState("");
  const [AddServices, setAddServices] = useState(false);

  useEffect(() => {
    getMyAllUserRelationDatas();
    getAllRecentActivity();
    // eslint-disable-next-line
  }, []);
  const handeleAddServices = () => {
    setAddServices(!AddServices);
  };
  const handleTypeChange = (type) => {
    setSelectType(type);
    setShowDropdownType(false);
  };
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
    if (MyBooks) setBookslength(MyBooks.length);
    if (MyTools) setToolslength(MyTools.length);
    if (MyHousings) setHousingslength(MyHousings.length);
    if (MyRides) setRideslength(MyRides.length);
    if (MyPatients) setPatientslength(MyPatients.length);
    // eslint-disable-next-line
  }, [MyBooks, MyTools, MyHousings, MyRides, MyPatients]);

  // useEffect(() => {
  //   return function cleanup() {
  //     setMyBooks("");
  //     setMyTools("");
  //     setMyHousings("");
  //     setMyRides("");
  //     setMyPatients("");
  //   };
  //   // eslint-disable-next-line
  // }, []);
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
  useEffect(() => {
    return function cleanup() {
      setOptionMenu("");
    };
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Helmet>
        <title>Overview</title>
      </Helmet>
      {(ButtonCards === "CreatePatient" || ButtonCards === "UpdatePatient") && (
        <PatientForm />
      )}
      {(ButtonCards === "CreateBook" || ButtonCards === "UpdateBook") && (
        <BooksForm />
      )}
      {(ButtonCards === "CreateHousing" || ButtonCards === "UpdateHousing") && (
        <HousingForm />
      )}
      {(ButtonCards === "CreateTool" || ButtonCards === "UpdateTool") && (
        <ToolForm />
      )}
      {(ButtonCards === "CreateRide" || ButtonCards === "UpdateRide") && (
        <RideForm />
      )}
      {ButtonCards === "ViewBook" && <BooksView />}
      {ButtonCards === "ViewPatient" && <PatientView />}
      {ButtonCards === "ViewHousing" && <HousingView />}
      {ButtonCards === "ViewTool" && <ToolView />}
      {ButtonCards === "ViewRide" && <RideView />}
      <div style={{ opacity: ButtonCards ? 0.2 : 1 }}>
        <div className={`dashboard-container  `}>
          <Menu />
          <div className={`dashboard  `}>
            <DashboardNavbar />

            <div className="info-container">
              <WithPermission
                ScopeRole={["Student", "Dentistry Student", "Admin"]}
              >
                <div className="stats-container">
                  <div
                    onClick={() => handleTypeChange({ name: "Book", id: 2 })}
                    className="stats"
                  >
                    <div className="stats-icon-background">
                      <FaBook className="stats-icon" />
                    </div>
                    <div className="stats-info">
                      <div className="stats-title">BOOKS</div>
                      <div className="stats-number">{Bookslength}</div>
                    </div>
                  </div>
                  <div
                    onClick={() => handleTypeChange({ name: "Ride", id: 3 })}
                    className="stats"
                  >
                    <div className="stats-icon-background">
                      <IoCarOutline className="stats-icon" />
                    </div>
                    <div className="stats-info">
                      <div className="stats-title">RIDING</div>
                      <div className="stats-number">{Rideslength}</div>
                    </div>
                  </div>
                  <div
                    onClick={() => handleTypeChange({ name: "House", id: 4 })}
                    className="stats"
                  >
                    <div className="stats-icon-background">
                      <FaHome className="stats-icon" />
                    </div>
                    <div className="stats-info">
                      <div className="stats-title">HOUSING</div>
                      <div className="stats-number">{Housingslength}</div>
                    </div>
                  </div>
                </div>
              </WithPermission>
              <div className="stats-container">
                <WithPermission
                  ScopeRole={["Student", "Dentistry Student", "Admin"]}
                >
                  <div
                    onClick={() => handleTypeChange({ name: "Tools", id: 6 })}
                    className="stats"
                  >
                    <div className="stats-icon-background">
                      <TbTools className="dash-nav-link-icon" />
                    </div>
                    <div className="stats-info">
                      <div className="stats-title">TOOLS</div>
                      <div className="stats-number">{Toolslength}</div>
                    </div>
                  </div>
                </WithPermission>
                <div
                  onClick={() => handleTypeChange({ name: "Patient", id: 5 })}
                  className="stats"
                >
                  <div className="stats-icon-background">
                    <FaUserCircle className="dash-nav-link-icon" />
                  </div>
                  <div className="stats-info">
                    <div className="stats-title">PATIENTS</div>
                    <div className="stats-number">{Patientslength}</div>
                  </div>
                </div>
              </div>
              <div className="activities-container-over">
                <div className="activities-title">Recent Activities</div>
                <div className="activities-container-scroll">
                  {Object.values(AllActivity)
                    .sort((a, b) => {
                      const aDate =
                        a.modifiedOn > a.createdOn ? a.modifiedOn : a.createdOn;
                      const bDate =
                        b.modifiedOn > b.createdOn ? b.modifiedOn : b.createdOn;

                      if (aDate > bDate) {
                        return -1; // a should be placed before b
                      } else if (aDate < bDate) {
                        return 1; // a should be placed after b
                      } else {
                        return 0; // a and b have the same date, maintain their order
                      }
                    })
                    .map((Activity, index) => (
                      <div
                        className="Item"
                        onClick={() => {
                          if (Activity.serviceName === "Book") {
                            setButtonCards("UpdateBook");
                            setBook(Activity);
                          } else if (Activity.serviceName === "Ride") {
                            setButtonCards("UpdateRide");
                            setRide(Activity);
                          } else if (Activity.serviceName === "Housing") {
                            setButtonCards("UpdateHousing");
                            setHousing(Activity);
                          } else if (Activity.serviceName === "Tools") {
                            setButtonCards("UpdateTool");
                            setTool(Activity);
                          } else if (Activity.serviceName === "Patient") {
                            setButtonCards("UpdatePatient");
                            setPatient(Activity);
                          }
                        }}
                        key={index}
                      >
                        <div className="Pseudo" />
                        <div className="TimeSep25">
                          {Activity.createdOn > Activity.modifiedOn
                            ? formatDate(Activity.createdOn)
                            : formatDate(Activity.modifiedOn)}
                        </div>
                        <div className="UpdateABookCardNameChanged">
                          {Activity.isDeleted
                            ? "Delete"
                            : Activity.createdOn > Activity.modifiedOn
                            ? "Created"
                            : "Update"}{" "}
                          a {Activity.serviceName}{" "}
                          {(Activity.serviceName === "Book" ||
                            Activity.serviceName === "Tools") && (
                            <span style={{ color: "#8D37FF" }}>
                              “Name {Activity.name}
                            </span>
                          )}{" "}
                          {Activity.serviceName === "Ride" && (
                            <span style={{ color: "#8D37FF" }}>
                              Car Name {Activity.carDescription}
                            </span>
                          )}
                          {Activity.serviceName === "Patient" && (
                            <span style={{ color: "#8D37FF" }}>
                              First Name {Activity.firstName}
                            </span>
                          )}
                          {Activity.serviceName === "Housing" && (
                            <span style={{ color: "#8D37FF" }}>
                              His Address Is {Activity.address}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="add-container">
                {!AddServices ? (
                  <>
                    <AiOutlinePlus
                      onClick={handeleAddServices}
                      className="btn add-icon"
                    />
                    <div className="add-title">ADD SERVICE</div>
                  </>
                ) : (
                  <div className="stats-container-add-services">
                    <WithPermission
                      ScopeRole={["Student", "Dentistry Student", "Admin"]}
                    >
                      <div className="stats-add-services-add-services">
                        <div className="stats-icon-background-add-services">
                          <FaHome className="stats-icon" />
                        </div>
                        <div className="add-title-add-services">
                          ADD HOUSING
                        </div>
                        <div className="stats-info">
                          <AiOutlinePlus
                            onClick={() => setButtonCards("CreateHousing")}
                            className="btn-add-services btn-small add-icon-add-services"
                          />
                        </div>
                      </div>
                      <div className="stats-add-services-add-services">
                        <div className="stats-icon-background-add-services">
                          <FaBook className="stats-icon" />
                        </div>
                        <div className="add-title-add-services">ADD BOOK</div>
                        <div className="stats-info">
                          <AiOutlinePlus
                            onClick={() => setButtonCards("CreateBook")}
                            className="btn-add-services btn-small add-icon-add-services"
                          />
                        </div>
                      </div>
                      <div className="stats-add-services-add-services">
                        <div className="stats-icon-background-add-services">
                          <IoCarOutline className="stats-icon" />
                        </div>
                        <div className="add-title-add-services">ADD RIDING</div>
                        <div className="stats-info">
                          <AiOutlinePlus
                            onClick={() => setButtonCards("CreateRide")}
                            className="btn-add-services btn-small add-icon-add-services"
                          />
                        </div>
                      </div>
                      <div className="stats-add-services-add-services">
                        <div className="stats-icon-background-add-services">
                          <TbTools className="stats-icon" />
                        </div>
                        <div className="add-title-add-services">ADD TOOLS</div>
                        <div className="stats-info">
                          <AiOutlinePlus
                            onClick={() => setButtonCards("CreateTool")}
                            className="btn-add-services btn-small add-icon-add-services"
                          />
                        </div>
                      </div>
                    </WithPermission>
                    <div className="stats-add-services-add-services">
                      <div className="stats-icon-background-add-services">
                        <FaUserCircle className="stats-icon" />
                      </div>
                      <div className="add-title-add-services">ADD PATIENT</div>
                      <div className="stats-info">
                        <AiOutlinePlus
                          onClick={() => setButtonCards("CreatePatient")}
                          className="btn-add-services btn-small add-icon-add-services"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="service-container">
              <div className="services-head">
                <div className="services-head-title">Your Services</div>
                <div className="filterboxs">
                  {decodedJwt.roles !== "Patient" && (
                    <div className="input-group">
                      <div className="custom-select">
                        <div
                          className="selected-option"
                          onClick={() => setShowDropdownType(!showDropdownType)}
                        >
                          {!selectType ? (
                            <div className="input-container-option input-dropdown">
                              Select Type
                            </div>
                          ) : (
                            <div>
                              <div className="input-container-option input-dropdown-title">
                                Type
                              </div>
                              <div className="input-container-option input-dropdown input-selected">
                                {selectType.name}
                              </div>
                            </div>
                          )}
                          <RiArrowDownSLine className="arrow-icon" />
                        </div>
                        {showDropdownType && (
                          <div className="options" id="input-dropdown">
                            <div className="option-title">Select Type</div>
                            {TYPES.map((type, index) => (
                              <div
                                key={index}
                                className="option"
                                onClick={() =>
                                  handleTypeChange({
                                    name: type,
                                    id: index + 1,
                                  })
                                }
                              >
                                {type}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* <div className="input-group">
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
            </div> */}
                </div>
              </div>
              <div className="cards">
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

                {!filteredValue
                  ? (selectType.name === "All" ||
                      selectType.name === "Book" ||
                      !selectType) &&
                    Object.values(MyBooks).map((book) => (
                      <BookCard
                        name={book.name}
                        price={book.price}
                        shortDescription={book.shortDescription}
                        longDescription={book.longDescription}
                        key={book.id}
                        id={book.id}
                        studentId={book.studentId}
                      />
                    ))
                  : (selectType.name === "All" ||
                      selectType.name === "Book" ||
                      !selectType) &&
                    Object.values(filteredValue).map((book) => (
                      <BookCard
                        name={book.name}
                        price={book.price}
                        shortDescription={book.shortDescription}
                        longDescription={book.longDescription}
                        key={book.id}
                        id={book.id}
                        studentId={book.studentId}
                      />
                    ))}

                {!filteredValue
                  ? (selectType.name === "All" ||
                      selectType.name === "House" ||
                      !selectType) &&
                    Object.values(MyHousings).map((housing) => (
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
                  : (selectType.name === "All" ||
                      selectType.name === "House" ||
                      !selectType) &&
                    Object.values(filteredValue).map((housing) => (
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
                  ? (selectType.name === "All" ||
                      selectType.name === "Ride" ||
                      !selectType) &&
                    Object.values(MyRides).map((ride) => (
                      <RideCard
                        createdOn={formatDate(ride.createdOn)}
                        key={ride.id}
                        id={ride.id}
                        ride={ride}
                        studentId={ride.studentId}
                        carDescription={ride.carDescription}
                        shortDescription={ride.shortDescription}
                        longDescription={ride.longDescription}
                        emptySeats={ride.emptySeats}
                        locationId={ride.locationId}
                        gender={ride.gender}
                      />
                    ))
                  : (selectType.name === "All" ||
                      selectType.name === "Ride" ||
                      !selectType) &&
                    Object.values(filteredValue).map((ride) => (
                      <RideCard
                        createdOn={formatDate(ride.createdOn)}
                        key={ride.id}
                        id={ride.id}
                        ride={ride}
                        studentId={ride.studentId}
                        carDescription={ride.carDescription}
                        shortDescription={ride.shortDescription}
                        longDescription={ride.longDescription}
                        emptySeats={ride.emptySeats}
                        locationId={ride.locationId}
                        gender={ride.gender}
                      />
                    ))}

                {!filteredValue
                  ? (selectType.name === "All" ||
                      selectType.name === "Tools" ||
                      !selectType) &&
                    Object.values(MyTools).map((tool) => (
                      <ToolCard
                        createdOn={formatDate(tool.createdOn)}
                        id={tool.id}
                        studentId={tool.studentId}
                        theWay={tool.theWay}
                        condition={tool.condition}
                        price={tool.price}
                        longDescription={tool.longDescription}
                        shortDescription={tool.shortDescription}
                        name={tool.name}
                        key={tool.id}
                      />
                    ))
                  : (selectType.name === "All" ||
                      selectType.name === "Tools" ||
                      !selectType) &&
                    Object.values(filteredValue).map((tool) => (
                      <ToolCard
                        createdOn={formatDate(tool.createdOn)}
                        id={tool.id}
                        studentId={tool.studentId}
                        theWay={tool.theWay}
                        longDescription={tool.longDescription}
                        condition={tool.condition}
                        price={tool.price}
                        shortDescription={tool.shortDescription}
                        name={tool.name}
                        key={tool.id}
                      />
                    ))}

                {!filteredValue
                  ? (selectType.name === "All" ||
                      selectType.name === "Patient" ||
                      !selectType) &&
                    Object.values(MyPatients).map((patient) => (
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
                  : (selectType.name === "All" ||
                      selectType.name === "Patient" ||
                      !selectType) &&
                    Object.values(filteredValue).map((patient) => (
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

export default Overview;
