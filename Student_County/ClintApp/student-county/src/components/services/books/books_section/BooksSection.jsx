import BookCard from "../book_card/BookCard";
import useBooks from "../../../../hooks/useBooks";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import "./BooksSection.css";
import "../../../../pages/dashboard/Dashboard.css";

import { Helmet } from "react-helmet";
import useLoader from "../../../../hooks/useLoader";
import useUserRelationData from "../../../../hooks/useUserRelationData";
import useAuth from "../../../../hooks/useAuth";
import useComponent from "../../../../hooks/useComponent";
import BooksForm from "../books_form/BooksForm";
import BooksView from "../books_view/BooksView";
import Menu from "../../../menu/menu";
import DashboardNavbar from "../../../navbar/dashboard_navbar/DashboardNavbar";
import useCollege from "../../../../hooks/useCollege";

const BooksSection = () => {
  const { decodedJwt } = useAuth();
  const { Books, getBooks, BookSuccess, setBooks } = useBooks();
  const { BooksLoader } = useLoader();
  const SORT_TYPES = ["Name", "Date", "Price"];
  const SORT_TYPES_OWNE = ["Name", "Date", "Price"];

  const { ButtonCards, filteredValue, setOptionMenu } = useComponent();
  const [SortTypeOwne, setSortTypeOwne] = useState("");
  const [sortType, setSortType] = useState("");
  const [showDropdownSort, setShowDropdownSort] = useState("");
  const [showDropdownSortOwne, setShowDropdownSortOwne] = useState("");
  const [query, setQuery] = useState("");

  const deferredInput = useDeferredValue(query);

  const { MyBooks, UserRelationDataLoader } = useUserRelationData();
  const { Colleges } = useCollege();

  const [selectCollege, setSelectCollege] = useState("");

  const [showDropdownCollege, setShowDropdownCollege] = useState(false);

  const [maxCards, setMaxCards] = useState(3);
  const filteredCitys = Object.values(Colleges).filter((car) =>
    car.name.toLowerCase().includes(deferredInput.toLowerCase())
  );
  useMemo(() => {
    const handleOutsideClick = (event) => {
      if (
        !event.target.closest(".custom-select") &&
        !event.target.closest(".input-container-option")
      ) {
        setShowDropdownSortOwne(false);
        setShowDropdownSort(false);
        setShowDropdownCollege(false);
        setQuery("");
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
    // eslint-disable-next-line
  }, [showDropdownSortOwne, showDropdownSort, showDropdownCollege]);

  useEffect(() => {
    getBooks();
    // eslint-disable-next-line
  }, [BookSuccess]);
  useEffect(() => {
    return function cleanup() {
      setBooks("");
      setOptionMenu("");
    };
    // eslint-disable-next-line
  }, []);
  const handleSortChange = (sort) => {
    setSortType(sort);
    setShowDropdownSort(false);
  };
  const handleSortOwneChange = (sort) => {
    setSortTypeOwne(sort);
    setShowDropdownSortOwne(false);
  };
  const handleShowMore = () => {
    setMaxCards(maxCards + 3);
  };
  const handleCollegeChange = (college) => {
    if (college) setSelectCollege(college);
    else setSelectCollege(false);
    setShowDropdownCollege(false);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      const formattedTime = date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "numeric",
      });
      return formattedTime;
    } else if (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    ) {
      return "Yesterday";
    } else {
      const formattedDate = date.toLocaleDateString([], {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return formattedDate;
    }
  };
  return (
    <>
      <Helmet>
        <title>Books</title>
      </Helmet>

      {(ButtonCards === "CreateBook" || ButtonCards === "UpdateBook") && (
        <BooksForm />
      )}

      {ButtonCards === "ViewBook" && <BooksView />}

      <div style={{ opacity: ButtonCards ? 0.2 : 1 }}>
        <div className={`dashboard-container  `}>
          <Menu />
          <div className={`dashboard  `}>
            <DashboardNavbar />
            <div
              className="service-container-owne"
              style={{ display: MyBooks.length !== 0 ? "flex" : "none" }}
            >
              <div className="services-head">
                <div className="services-head-title">Your Books</div>
                <div className="filterboxs">
                  <div className="input-group">
                    <div className="custom-select">
                      <div
                        className="selected-option"
                        onClick={() =>
                          setShowDropdownSortOwne(!showDropdownSortOwne)
                        }
                      >
                        {!SortTypeOwne ? (
                          <div className="input-container-option input-dropdown">
                            Sort By
                          </div>
                        ) : (
                          <div>
                            <div className="input-container-option input-dropdown-title">
                              Sort By
                            </div>
                            <div className="input-container-option input-dropdown input-selected">
                              {SortTypeOwne}
                            </div>
                          </div>
                        )}

                        <RiArrowDownSLine className="arrow-icon" />
                      </div>
                      {showDropdownSortOwne && (
                        <div className="options" id="input-dropdown">
                          <div className="option-title">Sort By</div>
                          {SORT_TYPES_OWNE.map((sort, index) => (
                            <div
                              key={index}
                              className="option"
                              onClick={() => handleSortOwneChange(sort)}
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
              <div className="cards-owne">
                <div
                  className="loader-overview"
                  style={{
                    display: UserRelationDataLoader ? "block" : "none",
                  }}
                >
                  <div className="loader-square"></div>
                  <div className="loader-square"></div>
                  <div className="loader-square"></div>
                  <div className="loader-square"></div>
                  <div className="loader-square"></div>
                  <div className="loader-square"></div>
                  <div className="loader-square"></div>
                </div>

                {!SortTypeOwne &&
                  Object.values(MyBooks)
                    .slice(0, maxCards)
                    .map((book) => (
                      <BookCard
                        name={book.name}
                        price={book.price}
                        shortDescription={book.shortDescription}
                        longDescription={book.longDescription}
                        key={book.id}
                        id={book.id}
                        createdOn={formatDate(book.createdOn)}
                        studentId={book.studentId}
                        theWay={book.theWay}
                        collegeId={book.collegeId}
                        condition={book.condition}
                      />
                    ))}
                {SortTypeOwne === "Name" &&
                  Object.values(MyBooks)
                    .sort((a, b) => (a.name > b.name ? 1 : -1))
                    .slice(0, maxCards)
                    .map((book) => (
                      <BookCard
                        name={book.name}
                        price={book.price}
                        shortDescription={book.shortDescription}
                        longDescription={book.longDescription}
                        key={book.id}
                        id={book.id}
                        createdOn={formatDate(book.createdOn)}
                        studentId={book.studentId}
                        theWay={book.theWay}
                        collegeId={book.collegeId}
                        condition={book.condition}
                      />
                    ))}
                {SortTypeOwne === "Date" &&
                  Object.values(MyBooks)
                    .sort(
                      (a, b) =>
                        Date.parse(b.createdOn) - Date.parse(a.createdOn)
                    )
                    .slice(0, maxCards)
                    .map((book) => (
                      <BookCard
                        name={book.name}
                        price={book.price}
                        shortDescription={book.shortDescription}
                        longDescription={book.longDescription}
                        key={book.id}
                        id={book.id}
                        createdOn={formatDate(book.createdOn)}
                        studentId={book.studentId}
                        theWay={book.theWay}
                        collegeId={book.collegeId}
                        condition={book.condition}
                      />
                    ))}
                {SortTypeOwne === "Price" &&
                  Object.values(MyBooks)
                    .sort((a, b) => b.price - a.price)
                    .slice(0, maxCards)
                    .map((book) => (
                      <BookCard
                        name={book.name}
                        price={book.price}
                        shortDescription={book.shortDescription}
                        longDescription={book.longDescription}
                        key={book.id}
                        id={book.id}
                        createdOn={formatDate(book.createdOn)}
                        studentId={book.studentId}
                        theWay={book.theWay}
                        collegeId={book.collegeId}
                        condition={book.condition}
                      />
                    ))}
              </div>
              <div className="show-more-button">
                <div
                  className="btn btn-primary btn-fill btn-show"
                  onClick={handleShowMore}
                >
                  Show More
                </div>
              </div>
            </div>

            {/* all */}
            <div className="service-container">
              <div className="services-head">
                <div className="services-head-title">Find Services</div>
                <div className="filterboxs">
                  <div className="input-group">
                    <div className="custom-select-select-by-college">
                      <div className="custom-select">
                        <div
                          className="selected-option"
                          onClick={() =>
                            setShowDropdownCollege(!showDropdownCollege)
                          }
                        >
                          {!selectCollege ? (
                            <div className="input-container-option input-dropdown">
                              Select By College
                            </div>
                          ) : (
                            <div>
                              <div className="input-container-option input-dropdown-title">
                                Select By College
                              </div>
                              <div className="input-container-option input-dropdown input-selected">
                                {selectCollege.name}
                              </div>
                            </div>
                          )}
                          <RiArrowDownSLine className="arrow-icon" />
                        </div>
                        {showDropdownCollege && (
                          <div className="options" id="input-dropdown">
                            <div className="option-title">
                              College Or Faculty
                            </div>

                            <input
                              type="text"
                              placeholder="Search College..."
                              value={query}
                              onChange={(e) => setQuery(e.target.value)}
                              className="input-search"
                            />
                            <div
                              onClick={() => handleCollegeChange(false)}
                              className="option"
                            >
                              All
                            </div>
                            {filteredCitys.map((college) => (
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

                    <div className="custom-select-select-by-college">
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
                <div
                  className="loader-overview"
                  style={{ display: BooksLoader ? "block" : "none" }}
                >
                  <div className="loader-square"></div>
                  <div className="loader-square"></div>
                  <div className="loader-square"></div>
                  <div className="loader-square"></div>
                  <div className="loader-square"></div>
                  <div className="loader-square"></div>
                  <div className="loader-square"></div>
                </div>

                {!filteredValue
                  ? !sortType &&
                    Object.values(Books)
                      .filter((book) =>
                        selectCollege
                          ? book.collegeId === selectCollege.id
                          : true
                      )
                      .filter((book) => book.studentId !== decodedJwt.uid)
                      .map((book) => (
                        <BookCard
                          name={book.name}
                          price={book.price}
                          shortDescription={book.shortDescription}
                          longDescription={book.longDescription}
                          key={book.id}
                          id={book.id}
                          createdOn={formatDate(book.createdOn)}
                          studentId={book.studentId}
                          theWay={book.theWay}
                          collegeId={book.collegeId}
                          condition={book.condition}
                        />
                      ))
                  : !sortType &&
                    Object.values(filteredValue)
                      .filter((book) =>
                        selectCollege
                          ? book.collegeId === selectCollege.id
                          : true
                      )
                      .filter((book) => book.studentId !== decodedJwt.uid)
                      .map((book) => (
                        <BookCard
                          name={book.name}
                          price={book.price}
                          shortDescription={book.shortDescription}
                          longDescription={book.longDescription}
                          key={book.id}
                          id={book.id}
                          createdOn={formatDate(book.createdOn)}
                          studentId={book.studentId}
                          theWay={book.theWay}
                          collegeId={book.collegeId}
                          condition={book.condition}
                        />
                      ))}

                {!filteredValue
                  ? sortType === "Name" &&
                    Object.values(Books)
                      .sort((a, b) => (a.name > b.name ? 1 : -1))
                      .filter((book) =>
                        selectCollege
                          ? book.collegeId === selectCollege.id
                          : true
                      )

                      .filter((book) => book.studentId !== decodedJwt.uid)
                      .map((book) => (
                        <BookCard
                          name={book.name}
                          price={book.price}
                          shortDescription={book.shortDescription}
                          longDescription={book.longDescription}
                          key={book.id}
                          id={book.id}
                          createdOn={formatDate(book.createdOn)}
                          studentId={book.studentId}
                          theWay={book.theWay}
                          collegeId={book.collegeId}
                          condition={book.condition}
                        />
                      ))
                  : sortType === "Name" &&
                    Object.values(filteredValue)
                      .sort((a, b) => (a.name > b.name ? 1 : -1))
                      .filter((book) =>
                        selectCollege
                          ? book.collegeId === selectCollege.id
                          : true
                      )

                      .filter((book) => book.studentId !== decodedJwt.uid)
                      .map((book) => (
                        <BookCard
                          name={book.name}
                          price={book.price}
                          shortDescription={book.shortDescription}
                          longDescription={book.longDescription}
                          key={book.id}
                          id={book.id}
                          createdOn={formatDate(book.createdOn)}
                          studentId={book.studentId}
                          theWay={book.theWay}
                          collegeId={book.collegeId}
                          condition={book.condition}
                        />
                      ))}

                {!filteredValue
                  ? sortType === "Date" &&
                    Object.values(Books)
                      .filter((book) =>
                        selectCollege
                          ? book.collegeId === selectCollege.id
                          : true
                      )

                      .filter((book) => book.studentId !== decodedJwt.uid)
                      .sort(
                        (a, b) =>
                          Date.parse(b.createdOn) - Date.parse(a.createdOn)
                      )
                      .map((book) => (
                        <BookCard
                          name={book.name}
                          price={book.price}
                          shortDescription={book.shortDescription}
                          longDescription={book.longDescription}
                          key={book.id}
                          id={book.id}
                          createdOn={formatDate(book.createdOn)}
                          studentId={book.studentId}
                          theWay={book.theWay}
                          collegeId={book.collegeId}
                          condition={book.condition}
                        />
                      ))
                  : sortType === "Date" &&
                    Object.values(filteredValue)
                      .filter((book) =>
                        selectCollege
                          ? book.collegeId === selectCollege.id
                          : true
                      )

                      .filter((book) => book.studentId !== decodedJwt.uid)
                      .sort(
                        (a, b) =>
                          Date.parse(b.createdOn) - Date.parse(a.createdOn)
                      )
                      .map((book) => (
                        <BookCard
                          name={book.name}
                          price={book.price}
                          shortDescription={book.shortDescription}
                          longDescription={book.longDescription}
                          key={book.id}
                          id={book.id}
                          createdOn={formatDate(book.createdOn)}
                          studentId={book.studentId}
                          theWay={book.theWay}
                          collegeId={book.collegeId}
                          condition={book.condition}
                        />
                      ))}

                {!filteredValue
                  ? sortType === "Price" &&
                    Object.values(Books)
                      .filter((book) =>
                        selectCollege
                          ? book.collegeId === selectCollege.id
                          : true
                      )

                      .filter((book) => book.studentId !== decodedJwt.uid)
                      .sort((a, b) => b.price - a.price)
                      .map((book) => (
                        <BookCard
                          name={book.name}
                          price={book.price}
                          shortDescription={book.shortDescription}
                          longDescription={book.longDescription}
                          key={book.id}
                          id={book.id}
                          createdOn={formatDate(book.createdOn)}
                          studentId={book.studentId}
                          theWay={book.theWay}
                          collegeId={book.collegeId}
                          condition={book.condition}
                        />
                      ))
                  : sortType === "Price" &&
                    Object.values(filteredValue)
                      .filter((book) =>
                        selectCollege
                          ? book.collegeId === selectCollege.id
                          : true
                      )

                      .filter((book) => book.studentId !== decodedJwt.uid)
                      .sort((a, b) => b.price - a.price)
                      .map((book) => (
                        <BookCard
                          name={book.name}
                          price={book.price}
                          shortDescription={book.shortDescription}
                          longDescription={book.longDescription}
                          key={book.id}
                          id={book.id}
                          createdOn={formatDate(book.createdOn)}
                          studentId={book.studentId}
                          theWay={book.theWay}
                          collegeId={book.collegeId}
                          condition={book.condition}
                        />
                      ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BooksSection;
