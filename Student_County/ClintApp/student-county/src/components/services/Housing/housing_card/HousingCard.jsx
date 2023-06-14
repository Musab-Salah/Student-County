import React from "react";
import { FaHome } from "react-icons/fa";
import { MdApartment } from "react-icons/md";
import "./HousingCard.css";
import useComponent from "../../../../hooks/useComponent";
import useAuth from "../../../../hooks/useAuth";
import useHousings from "./../../../../hooks/useHousings";

const HousingCard = ({
  createdOn,
  id,
  studentId,
  homeType,
  rentalPrice,
  address,
  city,
  province,
  typeOfContract,
  bedRoom,
  bathRoom,
}) => {
  const { setButtonCards } = useComponent();
  const { getHousingById } = useHousings();
  const { decodedJwt } = useAuth();

  return (
    <>
      <div className="housing-card-container">
        <div className="housing-card-data">
          <div className="housing-card-profile">
            {homeType === "House" ? (
              <FaHome className="housing-card-avatar" />
            ) : (
              <MdApartment className="housing-card-avatar" />
            )}

            <div className="housing-card-info">
              <div className="housing-card-name">
                {homeType} • {rentalPrice} ₪
              </div>
              <div className="housing-card-address">
                {address},{city}, {province}
              </div>
            </div>
          </div>
          <div className="housing-card-action">
            <button
              className="btn btn-primary btn-small"
              onClick={() => {
                setButtonCards(
                  (decodedJwt.uid === studentId ? true : false)
                    ? "UpdateHousing"
                    : "ViewHousing"
                );
                getHousingById(id);
              }}
            >
              {" "}
              {decodedJwt.uid === studentId ? "Manage" : "View"}
            </button>
            <div className="housing-card-date">{createdOn}</div>
          </div>
        </div>
        <div className="housing-card-room">
          <div className="housing-card-inroom">{typeOfContract}</div>
          <div className="housing-card-inroom">{bedRoom}</div>
          <div className="housing-card-inroom">{bathRoom}</div>
        </div>
      </div>
    </>
  );
};

export default HousingCard;
