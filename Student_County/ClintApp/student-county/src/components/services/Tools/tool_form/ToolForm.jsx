import { useState, useEffect, useMemo } from "react";
import useComponent from "../../../../hooks/useComponent";
import { RiArrowDownSLine } from "react-icons/ri";
import { AiFillExclamationCircle } from "react-icons/ai";
import DialogConfirmation from "../../../dialog_confirmation/DialogConfirmation";
import "./ToolForm.css";
import useLoader from "../../../../hooks/useLoader";
import useTools from "../../../../hooks/useTools";

const ToolForm = () => {
  const { setButtonCards, ButtonCards } = useComponent();
  const { ToolsSuccess, createTool, ToolError, updateTool, Tool, setTool } =
    useTools();
  // State Hook
  const [name, setName] = useState("");
  const [deleteDialogState, setDeleteDialogState] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [price, setPrice] = useState("");
  const [theWay, setTheWay] = useState("");
  const [condition, setCondition] = useState("");
  const [tool, setToolBo] = useState({});
  const { FormToolLoader, ButtonsFormToolLoader, DeleteButtonsFormToolLoader } =
    useLoader();

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
  }, [showDropdownTheWay, showDropdownCondition]);

  useMemo(() => {
    setName(Tool.name);
    setShortDescription(Tool.shortDescription);
    setLongDescription(Tool.longDescription);
    setPrice(Tool.price);
    setTheWay(Tool.theWay);
    setCondition(Tool.condition);
    setToolBo({
      ...tool,
      studentId: Tool.studentId,
      id: Tool.id,
      name: Tool.name,
      shortDescription: Tool.shortDescription,
      longDescription: Tool.longDescription,
      price: Tool.price,
      theWay: Tool.theWay,
      condition: Tool.condition,
    });
    // eslint-disable-next-line
  }, [Tool]);
  useMemo(() => {
    if (ToolsSuccess) {
      sleep(2000).then(() => {
        setButtonCards("");
      });
    }
    // eslint-disable-next-line
  }, [ToolsSuccess]);

  useEffect(() => {
    return function cleanup() {
      setButtonCards("");
      setTool("");
    };
    // eslint-disable-next-line
  }, []);

  const handleTheWayChange = (value) => {
    setToolBo({
      ...tool,
      theWay: value,
    });
    setTheWay(value);
    setTheWayError(false);
    setShowDropdownTheWay(false);
  };
  const handleTheConditionChange = (value) => {
    setToolBo({
      ...tool,
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
      setToolBo({
        ...tool,
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
      setToolBo({
        ...tool,
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
      setToolBo({
        ...tool,
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
      setToolBo({
        ...tool,
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
    if (!theWay) setTheWayError("Please enter the way you want");
    if (!condition) setConditionError("Please enter the condition");
    if (theWay && condition && ButtonCards === "UpdateTool")
      updateTool(Tool.id, tool);
    else if (theWay && condition && ButtonCards === "CreateTool")
      createTool(tool);
  };
  return (
    <>
      {deleteDialogState && (
        <DialogConfirmation
          setDeleteDialogState={setDeleteDialogState}
          id={Tool.id}
          serviceName={Tool.serviceName}
        />
      )}
      <div style={{ opacity: deleteDialogState ? 0.2 : 1 }}>
        <div className="create-section">
          <div
            className="container-load-form"
            style={{ display: FormToolLoader ? "block" : "none" }}
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
            style={{ display: FormToolLoader ? "none" : "flex" }}
            className="form-create"
            onSubmit={handleSubmit}
          >
            <div className="form-input-container">
              <div className="input-container">
                <input
                  maxLength={40}
                  type="text"
                  name="name"
                  defaultValue={name ? name : tool.name}
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
                    shortDescription ? shortDescription : tool.shortDescription
                  }
                  onChange={handleShortDescription}
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
              <div className="input-container textarea-input">
                <textarea
                  maxLength={300}
                  type="text"
                  defaultValue={
                    longDescription ? longDescription : tool.longDescription
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
                  defaultValue={price ? price : tool.price}
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
                {ButtonCards === "UpdateTool" ? (
                  <button type="submit" className={`btn btn-primary `}>
                    <div
                      className="loader"
                      style={{
                        display: ButtonsFormToolLoader ? "block" : "none",
                      }}
                    />
                    Update
                  </button>
                ) : (
                  <button type="submit" className={`btn btn-primary `}>
                    <div
                      className="loader"
                      style={{
                        display: ButtonsFormToolLoader ? "block" : "none",
                      }}
                    />
                    Publish
                  </button>
                )}
                {ButtonCards === "UpdateTool" ? (
                  <button onClick={handleDelete} className={`btn btn-primary `}>
                    <div
                      className="loader"
                      style={{
                        display: DeleteButtonsFormToolLoader ? "block" : "none",
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
              {ToolError && (
                <span className="wrong-info">
                  <AiFillExclamationCircle />
                  {ToolError}
                </span>
              )}
              {ToolsSuccess && (
                <span className="success-info">
                  <AiFillExclamationCircle />
                  {ToolsSuccess}
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ToolForm;
