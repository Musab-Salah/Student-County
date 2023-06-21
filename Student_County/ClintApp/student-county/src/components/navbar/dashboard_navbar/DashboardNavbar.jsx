import { HiMenuAlt2 } from "react-icons/hi";
import useBooks from "../../../hooks/useBooks";
import useTools from "../../../hooks/useTools";
import useHousings from "../../../hooks/useHousings";
import usePatient from "../../../hooks/usePatient";
import useRides from "../../../hooks/useRides";
import useUserRelationData from "../../../hooks/useUserRelationData";
import useComponent from "../../../hooks/useComponent";
import useAuth from "../../../hooks/useAuth";
import { useDeferredValue, useEffect, useMemo } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { useLocation } from "react-router-dom";

const DashboardNavbar = () => {
  const location = useLocation();

  const { Books } = useBooks();
  const { Tools } = useTools();
  const { Housings } = useHousings();
  const { Patients } = usePatient();
  const { Rides } = useRides();
  const {
    MyBooks,
    MyTools,
    MyHousings,
    MyPatients,
    MyRides,
    MyUserRelationData,
  } = useUserRelationData();
  const {
    setButtonCards,
    isMenuOpen,
    setIsMenuOpen,
    query,
    setQuery,
    isSearchOpen,
    setIsSearchOpen,
    isMenuOpenPhone,
    setIsMenuOpenPhone,
    setFilteredValue,
  } = useComponent();
  const { decodedJwt } = useAuth();
  const deferredInput = useDeferredValue(query);

  const handleIconClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  const handleOutsideClick = (event) => {
    if (!event.target.closest(".input-wrapper")) {
      setIsSearchOpen(false);
    }
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMenuPhone = () => {
    setIsMenuOpenPhone(!isMenuOpenPhone);
  };

  const setto = useMemo(() => {
    // if (location.pathname === "Overview") {
    //   return Object.values(MyBooks).filter((Book) => {
    //     return (
    //       Book.name.toLowerCase().includes(deferredInput.toLowerCase()) ||
    //       Book.longDescription
    //         .toLowerCase()
    //         .includes(deferredInput.toLowerCase())
    //     );
    //   });
    // }
    // if (location.pathname === "Overview") {
    //   return Object.values(MyTools).filter((tool) => {
    //     return (
    //       tool.name.toLowerCase().includes(deferredInput.toLowerCase()) ||
    //       tool.longDescription
    //         .toLowerCase()
    //         .includes(deferredInput.toLowerCase())
    //     );
    //   });
    // }
    // if (location.pathname === "Overview") {
    //   return Object.values(MyHousings).filter((housing) => {
    //     return (
    //       housing.city.toLowerCase().includes(deferredInput.toLowerCase()) ||
    //       housing.province
    //         .toLowerCase()
    //         .includes(deferredInput.toLowerCase()) ||
    //       housing.address.toLowerCase().includes(deferredInput.toLowerCase())
    //     );
    //   });
    // }
    // if (location.pathname === "Overview") {
    //   return Object.values(MyRides).filter((ride) => {
    //     return (
    //       ride.longDescription
    //         .toLowerCase()
    //         .includes(deferredInput.toLowerCase()) ||
    //       ride.carDescription
    //         .toLowerCase()
    //         .includes(deferredInput.toLowerCase())
    //     );
    //   });
    // }
    // if (location.pathname === "Overview") {
    //   return Object.values(MyPatients).filter((patient) => {
    //     return (
    //       patient.userName
    //         .toLowerCase()
    //         .includes(deferredInput.toLowerCase()) ||
    //       patient.typeOfTreatment
    //         .toLowerCase()
    //         .includes(deferredInput.toLowerCase()) ||
    //       patient.currentIllnesses
    //         .toLowerCase()
    //         .includes(deferredInput.toLowerCase())
    //     );
    //   });
    // } else
    /////
    if (location.pathname === "/dashboard/book") {
      return Object.values(Books).filter((Book) => {
        return (
          Book.name.toLowerCase().includes(deferredInput.toLowerCase()) ||
          Book.longDescription
            .toLowerCase()
            .includes(deferredInput.toLowerCase())
        );
      });
    } else if (location.pathname === "/dashboard/patient") {
      return Object.values(Patients).filter((patient) => {
        return (
          patient.userName
            .toLowerCase()
            .includes(deferredInput.toLowerCase()) ||
          patient.typeOfTreatment
            .toLowerCase()
            .includes(deferredInput.toLowerCase()) ||
          patient.currentIllnesses
            .toLowerCase()
            .includes(deferredInput.toLowerCase())
        );
      });
    } else if (location.pathname === "/dashboard/housing") {
      return Object.values(Housings).filter((housing) => {
        return (
          housing.city.toLowerCase().includes(deferredInput.toLowerCase()) ||
          housing.province
            .toLowerCase()
            .includes(deferredInput.toLowerCase()) ||
          housing.address.toLowerCase().includes(deferredInput.toLowerCase())
        );
      });
    } else if (location.pathname === "/dashboard/tool") {
      return Object.values(Tools).filter((tool) => {
        return (
          tool.name.toLowerCase().includes(deferredInput.toLowerCase()) ||
          tool.longDescription
            .toLowerCase()
            .includes(deferredInput.toLowerCase())
        );
      });
    } else if (location.pathname === "/dashboard/ride") {
      return Object.values(Rides).filter((ride) => {
        return (
          ride.longDescription
            .toLowerCase()
            .includes(deferredInput.toLowerCase()) ||
          ride.carDescription
            .toLowerCase()
            .includes(deferredInput.toLowerCase())
        );
      });
    }
    // eslint-disable-next-line
  }, [
    MyBooks,
    Books,
    MyPatients,
    Patients,
    deferredInput,
    MyUserRelationData,
    Housings,
    MyHousings,
    Tools,
    MyTools,
    Rides,
    MyRides,
  ]);
  useEffect(() => {
    setFilteredValue(setto);
  }, [setto]);

  return (
    <>
      <div className="dashboard-navbar">
        <div className="left-navbar">
          <button className="collapse" onClick={toggleMenu}>
            <HiMenuAlt2 className="menu-collapse-icon" />
          </button>
          <button className="phone-collapse" onClick={toggleMenuPhone}>
            <HiMenuAlt2 className="menu-collapse-icon" />
          </button>
          <div className="welcome-container">
            <div className="horizontal-line" />
            <div className="welcome-info">
              <div className="welcome-text">Welcome, {decodedJwt.name} 👋</div>
              <div className="welcome-description">
                Manage your services on the Student County dashboard.
              </div>
            </div>
          </div>
        </div>
        <div className="right-navbar">
          <div className="tools">
            <div className="input-wrapper" onClick={handleOutsideClick}>
              {location.pathname !== "/dashboard/overview" &&
                location.pathname !== "/dashboard/chat" &&
                location.pathname !== "/dashboard/setting" && (
                  <>
                    {" "}
                    <div
                      className={`search-box ${
                        isSearchOpen ? "searchOpen" : ""
                      }`}
                    >
                      <input
                        placeholder="Search..."
                        className="input-search"
                        name="text"
                        type="text"
                        value={query}
                        maxLength={20}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </div>
                    <FiSearch
                      className="btn icon btn-icon btn-icon-active"
                      onClick={handleIconClick}
                    />
                  </>
                )}
            </div>

            {location.pathname === "/dashboard/book" && (
              <AiOutlinePlus
                className="btn btn-icon "
                onClick={() => setButtonCards("CreateBook")}
              />
            )}
            {location.pathname === "/dashboard/patient" && (
              <AiOutlinePlus
                className="btn btn-icon "
                onClick={() => setButtonCards("CreatePatient")}
              />
            )}
            {location.pathname === "/dashboard/housing" && (
              <AiOutlinePlus
                className="btn btn-icon "
                onClick={() => setButtonCards("CreateHousing")}
              />
            )}
            {location.pathname === "/dashboard/tool" && (
              <AiOutlinePlus
                className="btn btn-icon "
                onClick={() => setButtonCards("CreateTool")}
              />
            )}
            {location.pathname === "/dashboard/ride" && (
              <AiOutlinePlus
                className="btn btn-icon "
                onClick={() => setButtonCards("CreateRide")}
              />
            )}
            {/* <RiNotification2Line className="btn btn-icon" /> */}
          </div>
          {/* <div className="horizontal-line" />
                <div className="profile">
                  <div className="profile-info" onClick={handleToggleDropdown}>
                    <FaUserCircle className="avatar-icon" />
                    <div className="user-info">
                      <div className="username">Musab Al hotaree</div>
                      <div className="role">Student</div>
                    </div>
                    <RiArrowDownSLine className="arrow-down" />
                  </div>
                  {showProfileDropdown && (
                    <div className="dropdown-menu">
                      <ul>
                        <li>Profile</li>
                        <li>Settings</li>
                        <li>Logout</li>
                      </ul>
                    </div>
                  )}
                </div> */}
        </div>
      </div>
    </>
  );
};

export default DashboardNavbar;
