import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./Navbar.css";
import "../../assets/Global.css";
import { RiArrowDownSLine, RiCloseLine } from "react-icons/ri";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const currentPage = location.pathname.split("/")[1];

  /* Dropdown Toggle Menu */
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  /* Phone Toggle Menu */
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar">
      <a className="logo">
        <img className="vector-icon" alt="" src="/logo.svg" />
      </a>
      <div className="nav-items">
        <a className={`nav-link ${currentPage === "" ? "active" : ""}`}>Home</a>
        <button
          className={`nav-link ${dropdownOpen ? "active" : ""}`}
          onClick={toggleDropdown}
        >
          Services
          <RiArrowDownSLine
            className={`arrow-icon ${dropdownOpen ? "open" : ""}`}
          />
          {dropdownOpen && (
            <div className="dropdown-wrapper" ref={dropdownRef}>
              <div className="dropdown">
                <a className="dropdown-link" href="/services/book-store">
                  <img
                    className="dropdown-item-icon"
                    alt=""
                    src="/icons/book.svg"
                  />
                  <div className="dropdown-item">
                    <div className="dropdown-item-title">Book Store</div>
                    <div className="dropdown-item-description">
                      Sell, exchange, negotiate books.
                    </div>
                  </div>
                </a>
                <a className="dropdown-link" href="/services/housing">
                  <img
                    className="dropdown-item-icon"
                    alt=""
                    src="/icons/house.svg"
                  />
                  <div className="dropdown-item">
                    <div className="dropdown-item-title">Housing</div>
                    <div className="dropdown-item-description">
                      Find your roommate!
                    </div>
                  </div>
                </a>
                <a className="dropdown-link" href="/services/riding">
                  <img
                    className="dropdown-item-icon"
                    alt=""
                    src="/icons/friend.svg"
                  />
                  <div className="dropdown-item">
                    <div className="dropdown-item-title">Riding</div>
                    <div className="dropdown-item-description">
                      Find your companion!
                    </div>
                  </div>
                </a>
              </div>
            </div>
          )}
        </button>

        <a
          className={`nav-link ${currentPage === "blog" ? "active" : ""}`}
          href="/blog"
        >
          Blog
        </a>

        <a
          className={`nav-link ${currentPage === "about-us" ? "active" : ""}`}
          href="/about-us"
        >
          About Us
        </a>

        <a
          className={`nav-link ${currentPage === "contact-us" ? "active" : ""}`}
          href="/contact-us"
        >
          Contact Us
        </a>
      </div>
      <button className="get-started">
        <a href="/sign-up">Get Started</a>
      </button>
      <button className="bar" onClick={toggleMenu}>
        <FaBars className="bar-icon" />
      </button>
      <div className={`menu-phone ${isOpen ? "phone" : ""}`}>
        <div className="menu-phone-body">
          <a className="logo">
            <img className="vector-icon" alt="" src="/logo.svg" />
          </a>
          <button className="close" id="close" onClick={toggleMenu}>
            <RiCloseLine className="close-icon" />
          </button>
        </div>
        <div className="menu-line"></div>
        <div className="nav-items phone">
          <a className={`nav-link phone ${currentPage === "" ? "active" : ""}`}>
            Home
          </a>
          <button className="nav-link phone" onClick={toggleDropdown}>
            Services
            <RiArrowDownSLine
              className={`arrow-icon ${dropdownOpen ? "open" : ""}`}
            />
            {dropdownOpen && (
              <div className="dropdown-wrapper" ref={dropdownRef}>
                <div className="dropdown">
                  <a className="dropdown-link" href="/services/book-store">
                    <img
                      className="dropdown-item-icon"
                      alt=""
                      src="/icons/book.svg"
                    />
                    <div className="dropdown-item">
                      <div className="dropdown-item-title">Book Store</div>
                      <div className="dropdown-item-description">
                        Sell, exchange, negotiate books.
                      </div>
                    </div>
                  </a>
                  <a className="dropdown-link" href="/services/housing">
                    <img
                      className="dropdown-item-icon"
                      alt=""
                      src="/icons/house.svg"
                    />
                    <div className="dropdown-item">
                      <div className="dropdown-item-title">Housing</div>
                      <div className="dropdown-item-description">
                        Find your roommate!
                      </div>
                    </div>
                  </a>
                  <a className="dropdown-link" href="/services/riding">
                    <img
                      className="dropdown-item-icon"
                      alt=""
                      src="/icons/friend.svg"
                    />
                    <div className="dropdown-item">
                      <div className="dropdown-item-title">Riding</div>
                      <div className="dropdown-item-description">
                        Find your companion!
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            )}
          </button>

          <a
            className={`nav-link phone ${
              currentPage === "blog" ? "active" : ""
            }`}
            href="/blog"
          >
            Blog
          </a>
          <a
            className={`nav-link phone ${
              currentPage === "about-us" ? "active" : ""
            }`}
            href="/about-us"
          >
            About Us
          </a>
          <a
            className={`nav-link phone ${
              currentPage === "contact-us" ? "active" : ""
            }`}
            href="/contact-us"
          >
            Contact Us
          </a>
        </div>
        <button className="get-started phone">
          <a href="/sign-up">Get Started</a>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
