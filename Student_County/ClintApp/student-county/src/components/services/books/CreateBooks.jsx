import { useState, useEffect, useMemo } from "react";
import useComponent from "../../../hooks/useComponent";
import { RiArrowDownSLine } from "react-icons/ri";
import { AiFillExclamationCircle } from "react-icons/ai";
import useBooks from "../../../hooks/useBooks";
import "./CreateBooks.css";

const CreateBooks = () => {
  const { setCreate } = useComponent();
  const { Success, BookBo, createBook, BookError, setSuccess } = useBooks();
  // State Hook
  const [name] = useState();
  const [shortDescription] = useState();
  const [longDescription] = useState();
  const [price] = useState();
  const [theWay, setTheWay] = useState("");
  const [book, setBook] = useState(BookBo);

  // Error Hook
  const [theWayError, setTheWayError] = useState("");
  const [nameError, setNameError] = useState();
  const [shortDescriptionError, setShortDescriptionError] = useState();
  const [longDescriptionError, setLongDescriptionError] = useState();
  const [priceError, setPriceError] = useState();

  const [showDropdownTheWay, setShowDropdownTheWay] = useState(false);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !event.target.closest(".custom-select") &&
        !event.target.closest(".input-container-option")
      ) {
        setShowDropdownTheWay(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showDropdownTheWay]);

  useMemo(() => {
    if (Success) {
      sleep(3000).then(() => {
        setSuccess();
        setCreate("");
      });
    }
    // eslint-disable-next-line
  }, [Success]);

  const handleTheWayChange = (value) => {
    setBook({
      ...book,
      theWay: value,
    });
    setTheWay(value);
    setTheWayError(false);
    setShowDropdownTheWay(false);
  };

  const handleSetName = (e) => {
    const nameRegex = /^([a-zA-Z])(?=.{3,})/;
    if (!nameRegex.test(e.target.value)) {
      setNameError(
        "Please enter a valid name, for example: Software Engineering"
      );
    } else {
      setBook({
        ...book,
        name: e.target.value,
      });
      setNameError(false);
    }
  };
  const handleShortDescription = (e) => {
    const nameRegex = /^(?=.{10,})/;
    if (!nameRegex.test(e.target.value)) {
      setShortDescriptionError(
        "Please lengthen this text to 10 characters or more"
      );
    } else {
      setBook({
        ...book,
        shortDescription: e.target.value,
      });
      setShortDescriptionError(false);
    }
  };
  const handleLongDescription = (e) => {
    const nameRegex = /^(?=.{10,})/;
    if (!nameRegex.test(e.target.value)) {
      setLongDescriptionError(
        "Please lengthen this text to 10 characters or more"
      );
    } else {
      setBook({
        ...book,
        longDescription: e.target.value,
      });
      setLongDescriptionError(false);
    }
  };
  const handleSetPrice = (e) => {
    const nameRegex = /^(?=.{1,})/;
    if (!nameRegex.test(e.target.value)) {
      setPriceError("Please lengthen this number to 1 or more");
    } else {
      setBook({
        ...book,
        price: e.target.value,
      });
      setPriceError(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createBook(book);
  };
  return (
    <>
      <div className="Create-section">
        <form className="form-create" onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              maxLength={40}
              type="text"
              name="name"
              value={name}
              onChange={handleSetName}
              required
            />
            <div
              className="input-container-option"
              onClick={() => document.getElementsByName("name")[0].focus()}
            >
              Name
            </div>
          </div>
          {nameError && (
            <span className="wrong-info">
              <AiFillExclamationCircle />
              {nameError}
            </span>
          )}
          <div className="input-container">
            <input
              type="text"
              name="shortdescription"
              value={shortDescription}
              onChange={handleShortDescription}
              maxLength={40}
              required
            />
            <div
              className="input-container-option"
              onClick={() =>
                document.getElementsByName("shortdescription")[0].focus()
              }
            >
              Short Description
            </div>
          </div>
          {shortDescriptionError && (
            <span className="wrong-info">
              <AiFillExclamationCircle />
              {shortDescriptionError}
            </span>
          )}
          <div className="input-container ">
            <textarea
              maxLength={300}
              type="text"
              value={longDescription}
              name="longdescription"
              onChange={handleLongDescription}
              className="input-container "
              required
            />
            <div
              className="input-container-option  "
              onClick={() =>
                document.getElementsByName("longdescription")[0].focus()
              }
            >
              long Description
            </div>
          </div>
          {longDescriptionError && (
            <span className="wrong-info">
              <AiFillExclamationCircle />
              {longDescriptionError}
            </span>
          )}
          <div className="custom-select">
            <div
              className="selected-option"
              onClick={() => setShowDropdownTheWay(!showDropdownTheWay)}
            >
              {!theWay ? (
                <div className="input-container-option input-dropdown">
                  Select The Way
                </div>
              ) : (
                <div>
                  <div className="input-container-option input-dropdown-title">
                    Select The Way
                  </div>
                  <div className="input-container-option input-dropdown input-selected">
                    {theWay}
                  </div>
                </div>
              )}
              <RiArrowDownSLine className="arrow-icon" />
            </div>
            {showDropdownTheWay && (
              <div className="options" id="input-dropdown">
                <div className="option-title">Select The Way</div>
                <div
                  className="option"
                  onClick={() => handleTheWayChange("Sell")}
                >
                  Sell
                </div>
                <div
                  className="option"
                  onClick={() => handleTheWayChange("Exchange")}
                >
                  Exchange
                </div>
              </div>
            )}
          </div>
          {theWayError && (
            <span className="wrong-info">
              {" "}
              <AiFillExclamationCircle /> {theWayError}{" "}
            </span>
          )}
          <div
            className={`input-container ${
              theWay === "Sell" ? "show" : "unshow"
            }`}
          >
            <input
              type="number"
              name="price"
              value={price}
              onChange={handleSetPrice}
            />

            <div
              className="input-container-option"
              onClick={() => document.getElementsByName("price")[0].focus()}
            >
              Price
            </div>
            <div className="UnivSuffix"> {"₪"}</div>
          </div>
          {priceError && (
            <span className="wrong-info">
              {" "}
              <AiFillExclamationCircle /> {priceError}{" "}
            </span>
          )}

          {/* <button type="submit" className={`btn btn-primary sign ${!isFormValid ? 'disabled' : ''}`}>  */}
          <div className="buttons">
            <button type="submit" className={`btn btn-primary `}>
              Publish
            </button>
            <button
              onClick={() => setCreate("")}
              className={`btn btn-secondary `}
            >
              Cancel
            </button>
          </div>
          {BookError && (
            <span className="wrong-info">
              <AiFillExclamationCircle />
              {BookError}
            </span>
          )}
          {Success && (
            <span className="success-info">
              <AiFillExclamationCircle />
              {"Added successfully"}
            </span>
          )}
        </form>
      </div>
    </>
  );
};

export default CreateBooks;
