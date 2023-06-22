import { useState, useEffect, useMemo } from "react";
import useComponent from "../../../../hooks/useComponent";
import { RiArrowDownSLine } from "react-icons/ri";
import { AiFillExclamationCircle } from "react-icons/ai";
import useBooks from "../../../../hooks/useBooks";
import DialogConfirmation from "../../../dialog_confirmation/DialogConfirmation";
import "./BooksForm.css";
import useLoader from "../../../../hooks/useLoader";
import useCollege from "../../../../hooks/useCollege";

const BooksForm = () => {
  const { setButtonCards, ButtonCards } = useComponent();
  const { BookSuccess, createBook, BookError, updateBook, Book, setBook } =
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
  const { Colleges } = useCollege();

  const [selectCollege, setSelectCollege] = useState("");

  const [showDropdownCollege, setShowDropdownCollege] = useState(false);

  const [selectCollegeError, setSelectCollegeError] = useState("");

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useMemo(() => {
    const handleOutsideClick = (event) => {
      if (
        !event.target.closest(".custom-select") &&
        !event.target.closest(".input-container-option")
      ) {
        setShowDropdownTheWay(false);
        setShowDropdownCondition(false);
        setShowDropdownCollege(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showDropdownTheWay, showDropdownCondition, showDropdownCollege]);

  useMemo(() => {
    setName(Book.name);
    setShortDescription(Book.shortDescription);
    setLongDescription(Book.longDescription);
    setPrice(Book.price);
    setTheWay(Book.theWay);
    setCondition(Book.condition);
    setSelectCollege(Book.collegeId);
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
      collegeId: Book.collegeId,
    });
    // eslint-disable-next-line
  }, [Book]);
  useMemo(() => {
    if (BookSuccess) {
      sleep(2000).then(() => {
        setButtonCards("");
      });
    }
    // eslint-disable-next-line
  }, [BookSuccess]);
  const handleCollegeChange = (college) => {
    setBookBo({
      ...book,
      collegeId: college.id,
    });
    setSelectCollege(college.name);
    setShowDropdownCollege(false);
    setSelectCollegeError(false);
  };
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

    if (!theWay) setTheWayError("Please enter a The Way");
    if (!condition) setConditionError("Please enter a The Way");
    if (theWay && condition && ButtonCards === "UpdateBook")
      updateBook(Book.id, book);
    else if (theWay && condition && ButtonCards === "CreateBook")
      createBook(book);
  };
  return (
    <>
      {deleteDialogState && (
        <DialogConfirmation
          setDeleteDialogState={setDeleteDialogState}
          serviceName={Book.serviceName}
          id={Book.id}
        />
      )}
      <div style={{ opacity: deleteDialogState ? 0.2 : 1 }}>
        <div className="create-section">
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
            <div className="form-title ">
              Add A New <span style={{ color: "#8D37FF" }}>&nbsp;Book.</span>{" "}
            </div>
            <div className="vertical-line" />
            <div className="form-input-container">
              <div className="form-title-paragraph ">
                Book Details
                <div className="form-paragraph">
                  Please provide the following details about the book you are
                  adding.
                </div>
              </div>
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
                  Book Name
                </div>
              </div>
              {nameError && (
                <span className="wrong-info">
                  <AiFillExclamationCircle />
                  {nameError}
                </span>
              )}
              <div className="custom-select">
                <div className="custom-select">
                  <div
                    className="selected-option"
                    onClick={() => setShowDropdownCollege(!showDropdownCollege)}
                  >
                    {!selectCollege ? (
                      <div className="input-container-option input-dropdown">
                        The book for which college ?
                      </div>
                    ) : (
                      <div>
                        <div className="input-container-option input-dropdown-title">
                          The book for which college ?
                        </div>
                        <div className="input-container-option input-dropdown input-selected">
                          {selectCollege}
                        </div>
                      </div>
                    )}
                    <RiArrowDownSLine className="arrow-icon" />
                  </div>
                  {showDropdownCollege && (
                    <div className="options" id="input-dropdown">
                      <div className="option-title">College Or Faculty</div>
                      {Object.values(Colleges).map((college) => (
                        <div
                          className="option"
                          key={college.id}
                          onClick={() => handleCollegeChange(college)}
                        >
                          {college.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {selectCollegeError && (
                <span className="wrong-info">
                  <AiFillExclamationCircle />
                  {selectCollegeError}
                </span>
              )}
              <div className="input-container textarea-input">
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
                  className="input-container-option textarea-input-placeholder"
                  onClick={() =>
                    document.getElementsByName("longdescription")[0].focus()
                  }
                >
                  Description
                </div>
              </div>
              {longDescriptionError && (
                <span className="wrong-info">
                  <AiFillExclamationCircle />
                  {longDescriptionError}
                </span>
              )}
              <div className="form-title-paragraph ">
                Book Price and Condition
                <div className="form-paragraph">
                  Could you kindly provide more details about the book's
                  condition, preferred method of sale, and the desired price?
                </div>
              </div>
              {/* for condition */}
              <div className="custom-select">
                <div
                  className="selected-option"
                  onClick={() =>
                    setShowDropdownCondition(!showDropdownCondition)
                  }
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
                  <button type="submit" className={`btn btn-primary btn-fill`}>
                    <div
                      className="loader"
                      style={{
                        display: ButtonsFormBooksLoader ? "block" : "none",
                      }}
                    />
                    Update
                  </button>
                ) : (
                  <button type="submit" className={`btn btn-primary btn-fill`}>
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
                  <button
                    onClick={handleDelete}
                    className={`btn btn-primary btn-fill`}
                  >
                    <div
                      className="loader"
                      style={{
                        display: DeleteButtonsFormBooksLoader
                          ? "block"
                          : "none",
                      }}
                    />
                    Delete
                  </button>
                ) : (
                  ""
                )}
                <button
                  onClick={() => setButtonCards("")}
                  className={`btn btn-secondary btn-fill`}
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
              {BookSuccess && (
                <span className="success-info">
                  <AiFillExclamationCircle />
                  {BookSuccess}
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BooksForm;
