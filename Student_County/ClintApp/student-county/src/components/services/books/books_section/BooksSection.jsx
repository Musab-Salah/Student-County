import BookCard from "../../../cards/BookCard";
import useBooks from "../../../../hooks/useBooks";
import { useEffect, useMemo, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import "./BooksSection.css";
import { Helmet } from "react-helmet";

const BooksSection = ({ filteredValue }) => {
  const { Books, getBooks, Success, setBooks } = useBooks();
  const SORT_TYPES = ["Name", "Date", "Price"];
  const [showDropdownType, setShowDropdownType] = useState("");
  const [sortType, setSortType] = useState("");
  const [showDropdownSort, setShowDropdownSort] = useState("");

  useMemo(() => {
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
    // eslint-disable-next-line
  }, [showDropdownType, showDropdownSort]);

  useEffect(() => {
    getBooks();
    // eslint-disable-next-line
  }, [Success]);
  useEffect(() => {
    return function cleanup() {
      setBooks("");
    };
    // eslint-disable-next-line
  }, []);
  const handleSortChange = (sort) => {
    setSortType(sort);
    setShowDropdownSort(false);
  };

  return (
    <>
      <Helmet>
        <title>Books</title>
      </Helmet>
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
            ? !sortType &&
              Object.values(Books).map((book) => (
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
            : !sortType &&
              Object.values(filteredValue).map((book) => (
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
              Object.values(Books)
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
                ))
            : sortType === "Name" &&
              Object.values(filteredValue)
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
              Object.values(Books)
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
                ))
            : sortType === "Date" &&
              Object.values(filteredValue)
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
              Object.values(Books)
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
                ))
            : sortType === "Price" &&
              Object.values(filteredValue)
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