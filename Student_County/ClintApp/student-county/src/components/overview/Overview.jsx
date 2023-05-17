import { useState, useEffect } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { FaBook, FaHome } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
import useBooks from "../../hooks/useBooks";
import BookCard from "../cards/BookCard";

const Overview = () => {
  const TYPES = ["All", "Book", "Ride", "House", "Patient", "Tools"];
  const SORT_TYPES = ["Name", "Date", "Price"];
  const { MyBooks, getMyAllBooks, Success } = useBooks();
  const [selectType, setSelectType] = useState(false);
  const [showDropdownType, setShowDropdownType] = useState(false);
  const [sortType, setSortType] = useState(false);
  const [showDropdownSort, setShowDropdownSort] = useState(false);
  const Bookslength = MyBooks.length;

  function handleTypeChange(type) {
    setSelectType(type);
    setShowDropdownType(false);
  }

  function handleSortChange(sort) {
    setSortType(sort);
    setShowDropdownSort(false);
  }

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
    getMyAllBooks();

    // eslint-disable-next-line
  }, [Success]);

  return (
    <>
      <div className="info-container">
        <div className="stats-container">
          <div className="stats">
            <div className="stats-icon-background">
              <FaBook className="stats-icon" />
            </div>
            <div className="stats-info">
              <div className="stats-title">BOOKS</div>
              <div className="stats-number">{Bookslength}</div>
            </div>
          </div>
          <div className="stats">
            <div className="stats-icon-background">
              <HiUserGroup className="stats-icon" />
            </div>
            <div className="stats-info">
              <div className="stats-title">RIDING</div>
              <div className="stats-number">0</div>
            </div>
          </div>
          <div className="stats">
            <div className="stats-icon-background">
              <FaHome className="stats-icon" />
            </div>
            <div className="stats-info">
              <div className="stats-title">HOUSING</div>
              <div className="stats-number">0</div>
            </div>
          </div>
        </div>
        <div className="activities-container">
          <div className="activities-title">Recent Activities</div>
        </div>
        <div className="add-container">
          <AiOutlinePlus className="btn add-icon" />
          <div className="add-title">ADD SERVICE</div>
        </div>
      </div>
      <div className="service-container">
        <div className="services-head">
          <div className="services-head-title">Your Services</div>
          <div className="filterboxs">
            <div className="input-group">
              <div className="custom-select">
                <div
                  className="selected-option"
                  onClick={() => setShowDropdownType(!showDropdownType)}
                >
                  {!selectType ? (
                    <div className="input-container-option input-dropdown">
                      Select Type
                    </div>
                  ) : (
                    <div>
                      <div className="input-container-option input-dropdown-title">
                        Type
                      </div>
                      <div className="input-container-option input-dropdown input-selected">
                        {selectType.name}
                      </div>
                    </div>
                  )}
                  <RiArrowDownSLine className="arrow-icon" />
                </div>
                {showDropdownType && (
                  <div className="options" id="input-dropdown">
                    <div className="option-title">Select Type</div>
                    {TYPES.map((type, index) => (
                      <div
                        key={index}
                        className="option"
                        onClick={() =>
                          handleTypeChange({ name: type, id: index + 1 })
                        }
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
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
          {MyBooks.map((book) => (
            <BookCard
              name={book.name}
              price={book.price}
              shortDescription={book.shortDescription}
              longDescription={book.longDescription}
              key={book.id}
              studentId={book.studentId}
              id={book.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Overview;
