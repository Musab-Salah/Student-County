import { useState, useEffect, useMemo, useDeferredValue } from "react";
import Menu from "../../components/menu/menu";
import Overview from "../../components/overview/Overview";
import BooksSection from "../../components/services/books/books_section/BooksSection";
import useBooks from "../../hooks/useBooks";
// import PortalDrawer from "../../components/portal-drawer";
import { HiMenuAlt2 } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import { RiNotification2Line, RiArrowDownSLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import useComponent from "../../hooks/useComponent";
import useAuth from "../../hooks/useAuth";
import BooksView from "../../components/services/books/books_view/BooksView";
import BooksForm from "../../components/services/books/books_form/BooksForm";
import "./Dashboard.css";
import ChatController from "../../components/chat/ChatController";
import useUserRelationData from "../../hooks/UserRelationData";
import PatientForm from "../../components/services/Patient/patient_form/PatientForm";
import PatientSection from "../../components/services/Patient/patient_section/PatientSection";
import usePatient from "../../hooks/usePatient";
import PatientView from "../../components/services/Patient/patient_view/PatientView";
import HousingSection from "../../components/services/Housing/housing_section/HousingSection";
import HousingForm from "../../components/services/Housing/housing_form/HousingForm";

const Dashboard = () => {
  const { Books, MyBooks } = useBooks();
  const { MyUserRelationData } = useUserRelationData();
  const { OptionMenu, setOptionMenu, setButtonCards, ButtonCards, ownerItem } =
    useComponent();
  const { Patients, MyPatients } = usePatient();
  const { decodedJwt } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  //const [filteredValue, setFilteredValue] = useState("");
  const deferredInput = useDeferredValue(query);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
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

  const [isMenuOpenPhone, setIsMenuOpenPhone] = useState(false);

  const toggleMenuPhone = () => {
    setIsMenuOpenPhone(!isMenuOpenPhone);
    setIsMenuOpen(false);
  };

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  function handleToggleDropdown() {
    setShowProfileDropdown(!showProfileDropdown);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      const profileDropdownMenu = document.querySelector(".dropdown-menu");
      if (profileDropdownMenu && !profileDropdownMenu.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const filteredValue = useMemo(() => {
    if (OptionMenu === "Overview" && MyUserRelationData[0]) {
      return Object.values(MyUserRelationData[0]).filter((Book) => {
        return (
          Book.name.toLowerCase().includes(deferredInput.toLowerCase()) ||
          Book.shortDescription
            .toLowerCase()
            .includes(deferredInput.toLowerCase()) ||
          Book.longDescription
            .toLowerCase()
            .includes(deferredInput.toLowerCase())
        );
      });
    }
    if (OptionMenu === "Books") {
      return Object.values(Books).filter((Book) => {
        return (
          Book.name.toLowerCase().includes(deferredInput.toLowerCase()) ||
          Book.shortDescription
            .toLowerCase()
            .includes(deferredInput.toLowerCase()) ||
          Book.longDescription
            .toLowerCase()
            .includes(deferredInput.toLowerCase())
        );
      });
    }
    if (OptionMenu === "Patient") {
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
    }
    // eslint-disable-next-line
  }, [MyBooks, Books, MyPatients, Patients, deferredInput, MyUserRelationData]);

  useEffect(() => {
    return function cleanup() {
      setOptionMenu("Overview");
      setButtonCards("");
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {(ButtonCards === "CreatePatient" || ButtonCards === "UpdatePatient") && (
        <PatientForm />
      )}
      {(ButtonCards === "CreateBook" || ButtonCards === "UpdateBook") && (
        <BooksForm />
      )}
      {(ButtonCards === "CreateHousing" || ButtonCards === "UpdateHousing") && (
        <HousingForm />
      )}
      {ButtonCards === "ViewBook" && <BooksView />}
      {ButtonCards === "ViewPatient" && <PatientView />}

      <div style={{ opacity: ButtonCards ? 0.2 : 1 }}>
        <div className={`dashboard-container `}>
          <Menu isMenuOpen={isMenuOpen} isMenuOpenPhone={isMenuOpenPhone} />
          <div className={`dashboard  `}>
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
                    <div className="welcome-text">
                      Welcome, {decodedJwt.name} 👋
                    </div>
                    <div className="welcome-description">
                      Manage your services on the Student County dashboard.
                    </div>
                  </div>
                </div>
              </div>
              <div className="right-navbar">
                <div className="tools">
                  <div className="input-wrapper" onClick={handleOutsideClick}>
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
                  </div>

                  {OptionMenu === "Books" && (
                    <AiOutlinePlus
                      className="btn btn-icon "
                      onClick={() => setButtonCards("CreateBook")}
                    />
                  )}
                  {OptionMenu === "Patient" && (
                    <AiOutlinePlus
                      className="btn btn-icon "
                      onClick={() => setButtonCards("CreatePatient")}
                    />
                  )}
                  {OptionMenu === "Housing" && (
                    <AiOutlinePlus
                      className="btn btn-icon "
                      onClick={() => setButtonCards("CreateHousing")}
                    />
                  )}
                  <RiNotification2Line className="btn btn-icon" />
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

            {OptionMenu === "Overview" && (
              <Overview filteredValue={filteredValue ? filteredValue : false} />
            )}
            {OptionMenu === "Chat" && <ChatController />}
            {OptionMenu === "Books" && (
              <BooksSection
                filteredValue={filteredValue ? filteredValue : false}
              />
            )}
            {OptionMenu === "Patient" && (
              <PatientSection
                filteredValue={filteredValue ? filteredValue : false}
              />
            )}
            {OptionMenu === "Housing" && (
              <HousingSection
                filteredValue={filteredValue ? filteredValue : false}
              />
            )}
          </div>
          {/* {isDrawerOpen && (
          <PortalDrawer placement="Left" onOutsideClick={closeDrawer}>
          <Menu onClose={closeDrawer} />
          </PortalDrawer>
        )} */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
