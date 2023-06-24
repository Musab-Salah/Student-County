import ToolCard from "../tool_card/ToolCard";
import useTools from "../../../../hooks/useTools";
import { useEffect, useMemo, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import "./ToolSection.css";
import { Helmet } from "react-helmet";
import useLoader from "../../../../hooks/useLoader";
import useAuth from "../../../../hooks/useAuth";
import useUserRelationData from "../../../../hooks/useUserRelationData";
import DashboardNavbar from "../../../navbar/dashboard_navbar/DashboardNavbar";
import Menu from "../../../menu/menu";
import useComponent from "../../../../hooks/useComponent";
import ToolForm from "../tool_form/ToolForm";
import ToolView from "../tool_view/ToolView";
import "../../../../pages/dashboard/Dashboard.css";

const ToolSection = () => {
  const { decodedJwt } = useAuth();
  const { ButtonCards, filteredValue, setOptionMenu } = useComponent();
  const { MyTools, UserRelationDataLoader } = useUserRelationData();
  const { Tools, getTools, ToolsSuccess, setTools } = useTools();
  const { ToolLoader } = useLoader();
  const SORT_TYPES = ["Name", "Date", "Price"];
  const SORT_TYPES_OWNE = ["Name", "Date", "Price"];
  const [maxCards, setMaxCards] = useState(3);

  const [SortTypeOwne, setSortTypeOwne] = useState("");
  const [sortType, setSortType] = useState("");
  const [showDropdownSort, setShowDropdownSort] = useState("");
  const [showDropdownSortOwne, setShowDropdownSortOwne] = useState("");

  const handleShowMore = () => {
    setMaxCards(maxCards + 3);
  };
  useMemo(() => {
    const handleOutsideClick = (event) => {
      if (
        !event.target.closest(".custom-select") &&
        !event.target.closest(".input-container-option")
      ) {
        setShowDropdownSortOwne(false);
        setShowDropdownSort(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
    // eslint-disable-next-line
  }, [showDropdownSortOwne, showDropdownSort]);

  useEffect(() => {
    getTools();
    // eslint-disable-next-line
  }, [ToolsSuccess]);
  useEffect(() => {
    return function cleanup() {
      setTools("");
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
        <title>Tool</title>
      </Helmet>
      {(ButtonCards === "CreateTool" || ButtonCards === "UpdateTool") && (
        <ToolForm />
      )}

      {ButtonCards === "ViewTool" && <ToolView />}

      <div style={{ opacity: ButtonCards ? 0.2 : 1 }}>
        <div className={`dashboard-container  `}>
          <Menu />
          <div className={`dashboard  `}>
            <DashboardNavbar />
            <div
              className="service-container-owne"
              style={{ display: MyTools.length !== 0 ? "flex" : "none" }}
            >
              <div className="services-head">
                <div className="services-head-title">Your Tools</div>
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
                  style={{ display: UserRelationDataLoader ? "block" : "none" }}
                >
                  <div className="loader-square"></div>
                  <div className="loader-square"></div>
                  <div className="loader-square"></div>
                  <div className="loader-square"></div>
                  <div className="loader-square"></div>
                  <div className="loader-square"></div>
                  <div className="loader-square"></div>
                </div>

                {!sortType &&
                  Object.values(MyTools)
                    .slice(0, maxCards)
                    .map((tool) => (
                      <ToolCard
                        createdOn={formatDate(tool.createdOn)}
                        id={tool.id}
                        studentId={tool.studentId}
                        theWay={tool.theWay}
                        condition={tool.condition}
                        price={tool.price}
                        shortDescription={tool.shortDescription}
                        name={tool.name}
                        longDescription={tool.longDescription}
                        key={tool.id}
                      />
                    ))}
                {sortType === "Name" &&
                  Object.values(MyTools)
                    .sort((a, b) => (a.name > b.name ? 1 : -1))
                    .slice(0, maxCards)
                    .map((tool) => (
                      <ToolCard
                        createdOn={formatDate(tool.createdOn)}
                        id={tool.id}
                        studentId={tool.studentId}
                        theWay={tool.theWay}
                        condition={tool.condition}
                        price={tool.price}
                        shortDescription={tool.shortDescription}
                        name={tool.name}
                        longDescription={tool.longDescription}
                        key={tool.id}
                      />
                    ))}
                {sortType === "Date" &&
                  Object.values(MyTools)
                    .sort(
                      (a, b) =>
                        Date.parse(b.createdOn) - Date.parse(a.createdOn)
                    )
                    .slice(0, maxCards)
                    .map((tool) => (
                      <ToolCard
                        createdOn={formatDate(tool.createdOn)}
                        id={tool.id}
                        studentId={tool.studentId}
                        theWay={tool.theWay}
                        condition={tool.condition}
                        price={tool.price}
                        shortDescription={tool.shortDescription}
                        name={tool.name}
                        longDescription={tool.longDescription}
                        key={tool.id}
                      />
                    ))}
                {sortType === "Price" &&
                  Object.values(MyTools)
                    .sort((a, b) => b.price - a.price)
                    .slice(0, maxCards)
                    .map((tool) => (
                      <ToolCard
                        createdOn={formatDate(tool.createdOn)}
                        id={tool.id}
                        studentId={tool.studentId}
                        theWay={tool.theWay}
                        condition={tool.condition}
                        price={tool.price}
                        shortDescription={tool.shortDescription}
                        name={tool.name}
                        longDescription={tool.longDescription}
                        key={tool.id}
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
                <div
                  className="loader-overview"
                  style={{ display: ToolLoader ? "block" : "none" }}
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
                    Object.values(Tools)
                      .filter((tool) => tool.studentId !== decodedJwt.uid)
                      .map((tool) => (
                        <ToolCard
                          createdOn={formatDate(tool.createdOn)}
                          id={tool.id}
                          studentId={tool.studentId}
                          theWay={tool.theWay}
                          condition={tool.condition}
                          price={tool.price}
                          shortDescription={tool.shortDescription}
                          name={tool.name}
                          longDescription={tool.longDescription}
                          key={tool.id}
                        />
                      ))
                  : !sortType &&
                    Object.values(filteredValue)
                      .filter((tool) => tool.studentId !== decodedJwt.uid)
                      .map((tool) => (
                        <ToolCard
                          createdOn={formatDate(tool.createdOn)}
                          id={tool.id}
                          studentId={tool.studentId}
                          theWay={tool.theWay}
                          condition={tool.condition}
                          price={tool.price}
                          shortDescription={tool.shortDescription}
                          name={tool.name}
                          longDescription={tool.longDescription}
                          key={tool.id}
                        />
                      ))}

                {!filteredValue
                  ? sortType === "Name" &&
                    Object.values(Tools)
                      .filter((tool) => tool.studentId !== decodedJwt.uid)
                      .sort((a, b) => (a.name > b.name ? 1 : -1))
                      .map((tool) => (
                        <ToolCard
                          createdOn={formatDate(tool.createdOn)}
                          id={tool.id}
                          studentId={tool.studentId}
                          theWay={tool.theWay}
                          condition={tool.condition}
                          price={tool.price}
                          shortDescription={tool.shortDescription}
                          name={tool.name}
                          longDescription={tool.longDescription}
                          key={tool.id}
                        />
                      ))
                  : sortType === "Name" &&
                    Object.values(filteredValue)
                      .filter((tool) => tool.studentId !== decodedJwt.uid)
                      .sort((a, b) => (a.name > b.name ? 1 : -1))
                      .map((tool) => (
                        <ToolCard
                          createdOn={formatDate(tool.createdOn)}
                          id={tool.id}
                          studentId={tool.studentId}
                          theWay={tool.theWay}
                          condition={tool.condition}
                          price={tool.price}
                          shortDescription={tool.shortDescription}
                          name={tool.name}
                          longDescription={tool.longDescription}
                          key={tool.id}
                        />
                      ))}

                {!filteredValue
                  ? sortType === "Date" &&
                    Object.values(Tools)
                      .filter((tool) => tool.studentId !== decodedJwt.uid)
                      .sort(
                        (a, b) =>
                          Date.parse(b.createdOn) - Date.parse(a.createdOn)
                      )
                      .map((tool) => (
                        <ToolCard
                          createdOn={formatDate(tool.createdOn)}
                          id={tool.id}
                          studentId={tool.studentId}
                          theWay={tool.theWay}
                          condition={tool.condition}
                          price={tool.price}
                          shortDescription={tool.shortDescription}
                          name={tool.name}
                          longDescription={tool.longDescription}
                          key={tool.id}
                        />
                      ))
                  : sortType === "Date" &&
                    Object.values(filteredValue)
                      .filter((tool) => tool.studentId !== decodedJwt.uid)
                      .sort(
                        (a, b) =>
                          Date.parse(b.createdOn) - Date.parse(a.createdOn)
                      )
                      .map((tool) => (
                        <ToolCard
                          createdOn={formatDate(tool.createdOn)}
                          id={tool.id}
                          studentId={tool.studentId}
                          theWay={tool.theWay}
                          condition={tool.condition}
                          price={tool.price}
                          shortDescription={tool.shortDescription}
                          name={tool.name}
                          longDescription={tool.longDescription}
                          key={tool.id}
                        />
                      ))}

                {!filteredValue
                  ? sortType === "Price" &&
                    Object.values(Tools)
                      .filter((tool) => tool.studentId !== decodedJwt.uid)
                      .sort((a, b) => b.price - a.price)
                      .map((tool) => (
                        <ToolCard
                          createdOn={formatDate(tool.createdOn)}
                          id={tool.id}
                          studentId={tool.studentId}
                          theWay={tool.theWay}
                          condition={tool.condition}
                          price={tool.price}
                          shortDescription={tool.shortDescription}
                          name={tool.name}
                          longDescription={tool.longDescription}
                          key={tool.id}
                        />
                      ))
                  : sortType === "Price" &&
                    Object.values(filteredValue)
                      .filter((tool) => tool.studentId !== decodedJwt.uid)
                      .sort((a, b) => b.price - a.price)
                      .map((tool) => (
                        <ToolCard
                          createdOn={formatDate(tool.createdOn)}
                          id={tool.id}
                          studentId={tool.studentId}
                          theWay={tool.theWay}
                          condition={tool.condition}
                          price={tool.price}
                          shortDescription={tool.shortDescription}
                          name={tool.name}
                          longDescription={tool.longDescription}
                          key={tool.id}
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

export default ToolSection;
