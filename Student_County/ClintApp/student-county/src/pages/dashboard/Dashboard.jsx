import { useState, useEffect, useMemo } from "react";
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

const Dashboard = () => {
  const { Books } = useBooks();
  const { OptionMenu, setButtonCards, ButtonCards } = useComponent();
  const { decodedJwt } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

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
    return Books.filter((Book) => {
      return (
        Book.name.toLowerCase().includes(query.toLowerCase()) ||
        Book.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
        Book.longDescription.toLowerCase().includes(query.toLowerCase())
      );
    });
  }, [Books, query]);

  return (
    <>
      {(ButtonCards === "Create" || ButtonCards === "Update") &&
        OptionMenu === "Books" && <BooksForm />}
      {ButtonCards === "View" && OptionMenu === "Books" && <BooksView />}
      <div className={`${ButtonCards ? "opacity" : ""}`}>
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
                  {OptionMenu === "Overview" && (
                    <div className="input-wrapper">
                      <input
                        placeholder="search.."
                        className="input-search"
                        name="text"
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                      <FiSearch className="btn icon btn-icon  btn-icon-active" />
                    </div>
                  )}
                  {OptionMenu === "Books" && (
                    <div className="input-wrapper">
                      <input
                        placeholder="search.."
                        className="input-search"
                        name="text"
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                      <FiSearch className="btn icon btn-icon  btn-icon-active" />
                    </div>
                  )}

                  {OptionMenu === "Books" && (
                    <AiOutlinePlus
                      className="btn btn-icon "
                      onClick={() => setButtonCards("Create")}
                    />
                  )}

                  <RiNotification2Line className="btn btn-icon" />
                </div>
                <div className="horizontal-line" />
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
                </div>
              </div>
            </div>

            {OptionMenu === "Overview" && (
              <Overview
                filteredValue={filteredValue === "" ? false : filteredValue}
              />
            )}
            {OptionMenu === "Books" && (
              <BooksSection
                filteredValue={filteredValue === "" ? false : filteredValue}
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
