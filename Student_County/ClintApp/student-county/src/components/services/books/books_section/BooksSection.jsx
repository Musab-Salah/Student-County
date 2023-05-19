import BookCard from "../../../cards/BookCard";
import useBooks from "../../../../hooks/useBooks";
import { useEffect, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import "./BooksSection.css";

const BooksSection = ({ filteredValue, setFilteredValue }) => {
  const { Books, getBooks, Success } = useBooks();
  const SORT_TYPES = ["Name", "Date", "Price"];
  const [showDropdownType, setShowDropdownType] = useState("");
  const [sortType, setSortType] = useState("");
  const [showDropdownSort, setShowDropdownSort] = useState("");

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !event.target.closest(".custom-select") &&
        !event.target.closest(".input-container-option")
      ) {
        setShowDropdownType(false);
        setShowDropdownSort(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showDropdownType, showDropdownSort]);

  useEffect(() => {
    getBooks();
    // eslint-disable-next-line
  }, [Success]);
  useEffect(() => {
    return function cleanup() {
      setSortType("");
      setFilteredValue("");
    };
    // eslint-disable-next-line
  }, []);
  const handleSortChange = (sort) => {
    setSortType(sort);
    setShowDropdownSort(false);
  };

  return (
    <>
      <div className="service-container">
        <div className="services-head">
          <div className="services-head-title">Find Services</div>
          <div className="filterboxs">
            <div className="input-group">
              <div className="custom-select">
                <div
                  className="selected-option"
                  onClick={() => setShowDropdownSort(!showDropdownSort)}
                >
                  {!sortType ? (
                    <div className="input-container-option input-dropdown">
                      Sort By
                    </div>
                  ) : (
                    <div>
                      <div className="input-container-option input-dropdown-title">
                        Sort By
                      </div>
                      <div className="input-container-option input-dropdown input-selected">
                        {sortType}
                      </div>
                    </div>
                  )}

                  <RiArrowDownSLine className="arrow-icon" />
                </div>
                {showDropdownSort && (
                  <div className="options" id="input-dropdown">
                    <div className="option-title">Sort By</div>
                    {SORT_TYPES.map((sort, index) => (
                      <div
                        key={index}
                        className="option"
                        onClick={() => handleSortChange(sort)}
                      >
                        {sort}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="cards">
          {!filteredValue
            ? sortType === "" &&
              Books.map((book) => (
                <BookCard
                  name={book.name}
                  price={book.price}
                  shortDescription={book.shortDescription}
                  longDescription={book.longDescription}
                  key={book.id}
                  id={book.id}
                  studentId={book.studentId}
                />
              ))
            : sortType === "" &&
              filteredValue.map((book) => (
                <BookCard
                  name={book.name}
                  price={book.price}
                  shortDescription={book.shortDescription}
                  longDescription={book.longDescription}
                  key={book.id}
                  id={book.id}
                  studentId={book.studentId}
                />
              ))}
          {!filteredValue
            ? sortType === "Name" &&
              Books.sort((a, b) => (a.name > b.name ? 1 : -1)).map((book) => (
                <BookCard
                  name={book.name}
                  price={book.price}
                  shortDescription={book.shortDescription}
                  longDescription={book.longDescription}
                  key={book.id}
                  id={book.id}
                  studentId={book.studentId}
                />
              ))
            : sortType === "Name" &&
              filteredValue
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((book) => (
                  <BookCard
                    name={book.name}
                    price={book.price}
                    shortDescription={book.shortDescription}
                    longDescription={book.longDescription}
                    key={book.id}
                    id={book.id}
                    studentId={book.studentId}
                  />
                ))}
          {!filteredValue
            ? sortType === "Date" &&
              Books.sort(
                (a, b) => Date.parse(b.createdOn) - Date.parse(a.createdOn)
              ).map((book) => (
                <BookCard
                  name={book.name}
                  price={book.price}
                  shortDescription={book.shortDescription}
                  longDescription={book.longDescription}
                  key={book.id}
                  id={book.id}
                  studentId={book.studentId}
                />
              ))
            : sortType === "Date" &&
              filteredValue
                .sort(
                  (a, b) => Date.parse(b.createdOn) - Date.parse(a.createdOn)
                )
                .map((book) => (
                  <BookCard
                    name={book.name}
                    price={book.price}
                    shortDescription={book.shortDescription}
                    longDescription={book.longDescription}
                    key={book.id}
                    id={book.id}
                    studentId={book.studentId}
                  />
                ))}
          {!filteredValue
            ? sortType === "Price" &&
              Books.sort((a, b) => b.price - a.price).map((book) => (
                <BookCard
                  name={book.name}
                  price={book.price}
                  shortDescription={book.shortDescription}
                  longDescription={book.longDescription}
                  key={book.id}
                  id={book.id}
                  studentId={book.studentId}
                />
              ))
            : sortType === "Price" &&
              filteredValue
                .sort((a, b) => b.price - a.price)
                .map((book) => (
                  <BookCard
                    name={book.name}
                    price={book.price}
                    shortDescription={book.shortDescription}
                    longDescription={book.longDescription}
                    key={book.id}
                    id={book.id}
                    studentId={book.studentId}
                  />
                ))}
        </div>
      </div>
    </>
  );
};

export default BooksSection;
