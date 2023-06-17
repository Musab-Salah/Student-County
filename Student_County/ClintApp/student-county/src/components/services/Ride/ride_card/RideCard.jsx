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
  shortDescription,
  locationId,
  carDescription,
  emptySeats,
}) => {
  const { setButtonCards } = useComponent();
  const { Location, getLocationById } = useLocation();
  const { getRideById } = useRides();
  const { decodedJwt } = useAuth();
  const [nowLocation, setNowLocation] = useState("");

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
            <IoCarOutline className="dash-nav-link-icon" />
            <div className="ride-card-info">
              <div className="ride-card-name">{carDescription}</div>
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
          <div className="ride-card-inroom">
            {nowLocation.cityName ? nowLocation.cityName : ""}
          </div>
          <div className="ride-card-inroom">
            {nowLocation.townName ? nowLocation.townName : ""}
          </div>
          <div className="ride-card-inroom">
            Have {emptySeats} Seats Available
          </div>
        </div>
      </div>
    </>
  );
};

export default RideCard;
