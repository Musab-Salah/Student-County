import React from "react";
import { FaHome } from "react-icons/fa";
import { MdApartment } from "react-icons/md";
import "./RideCard.css";
import useComponent from "../../../../hooks/useComponent";
import useAuth from "../../../../hooks/useAuth";
import useRides from "../../../../hooks/useRides";

const RideCard = ({
  createdOn,
  id,
  studentId,
  theWay,
  condition,
  price,
  shortDescription,
}) => {
  const { setButtonCards } = useComponent();
  const { getRideById } = useRides();
  const { decodedJwt } = useAuth();

  return (
    <>
      <div className="ride-card-container">
        <div className="ride-card-data">
          <div className="ride-card-profile">
            <div className="ride-card-info">
              <div className="ride-card-name"></div>
              <div className="ride-card-address">{shortDescription}</div>
            </div>
          </div>
          <div className="ride-card-action">
            <button
              className="btn btn-primary btn-small"
              onClick={() => {
                setButtonCards(
                  (decodedJwt.uid === studentId ? true : false)
                    ? "UpdateRide"
                    : "ViewRide"
                );
                getRideById(id);
              }}
            >
              {" "}
              {decodedJwt.uid === studentId ? "Manage" : "View"}
            </button>
            <div className="ride-card-date">{createdOn}</div>
          </div>
        </div>
        <div className="ride-card-room">
          <div className="ride-card-inroom">{theWay}</div>
          <div className="ride-card-inroom">{condition}</div>
        </div>
      </div>
    </>
  );
};

export default RideCard;
