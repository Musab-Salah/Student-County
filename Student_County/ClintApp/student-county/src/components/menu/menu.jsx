import { useEffect, useState } from "react";
import "./menu.css";
import { RiCloseLine, RiArrowDownSLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { IoCarOutline } from "react-icons/io5";
import { BiLogOut, BiBook } from "react-icons/bi";
import { TbMessageCircle, TbTools } from "react-icons/tb";
import { RxDashboard, RxGear } from "react-icons/rx";
import useComponent from "../../hooks/useComponent";
import useAuth from "./../../hooks/useAuth";
import useLoader from "../../hooks/useLoader";
import WithPermission from "../../certificates/WithPermission";
import { Link, NavLink, useLocation } from "react-router-dom";

const Menu = () => {
  const [navLinksVisible, setNavLinksVisible] = useState([true, true]);
  const {
    isMenuOpen,
    isMenuOpenPhone,
    setIsMenuOpenPhone,
  } = useComponent();
  const { logout, decodedJwt } = useAuth();
  const { AuthLoader } = useLoader();

  const handleTitleClick = (index) => (event) => {
    setNavLinksVisible((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = !updatedState[index];
      return updatedState;
    });
  };

  const toggleMenu = () => {
    setIsMenuOpenPhone(!isMenuOpenPhone);
  };
  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add("animate");
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);
  const location = useLocation();

  return (
    <div
      className={`dash-menu ${
        (!isMenuOpenPhone ? false : true) ? "openn" : ""
      }   `}
      data-animate-on-scroll
    >
      <div className="dash-menu-link">
        <div className={`dash-logo ${isMenuOpen ? "hidden" : ""}`}>
          <img className="logo" alt="" src="../logo.svg" />
          <button
            className="close dash-menu-close"
            id="close"
            onClick={toggleMenu}
          >
            <RiCloseLine className="close-icon" />
          </button>
        </div>
        <div className="dash-menu-items">
          <div className="dash-menu-items">
            <div
              className={`dash-items-title ${isMenuOpen ? "hidden" : ""}`}
              onClick={handleTitleClick(0)}
            >
              <div className="dash-link-group">Main</div>
              <RiArrowDownSLine
                className={`arrow-down arrow-small ${
                  navLinksVisible[0] ? "" : "rotate-90"
                }`}
              />
            </div>
            {navLinksVisible[0] && (
              <div className="dash-nav-links">
                <Link to="/dashboard/overview">
                  <div
                    className={`dash-nav-link ${
                      isMenuOpen ? "padding-resize" : ""
                    } ${location.pathname === "/dashboard/overview" ? "active" : ""} `}
                  >
                    <RxDashboard className="dash-nav-link-icon" />

                    <div
                      className={`dash-nav-link-title ${
                        isMenuOpen ? "hidden" : ""
                      }`}
                    >
                      Overview
                    </div>
                  </div>
                </Link>
                <Link to="/dashboard/chat">
                  <div
                    className={`dash-nav-link ${
                      isMenuOpen ? "padding-resize" : ""
                    } ${location.pathname === "/dashboard/chat" ? "active" : ""} `}
                  >
                    <TbMessageCircle className="dash-nav-link-icon" />
                    <div
                      className={`dash-nav-link-title ${
                        isMenuOpen ? "hidden" : ""
                      }`}
                    >
                      Messages
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <div className="dash-menu-items">
            <div
              className={`dash-items-title ${isMenuOpen ? "hidden" : ""}`}
              onClick={handleTitleClick(1)}
            >
              <div className="dash-link-group">Services</div>
              <RiArrowDownSLine
                className={`arrow-down arrow-small ${
                  navLinksVisible[1] ? "" : "rotate-90"
                }`}
              />
            </div>
            {navLinksVisible[1] && (
              <div className="dash-nav-links">
                <WithPermission
                  ScopeRole={["Student", "Dentistry Student", "Admin"]}
                >
                  <Link to="/dashboard/book">
                    <div
                      className={`dash-nav-link ${
                        isMenuOpen ? "padding-resize" : ""
                      } ${location.pathname === "/dashboard/book" ? "active" : ""} `}
                    >
                      <BiBook className="dash-nav-link-icon" />
                      <div
                        className={`dash-nav-link-title ${
                          isMenuOpen ? "hidden" : ""
                        }`}
                      >
                        Books
                      </div>
                    </div>
                  </Link>
                </WithPermission>

                <WithPermission
                  ScopeRole={["Student", "Dentistry Student", "Admin"]}
                >
                  <Link to="/dashboard/housing">
                    <div
                      className={`dash-nav-link ${
                        isMenuOpen ? "padding-resize" : ""
                      } ${location.pathname === "/dashboard/housing" ? "active" : ""} `}
                    >
                      <AiOutlineHome className="dash-nav-link-icon" />
                      <div
                        className={`dash-nav-link-title ${
                          isMenuOpen ? "hidden" : ""
                        }`}
                      >
                        Housing
                      </div>
                    </div>
                  </Link>
                </WithPermission>
                <WithPermission
                  ScopeRole={["Student", "Dentistry Student", "Admin"]}
                >
                  <Link to="/dashboard/ride">
                    {" "}
                    <div
                      className={`dash-nav-link ${
                        isMenuOpen ? "padding-resize" : ""
                      } ${location.pathname === "/dashboard/ride" ? "active" : ""} `}
                    >
                      <IoCarOutline className="dash-nav-link-icon" />
                      <div
                        className={`dash-nav-link-title ${
                          isMenuOpen ? "hidden" : ""
                        }`}
                      >
                        Rides
                      </div>
                    </div>
                  </Link>
                </WithPermission>

                <WithPermission
                  ScopeRole={["Student", "Dentistry Student", "Admin"]}
                >
                  <Link to="/dashboard/tool">
                    {" "}
                    <div
                      className={`dash-nav-link ${
                        isMenuOpen ? "padding-resize" : ""
                      } ${location.pathname === "/dashboard/tool" ? "active" : ""} `}
                    >
                      <TbTools className="dash-nav-link-icon" />
                      <div
                        className={`dash-nav-link-title ${
                          isMenuOpen ? "hidden" : ""
                        }`}
                      >
                        Tools
                      </div>
                    </div>
                  </Link>
                </WithPermission>
                <WithPermission ScopeRole={["Dentistry Student", "Admin"]}>
                  <Link to="/dashboard/patient">
                    <div
                      className={`dash-nav-link ${
                        isMenuOpen ? "padding-resize" : ""
                      } ${location.pathname === "/dashboard/patient" ? "active" : ""} `}
                    >
                      <AiOutlineUser className="dash-nav-link-icon" />
                      <div
                        className={`dash-nav-link-title ${
                          isMenuOpen ? "hidden" : ""
                        }`}
                      >
                        Patients
                      </div>
                    </div>
                  </Link>
                </WithPermission>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="dash-menu-items-buttom">
        <div className="dash-menu-items">
          <Link to="/dashboard/setting">
            <div
              className={`dash-nav-link ${isMenuOpen ? "padding-resize" : ""} ${
                location.pathname === "/dashboard/setting" ? "active" : ""
              } `}
            >
              <RxGear className="dash-nav-link-icon" />
              <div className="dash-title-description">
                <div
                  className={`dash-nav-link-title ${
                    isMenuOpen ? "hidden" : ""
                  }`}
                >
                  Setting
                </div>
              </div>
            </div>
          </Link>
          {/* <div
            className={`dash-nav-link ${isMenuOpen ? "padding-resize" : ""} ${
              OptionMenu === "Support" ? "selected" : ""
            } `}
            onClick={() => setOptionMenu("Support")}
          >
            <HiOutlineSupport className="dash-nav-link-icon" />
            <div className="dash-title-description">
              <div
                className={`dash-nav-link-title ${isMenuOpen ? "hidden" : ""}`}
              >
                Support
              </div>
            </div>
          </div> */}
        </div>
        <div className="vertical-line" />
        <div className="user-container">
          <div className="profile">
            <div className="profile-info">
              <FaUserCircle
                className={`avatar-icon ${isMenuOpen ? "small-icon" : ""}`}
              />
              <div className={`user-info ${isMenuOpen ? "hidden" : ""}`}>
                <div className="username">
                  {`${decodedJwt.name} ${decodedJwt.family_name}`}
                </div>
                <div className="role">{decodedJwt.roles}</div>
              </div>
            </div>
          </div>
          <button
            onClick={() => logout()}
            className={`btn btn-primary dash-btn ${
              isMenuOpen ? "padding-resize" : ""
            }`}
          >
            <div
              className="loader"
              style={{
                display: AuthLoader ? "block" : "none",
              }}
            />
            <BiLogOut className="dash-nav-link-icon" />
            <div className={`dash-sign-out ${isMenuOpen ? "hidden" : ""}`}>
              Sign Out
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
