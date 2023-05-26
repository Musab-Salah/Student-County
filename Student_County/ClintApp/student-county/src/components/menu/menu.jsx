import { useEffect, useState } from "react";
import "./menu.css";
import { RiCloseLine, RiArrowDownSLine } from "react-icons/ri";

import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { IoCarOutline } from "react-icons/io5";
import { BiLogOut, BiBook } from "react-icons/bi";
import { HiOutlineSupport } from "react-icons/hi";
import { TbMessageCircle, TbTools } from "react-icons/tb";
import { RxDashboard, RxGear } from "react-icons/rx";
import useComponent from "../../hooks/useComponent";
import useAuth from "./../../hooks/useAuth";
import useLoader from "../../hooks/useLoader";
import WithPermission from "../../certificates/WithPermission";

const Menu = ({ isMenuOpen, isMenuOpenPhone }) => {
  const [navLinksVisible, setNavLinksVisible] = useState([true, true]);
  const { setOptionMenu, OptionMenu } = useComponent();
  const { logout } = useAuth();
  const { AuthLoader } = useLoader();

  const handleTitleClick = (index) => (event) => {
    setNavLinksVisible((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = !updatedState[index];
      return updatedState;
    });
  };
  const [isClose, setIsClose] = useState(false);

  const toggleMenu = () => {
    setIsClose(!isClose);
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

  return (
    <div
      className={`dash-menu ${
        (isMenuOpenPhone ? false : true) || (isClose ? false : true)
          ? "openn"
          : ""
      }`}
      data-animate-on-scroll
    >
      <div className="dash-menu-link">
        <div className={`dash-logo ${isMenuOpen ? "hidden" : ""}`}>
          <img className="logo" alt="" src="./logo.svg" />
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
                <div
                  className={`dash-nav-link ${
                    isMenuOpen ? "padding-resize" : ""
                  } ${OptionMenu === "Overview" ? "active" : ""} `}
                  onClick={() => setOptionMenu("Overview")}
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
                <div
                  className={`dash-nav-link ${
                    isMenuOpen ? "padding-resize" : ""
                  } ${OptionMenu === "Chat" ? "active" : ""} `}
                  onClick={() => setOptionMenu("Chat")}
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
                  <div
                    className={`dash-nav-link ${
                      isMenuOpen ? "padding-resize" : ""
                    } ${OptionMenu === "Books" ? "active" : ""} `}
                    onClick={() => setOptionMenu("Books")}
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
                </WithPermission>

                <WithPermission
                  ScopeRole={["Student", "Dentistry Student", "Admin"]}
                >
                  <div
                    className={`dash-nav-link ${
                      isMenuOpen ? "padding-resize" : ""
                    } ${OptionMenu === "Housing" ? "selected" : ""} `}
                    onClick={() => setOptionMenu("Housing")}
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
                </WithPermission>
                <WithPermission
                  ScopeRole={["Student", "Dentistry Student", "Admin"]}
                >
                  {" "}
                  <div
                    className={`dash-nav-link ${
                      isMenuOpen ? "padding-resize" : ""
                    } ${OptionMenu === "Rides" ? "selected" : ""} `}
                    onClick={() => setOptionMenu("Rides")}
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
                </WithPermission>

                <WithPermission
                  ScopeRole={["Student", "Dentistry Student", "Admin"]}
                >
                  {" "}
                  <div
                    className={`dash-nav-link ${
                      isMenuOpen ? "padding-resize" : ""
                    } ${OptionMenu === "Tools" ? "selected" : ""} `}
                    onClick={() => setOptionMenu("Tools")}
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
                </WithPermission>
                <div
                  className={`dash-nav-link ${
                    isMenuOpen ? "padding-resize" : ""
                  } ${OptionMenu === "Patients" ? "selected" : ""} `}
                  onClick={() => setOptionMenu("Patients")}
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
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="dash-menu-items-buttom">
        <div className="dash-menu-items">
          <div
            className={`dash-nav-link ${isMenuOpen ? "padding-resize" : ""} ${
              OptionMenu === "Setting" ? "selected" : ""
            } `}
            onClick={() => setOptionMenu("Setting")}
          >
            <RxGear className="dash-nav-link-icon" />
            <div className="dash-title-description">
              <div
                className={`dash-nav-link-title ${isMenuOpen ? "hidden" : ""}`}
              >
                Setting
              </div>
            </div>
          </div>
          <div
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
          </div>
        </div>
        <div className="vertical-line" />
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
  );
};

export default Menu;
