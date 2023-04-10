import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import "../../Global.css";
import { RiArrowDownSLine, RiCloseLine } from "react-icons/ri";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
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
      <NavLink to="/" className="logo">
        <img className="vector-icon" alt="" src="/logo.svg" />
      </NavLink>
      <div className="nav-items">
        <NavLink to="/" exact activeClassName="active" className="nav-link">
          Home
        </NavLink>
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
                <NavLink to="/services/book-store" className="dropdown-link">
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
                </NavLink>
                <NavLink to="/services/housing" className="dropdown-link">
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
                </NavLink>
                <NavLink to="/services/riding" className="dropdown-link">
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
                </NavLink>
              </div>
            </div>
          )}
        </button>
        <NavLink to="/blog" activeClassName="active" className="nav-link">
          Blog
        </NavLink>
        <NavLink to="/about-us" activeClassName="active" className="nav-link">
          About Us
        </NavLink>
        <NavLink to="/contact-us" activeClassName="active" className="nav-link">
          Contact Us
        </NavLink>
      </div>

      <button className="get-started">
        <NavLink to="/sign-up">Get Started</NavLink>
      </button>
      <button className="bar" onClick={toggleMenu}>
        <FaBars className="bar-icon" />
      </button>
      <div className={`menu-phone ${isOpen ? "phone" : ""}`}>
        <div className="menu-phone-body">
          <NavLink to="/" className="logo">
            <img className="vector-icon" alt="" src="/logo.svg" />
          </NavLink>
          <button className="close" id="close" onClick={toggleMenu}>
            <RiCloseLine className="close-icon" />
          </button>
        </div>
        <div className="menu-line"></div>
        <div className="nav-items phone">
          <NavLink to="/" className="nav-link phone" activeClassName="active">
            Home
          </NavLink>

          <button className="nav-link phone" onClick={toggleDropdown}>
            Services
            <RiArrowDownSLine
              className={`arrow-icon ${dropdownOpen ? "open" : ""}`}
            />
            {dropdownOpen && (
              <div className="dropdown-wrapper" ref={dropdownRef}>
                <div className="dropdown">
                  <NavLink to="/services/book-store" className="dropdown-link">
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
                  </NavLink>
                  <NavLink to="/services/housing" className="dropdown-link">
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
                  </NavLink>
                  <NavLink to="/services/riding" className="dropdown-link">
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
                  </NavLink>
                </div>
              </div>
            )}
          </button>

          <NavLink
            to="/blog"
            className="nav-link phone"
            activeClassName="active"
          >
            Blog
          </NavLink>
          <NavLink
            to="/about-us"
            className="nav-link phone"
            activeClassName="active"
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact-us"
            className="nav-link phone"
            activeClassName="active"
          >
            Contact Us
          </NavLink>
        </div>
        <button className="get-started phone">
          <NavLink to="/sign-up">Get Started</NavLink>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
