import React from "react";
import { FaUserCircle } from "react-icons/fa";
import "./HousingCard.css";
import useComponent from "../../../../hooks/useComponent";
import useAuth from "../../../../hooks/useAuth";
import useHousings from "./../../../../hooks/useHousings";

const HousingCard = ({
  userName,
  age,
  gender,
  createdOn,
  typeOfTreatment,
  id,
  userId,
}) => {
  const { setButtonCards } = useComponent();
  const { getHousingById } = useHousings();
  const { decodedJwt } = useAuth();

  return (
    <>
      <div className="housing-card-container">
        <div className="housing-card-data">
          <div className="housing-card-profile">
            <FaUserCircle className="housing-card-avatar" />
            <div className="housing-card-info">
              <div className="housing-card-name">
                app or hos • RentalPrice ₪
              </div>
              <div className="housing-card-address">Address,City, Province</div>
            </div>
          </div>
          <div className="housing-card-action">
            <button
              className="btn btn-primary btn-small"
              onClick={() => {
                setButtonCards(
                  (decodedJwt.uid === userId ? true : false)
                    ? "UpdateHousing"
                    : "ViewHousing"
                );
                getHousingById(id);
              }}
            >
              {" "}
              {decodedJwt.uid === userId ? "Manage" : "View"}
            </button>
            <div className="housing-card-date">createdOn</div>
          </div>
        </div>
        <div className="housing-card-room">
          <div className="housing-card-inroom">room type</div>
          <div className="housing-card-inroom">bedroom</div>
          <div className="housing-card-inroom">bathroom</div>
        </div>
      </div>
    </>
  );
};

export default HousingCard;
