import React from "react";
import { FaHome } from "react-icons/fa";
import { MdApartment } from "react-icons/md";
import "./ToolCard.css";
import useComponent from "../../../../hooks/useComponent";
import useAuth from "../../../../hooks/useAuth";
import useTools from "../../../../hooks/useTools";

const ToolCard = ({
  createdOn,
  id,
  studentId,
  theWay,
  condition,
  price,
  shortDescription,
}) => {
  const { setButtonCards } = useComponent();
  const { getToolById } = useTools();
  const { decodedJwt } = useAuth();

  return (
    <>
      <div className="tool-card-container">
        <div className="tool-card-data">
          <div className="tool-card-profile">
            <div className="tool-card-info">
              <div className="tool-card-name">{price} ₪</div>
              <div className="tool-card-address">{shortDescription}</div>
            </div>
          </div>
          <div className="tool-card-action">
            <button
              className="btn btn-primary btn-small"
              onClick={() => {
                setButtonCards(
                  (decodedJwt.uid === studentId ? true : false)
                    ? "UpdateTool"
                    : "ViewTool"
                );
                getToolById(id);
              }}
            >
              {" "}
              {decodedJwt.uid === studentId ? "Manage" : "View"}
            </button>
            <div className="tool-card-date">{createdOn}</div>
          </div>
        </div>
        <div className="tool-card-room">
          <div className="tool-card-inroom">{theWay}</div>
          <div className="tool-card-inroom">{condition}</div>
        </div>
      </div>
    </>
  );
};

export default ToolCard;
