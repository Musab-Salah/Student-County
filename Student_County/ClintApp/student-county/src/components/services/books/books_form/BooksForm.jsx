import { useState, useEffect, useMemo } from "react";
import useComponent from "../../../../hooks/useComponent";
import { RiArrowDownSLine } from "react-icons/ri";
import { AiFillExclamationCircle } from "react-icons/ai";
import useBooks from "../../../../hooks/useBooks";
import DialogConfirmation from "../../../dialog_confirmation/DialogConfirmation";
import "./BooksForm.css";
import useLoader from "../../../../hooks/useLoader";

const BooksForm = () => {
  const { setButtonCards, ButtonCards } = useComponent();
  const { Success, createBook, BookError, updateBook, Book, setBook } =
    useBooks();
  // State Hook
  const [name, setName] = useState("");
  const [deleteDialogState, setDeleteDialogState] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [price, setPrice] = useState("");
  const [theWay, setTheWay] = useState("");
  const [condition, setCondition] = useState("");
  const [book, setBookBo] = useState({});
  const {
    FormBooksLoader,
    ButtonsFormBooksLoader,
    DeleteButtonsFormBooksLoader,
  } = useLoader();

  // Error Hook
  const [theWayError, setTheWayError] = useState("");
  const [conditionError, setConditionError] = useState("");

  const [nameError, setNameError] = useState("");
  const [shortDescriptionError, setShortDescriptionError] = useState("");
  const [longDescriptionError, setLongDescriptionError] = useState("");
  const [priceError, setPriceError] = useState("");

  const [showDropdownTheWay, setShowDropdownTheWay] = useState(false);
  const [showDropdownCondition, setShowDropdownCondition] = useState(false);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useMemo(() => {
    const handleOutsideClick = (event) => {
      if (
        !event.target.closest(".custom-select") &&
        !event.target.closest(".input-container-option")
      ) {
        setShowDropdownTheWay(false);
        setShowDropdownCondition(false);

      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showDropdownTheWay,showDropdownCondition]);

  


  useMemo(() => {
    setName(Book.name);
    setShortDescription(Book.shortDescription);
    setLongDescription(Book.longDescription);
    setPrice(Book.price);
    setTheWay(Book.theWay);
    setCondition(Book.ConditionCondition);
    setBookBo({
      ...book,
      studentId: Book.studentId,
      id: Book.id,
      name: Book.name,
      shortDescription: Book.shortDescription,
      longDescription: Book.longDescription,
      price: Book.price,
      theWay: Book.theWay,
      condition: Book.condition,
    });
    // eslint-disable-next-line
  }, [Book]);
  useMemo(() => {
    if (Success) {
      sleep(2000).then(() => {
        setButtonCards("");
      });
    }
    // eslint-disable-next-line
  }, [Success]);

  useEffect(() => {
    return function cleanup() {
      setButtonCards("");
      setBook("");
    };
    // eslint-disable-next-line
  }, []);

  const handleTheWayChange = (value) => {
    setBookBo({
      ...book,
      theWay: value,
    });
    setTheWay(value);
    setTheWayError(false);
    setShowDropdownTheWay(false);
  };
  const handleTheConditionChange = (value) => {
    setBookBo({
      ...book,
      condition: value,
    });
    setCondition(value);
    setConditionError(false);
    setShowDropdownCondition(false);
  };

  const handleSetName = (e) => {
    const nameRegex = /^([a-zA-Z])(?=.{3,})/;
    if (!nameRegex.test(e.target.value)) {
      setNameError(
        "Please enter a valid name, for example: Software Engineering"
      );
    } else {
      setBookBo({
        ...book,
        name: e.target.value,
      });
      setNameError(false);
    }
  };
  const handleShortDescription = (e) => {
    const nameRegex = /^(?=.{0,})/;
    if (!nameRegex.test(e.target.value)) {
      setShortDescriptionError(
        "Please lengthen this text to 10 characters or more"
      );
    } else {
      setBookBo({
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
      setBookBo({
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
      setBookBo({
        ...book,
        price: e.target.value,
      });
      setPriceError(false);
    }
  };
  const handleDelete = (event) => {
    event.preventDefault();
    setDeleteDialogState(true);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (ButtonCards === "UpdateBook") updateBook(Book.id, book);
    else if (ButtonCards === "CreateBook") createBook(book);
  };
  return (
    <>
      {deleteDialogState && (
        <DialogConfirmation
          setDeleteDialogState={setDeleteDialogState}
          id={Book.id}
        />
      )}
      <div style={{ opacity: deleteDialogState ? 0.2 : 1 }}>
        <div className="Create-section">
          <div
            className="container-load-form"
            style={{ display: FormBooksLoader ? "block" : "none" }}
          >
            <div className="block-load-form"></div>
            <div className="block-load-form"></div>
            <div className="block-load-form"></div>
            <div className="block-load-form"></div>
            <div className="block-load-form"></div>
            <div className="block-load-form"></div>
            <div className="block-load-form"></div>
            <div className="block-load-form"></div>
            <div className="block-load-form"></div>
            <div className="block-load-form"></div>
            <div className="block-load-form"></div>
            <div className="block-load-form"></div>
            <div className="block-load-form"></div>
            <div className="block-load-form"></div>
            <div className="block-load-form"></div>
            <div className="block-load-form"></div>
          </div>
          <form
            style={{ display: FormBooksLoader ? "none" : "flex" }}
            className="form-create"
            onSubmit={handleSubmit}
          >
            <div className="input-container">
              <input
                maxLength={40}
                type="text"
                name="name"
                defaultValue={name ? name : book.name}
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
                defaultValue={
                  shortDescription ? shortDescription : book.shortDescription
                }
                onChange={handleShortDescription}
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
            <div className="input-container" style={{ minWidth: '100%', maxWidth: '392.31px' }}>
              <textarea
                maxLength={300}
                type="text"
                defaultValue={
                  longDescription ? longDescription : book.longDescription
                }
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
                Long description
              </div>
            </div>
            {longDescriptionError && (
              <span className="wrong-info">
                <AiFillExclamationCircle />
                {longDescriptionError}
              </span>
            )}
            {/* for condition */}
            <div className="custom-select">
              <div
                className="selected-option"
                onClick={() => setShowDropdownCondition(!showDropdownCondition)}
              >
                {!condition ? (
                  <div className="input-container-option input-dropdown">
                    Select The Condition
                  </div>
                ) : (
                  <div>
                    <div className="input-container-option input-dropdown-title">
                      Select The Condition
                    </div>
                    <div className="input-container-option input-dropdown input-selected">
                      {condition}
                    </div>
                  </div>
                )}
                <RiArrowDownSLine className="arrow-icon" />
              </div>
              {showDropdownCondition && (
                <div className="options" id="input-dropdown">
                  <div className="option-title">Select The Condition</div>
                  <div
                    className="option"
                    onClick={() => handleTheConditionChange("New")}
                  >
                    New
                  </div>
                  <div
                    className="option"
                    onClick={() => handleTheConditionChange("Used")}
                  >
                    Used
                  </div>
                </div>
              )}
            </div>
            {conditionError && (
              <span className="wrong-info">
                <AiFillExclamationCircle />
                {conditionError}
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
                defaultValue={price ? price : book.price}
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
              {ButtonCards === "UpdateBook" ? (
                <button type="submit" className={`btn btn-primary `}>
                  <div
                    className="loader"
                    style={{
                      display: ButtonsFormBooksLoader ? "block" : "none",
                    }}
                  />
                  Update
                </button>
              ) : (
                <button type="submit" className={`btn btn-primary `}>
                  <div
                    className="loader"
                    style={{
                      display: ButtonsFormBooksLoader ? "block" : "none",
                    }}
                  />
                  Publish
                </button>
              )}
              {ButtonCards === "UpdateBook" ? (
                <button onClick={handleDelete} className={`btn btn-primary `}>
                  <div
                    className="loader"
                    style={{
                      display: DeleteButtonsFormBooksLoader ? "block" : "none",
                    }}
                  />
                  Delete
                </button>
              ) : (
                ""
              )}
              <button
                onClick={() => setButtonCards("")}
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
                {Success}
              </span>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default BooksForm;
