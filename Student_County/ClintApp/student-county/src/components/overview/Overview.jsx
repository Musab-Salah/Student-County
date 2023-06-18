import { useState, useEffect, useMemo } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { FaBook, FaHome, FaUserCircle } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
import BookCard from "../services/books/book_card/BookCard";
import { Helmet } from "react-helmet";
import "./Overview.css";
import useUserRelationData from "../../hooks/UserRelationData";
import HousingCard from "../services/Housing/housing_card/HousingCard";
import PatientCard from "../services/Patient/patient_card/PatientCard";
import RideCard from "../services/Ride/ride_card/RideCard";
import ToolCard from "../services/Tools/tool_card/ToolCard";
import { TbTools } from "react-icons/tb";
import WithPermission from "../../certificates/WithPermission";
import { IoCarOutline } from "react-icons/io5";
import useComponent from "../../hooks/useComponent";
import useBooks from "../../hooks/useBooks";
import useHousings from "../../hooks/useHousings";
import usePatient from "../../hooks/usePatient";
import useRides from "../../hooks/useRides";
import useTools from "../../hooks/useTools";

const Overview = ({ filteredValue }) => {
  const TYPES = ["All", "Book", "Ride", "House", "Patient", "Tools"];
  const SORT_TYPES = ["Name", "Date", "Price", "Age"];
  const {
    getMyAllUserRelationDatas,
    getAllRecentActivity,
    UserRelationDataLoader,
    setMyBooks,
    setMyTools,
    setMyHousings,
    setMyRides,
    setMyPatients,
    MyBooks,
    MyTools,
    MyHousings,
    MyPatients,
    MyRides,
  } = useUserRelationData(); //[0]books ,[1]housings,[2]rides,[3]tools,[4]patients
  const { BookSuccess } = useBooks();
  const { HousingSuccess } = useHousings();
  const { PatientSuccess } = usePatient();
  const { RideSuccess } = useRides();
  const { ToolsSuccess } = useTools();

  const { setButtonCards } = useComponent();
  const [selectType, setSelectType] = useState("");
  const [sortType, setSortType] = useState("");
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
  }, [BookSuccess, HousingSuccess, PatientSuccess, RideSuccess, ToolsSuccess]);
  const handeleAddServices = () => {
    setAddServices(!AddServices);
    console.log(AddServices);
  };
  function handleTypeChange(type) {
    setSelectType(type);
    setShowDropdownType(false);
  }

  function handleSortChange(sort) {
    setSortType(sort);
    setShowDropdownSort(false);
  }

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

  useEffect(() => {
    return function cleanup() {
      setMyBooks("");
      setMyTools("");
      setMyHousings("");
      setMyRides("");
      setMyPatients("");
    };
    // eslint-disable-next-line
  }, []);
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
        <title>Overview</title>
      </Helmet>
      <div className="info-container">
        <WithPermission ScopeRole={["Student", "Dentistry Student", "Admin"]}>
          <div className="stats-container">
            <div className="stats">
              <div className="stats-icon-background">
                <FaBook className="stats-icon" />
              </div>
              <div className="stats-info">
                <div className="stats-title">BOOKS</div>
                <div className="stats-number">{Bookslength}</div>
              </div>
            </div>
            <div className="stats">
              <div className="stats-icon-background">
                <IoCarOutline className="stats-icon" />
              </div>
              <div className="stats-info">
                <div className="stats-title">RIDING</div>
                <div className="stats-number">{Rideslength}</div>
              </div>
            </div>
            <div className="stats">
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
          <WithPermission ScopeRole={["Student", "Dentistry Student", "Admin"]}>
            <div className="stats">
              <div className="stats-icon-background">
                <TbTools className="dash-nav-link-icon" />
              </div>
              <div className="stats-info">
                <div className="stats-title">TOOLS</div>
                <div className="stats-number">{Toolslength}</div>
              </div>
            </div>
          </WithPermission>
          <div className="stats">
            <div className="stats-icon-background">
              <FaUserCircle className="dash-nav-link-icon" />
            </div>
            <div className="stats-info">
              <div className="stats-title">PATIENTS</div>
              <div className="stats-number">{Patientslength}</div>
            </div>
          </div>
        </div>
        {/* <div className="activities-container" style={{ display: "block" }}>
          <div className="activities-title">Recent Activities</div>
          <div className="card-activity">
            <div className="smallIcon-activity">
              <div className="icon-activity"></div>
              <div className="name-activity"></div>
              <div className="roles-activity"></div>
              <div className="descripion-activity"></div>
            </div>
          </div>
        </div> */}
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
                  <div className="add-title-add-services">ADD HOUSING</div>
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
                      onClick={() => setButtonCards("CreateHousing")}
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
                          handleTypeChange({ name: type, id: index + 1 })
                        }
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
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
                  emptySeats={ride.emptySeats}
                  locationId={ride.locationId}
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
                  emptySeats={ride.emptySeats}
                  locationId={ride.locationId}
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
    </>
  );
};

export default Overview;
