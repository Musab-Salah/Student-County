import ToolCard from "../tool_card/ToolCard";
import useTools from "../../../../hooks/useTools";
import { useEffect, useMemo, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import "./ToolSection.css";
import { Helmet } from "react-helmet";
import useLoader from "../../../../hooks/useLoader";

const ToolSection = ({ filteredValue }) => {
  const { Tools, getTools, Success, setTool } = useTools();
  const { ToolLoader } = useLoader();
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
    getTools();
    // eslint-disable-next-line
  }, [Success]);
  useEffect(() => {
    return function cleanup() {
      setTool("");
    };
    // eslint-disable-next-line
  }, []);
  const handleSortChange = (sort) => {
    setSortType(sort);
    setShowDropdownSort(false);
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
              Object.values(Tools).map((tool) => (
                <ToolCard
                  createdOn={formatDate(tool.createdOn)}
                  id={tool.id}
                  studentId={tool.studentId}
                  theWay={tool.theWay}
                  condition={tool.condition}
                  price={tool.price}
                  shortDescription={tool.shortDescription}
                />
              ))
            : !sortType &&
              Object.values(filteredValue).map((tool) => (
                <ToolCard
                  createdOn={formatDate(tool.createdOn)}
                  id={tool.id}
                  studentId={tool.studentId}
                  theWay={tool.theWay}
                  condition={tool.condition}
                  price={tool.price}
                  shortDescription={tool.shortDescription}
                />
              ))}
          {!filteredValue
            ? sortType === "Name" &&
              Object.values(Tools)
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
                  />
                ))
            : sortType === "Name" &&
              Object.values(filteredValue)
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
                  />
                ))}
          {!filteredValue
            ? sortType === "Date" &&
              Object.values(Tools)
                .sort(
                  (a, b) => Date.parse(b.createdOn) - Date.parse(a.createdOn)
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
                  />
                ))
            : sortType === "Date" &&
              Object.values(filteredValue)
                .sort(
                  (a, b) => Date.parse(b.createdOn) - Date.parse(a.createdOn)
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
                  />
                ))}
          {!filteredValue
            ? sortType === "Price" &&
              Object.values(Tools)
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
                  />
                ))
            : sortType === "Price" &&
              Object.values(filteredValue)
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
                  />
                ))}
        </div>
      </div>
    </>
  );
};

export default ToolSection;
