import React, { useEffect } from "react";
import "./HousingView.css";
import { FaHome, FaUserCircle } from "react-icons/fa";
import useLoader from "../../../../hooks/useLoader";
import useComponent from "../../../../hooks/useComponent";
import useAuth from "../../../../hooks/useAuth";
import useChat from "../../../../hooks/useChat";
import useHousings from "../../../../hooks/useHousings";
import { MdApartment } from "react-icons/md";

const HousingView = () => {
  const { FormHousingLoader } = useLoader();
  const { setButtonCards, setOptionMenu, setOwnerItem } = useComponent();
  const { reJoinRoom } = useChat();
  const { decodedJwt } = useAuth();
  const { Housing, setHousing } = useHousings();
  useEffect(() => {
    return function cleanup() {
      setButtonCards("");
      setHousing("");
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="housing-section">
        <div
          className="container-load-form"
          style={{ display: FormHousingLoader ? "block" : "none" }}
        >
          {[...Array(16)].map((_, index) => (
            <div key={index} className="block-load-form"></div>
          ))}
        </div>
        <div
          className="housing-view "
          style={{ display: FormHousingLoader ? "none" : "flex" }}
        >
          <div className="housing-top-info-container">
            <div className="housing-profile">
              {Housing.homeType === "House" ? (
                <FaHome className="housing-card-avatar" />
              ) : (
                <MdApartment className="housing-card-avatar" />
              )}{" "}
              <div className="housing-name">{Housing.userName}</div>
            </div>
            <div className="housing-info-title">{Housing.rentalPrice}₪</div>
          </div>
          <div className="vertical-line" />
          <div className="housing-info-container">
            <div className="housing-info">
              <div className="housing-info-title">Contact Info:</div>
              <div className="housing-info-items">
                <div className="housing-info-item">
                  <div className="housing-info-item-title">Full Name</div>
                  <div className="housing-info-item-value">
                    {Housing.studentName}
                  </div>
                </div>

                <div className="housing-info-item">
                  <div className="housing-info-item-title">Phone Number</div>
                  <div className="housing-info-item-value">
                    {Housing.phoneNumber}
                  </div>
                </div>

                <div className="housing-info-item">
                  <div className="housing-info-item-title">Gender</div>
                  <div className="housing-info-item-value">
                    {Housing.gender}
                  </div>
                </div>
              </div>
            </div>
            <div className="housing-info">
              <div className="housing-info-title">House Info:</div>
              <div className="housing-info-items">
                <div className="housing-info-item">
                  <div className="housing-info-item-title">Address</div>
                  <div className="housing-info-item-value">
                    {Housing.address},{Housing.city}, {Housing.province}
                  </div>
                </div>
                <div className="housing-info-item">
                  <div className="housing-info-item-title">RentalPrice</div>
                  <div className="housing-info-item-value">
                    {Housing.rentalPrice} {Housing.furnishings}
                  </div>
                </div>
                <div className="housing-info-item">
                  <div className="housing-info-item-title">Room Type</div>
                  <div className="housing-info-item-value">
                    {Housing.roomType}
                  </div>
                </div>
                <div className="housing-info-item">
                  <div className="housing-info-item-title">BedRoom</div>
                  <div className="housing-info-item-value">
                    {Housing.bedRoom}
                  </div>
                </div>{" "}
                <div className="housing-info-item">
                  <div className="housing-info-item-title">BathRoom</div>
                  <div className="housing-info-item-value">
                    {Housing.bathRoom}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="btns">
            <button
              onClick={() => {
                reJoinRoom(decodedJwt.uid, Housing.studentId);
                setOwnerItem(Housing.userId);
                setOptionMenu("Chat");
                setButtonCards("");
              }}
              className="btn btn-primary btn-fill"
            >
              Contact The with owner
            </button>
            <button
              onClick={() => setButtonCards("")}
              className="btn btn-secondary btn-fill"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HousingView;