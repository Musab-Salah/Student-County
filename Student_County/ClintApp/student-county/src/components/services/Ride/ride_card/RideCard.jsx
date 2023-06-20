import React, { useEffect, useMemo, useState } from "react";
import "./RideCard.css";
import useComponent from "../../../../hooks/useComponent";
import useAuth from "../../../../hooks/useAuth";
import useRides from "../../../../hooks/useRides";
import useLocation from "../../../../hooks/useLocation";
import { IoCarOutline } from "react-icons/io5";

const RideCard = ({
  createdOn,
  id,
  studentId,
  longDescription,
  locationId,
  carDescription,
  emptySeats,
  gender,
}) => {
  const { setButtonCards } = useComponent();
  const { Location, getLocationById } = useLocation();
  const { getRideById } = useRides();
  const { decodedJwt } = useAuth();
  const [nowLocation, setNowLocation] = useState("");
  const maxLength = 20;

  if (longDescription.length > maxLength) {
    const truncatedText = longDescription.substring(0, maxLength) + "...";
    longDescription = truncatedText;
  }
  useEffect(() => {
    if (locationId) getLocationById(locationId);
  }, [locationId]);
  useMemo(() => {
    setNowLocation(Location);
  }, [Location]);
  return (
    <>
      <div className="ride-card-container">
        <div className="ride-card-data">
          <div className="ride-card-profile">
            <IoCarOutline className="housing-card-avatar" />
            <div className="ride-card-info">
              <div className="ride-card-name">{carDescription}</div>
              <div className="ride-card-address">{longDescription}</div>
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
          <div className="ride-card-inroom">
            {nowLocation.cityName ? nowLocation.cityName : ""}
            {" , "} {nowLocation.townName ? nowLocation.townName : ""}
          </div>

          <div className="ride-card-inroom">
            Have {emptySeats} Seats Available
          </div>
          <div className="ride-card-inroom">{gender}</div>
        </div>
      </div>
    </>
  );
};

export default RideCard;
