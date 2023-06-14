import React, { useEffect } from "react";
import "./RideView.css";
import { FaUserCircle } from "react-icons/fa";
import useLoader from "../../../../hooks/useLoader";
import useComponent from "../../../../hooks/useComponent";
import useAuth from "../../../../hooks/useAuth";
import useChat from "../../../../hooks/useChat";
import useRides from "../../../../hooks/useRides";

const RideView = () => {
  const { FormRideLoader } = useLoader();
  const { setButtonCards, setOptionMenu, setOwnerItem } = useComponent();
  const { reJoinRoom } = useChat();
  const { decodedJwt } = useAuth();
  const { Ride, setRide } = useRides();
  useEffect(() => {
    return function cleanup() {
      setButtonCards("");
      setRide("");
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="ride-section">
        <div
          className="container-load-form"
          style={{ display: FormRideLoader ? "block" : "none" }}
        >
          {[...Array(16)].map((_, index) => (
            <div key={index} className="block-load-form"></div>
          ))}
        </div>
        <div
          className="ride-view "
          style={{ display: FormRideLoader ? "none" : "flex" }}
        >
          <div className="ride-top-info-container">
            <div className="ride-profile">
              <FaUserCircle className="ride-avatar-icon" />
              <div className="ride-name">{Ride.name}</div>
            </div>
            {/* <BsInfoCircle className="btn btn-primary btn-icon" alt="" /> */}
          </div>
          <div className="vertical-line" />
          <div className="ride-info-container">
            <div className="ride-info">
              <div className="ride-info-title">Ride Info:</div>
              <div className="ride-info-items">
                <div className="ride-info-item">
                  <div className="ride-info-item-title">Full Name</div>
                  <div className="ride-info-item-value">
                    {Ride.userName}
                  </div>
                </div>
                <div className="ride-info-item">
                  <div className="ride-info-item-title">Age</div>
                  <div className="ride-info-item-value">{Ride.age}</div>
                </div>
                <div className="ride-info-item">
                  <div className="ride-info-item-title">Address</div>
                  <div className="ride-info-item-value">
                    {Ride.address}
                  </div>
                </div>
                <div className="ride-info-item">
                  <div className="ride-info-item-title">Phone Number</div>
                  <div className="ride-info-item-value">
                    {Ride.phoneNumber}
                  </div>
                </div>
                <div className="ride-info-item">
                  <div className="ride-info-item-title">National id</div>
                  <div className="ride-info-item-value">
                    {Ride.nationalIdNumber}
                  </div>
                </div>
                <div className="ride-info-item">
                  <div className="ride-info-item-title">Gender</div>
                  <div className="ride-info-item-value">
                    {Ride.gender}
                  </div>
                </div>
              </div>
            </div>
            <div className="ride-info">
              <div className="ride-info-title">Medical Status:</div>
              <div className="ride-info-items">
                <div className="ride-info-item">
                  <div className="ride-info-item-title">
                    Type OF TREATMENT
                  </div>
                  <div className="ride-info-item-value">
                    {Ride.typeOfTreatment}
                  </div>
                </div>
                <div className="ride-info-item">
                  <div className="ride-info-item-title">SENSITIVITY</div>
                  <div className="ride-info-item-value">
                    {Ride.sensitivity}
                  </div>
                </div>
                <div className="ride-info-item">
                  <div className="ride-info-item-title">
                    CURRENT illnesses
                  </div>
                  <div className="ride-info-item-value">
                    {Ride.currentIllnesses}
                  </div>
                </div>
                <div className="ride-info-item">
                  <div className="ride-info-item-title">Current T.M</div>
                  <div className="ride-info-item-value">
                    {Ride.currentlyUsedMedicines}
                  </div>
                </div>
                {Ride.additionalInformation ? (
                  <div className="ride-info-item">
                    <div className="ride-info-item-title">
                      Additional Information
                    </div>
                    <div className="ride-info-item-value">
                      {Ride.additionalInformation}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="btns">
            <button
              onClick={() => {
                reJoinRoom(decodedJwt.uid, Ride.userId);
                setOwnerItem(Ride.userId);
                setOptionMenu("Chat");
                setButtonCards("");
              }}
              className="btn btn-primary btn-fill"
            >
              Contact The Ride
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

export default RideView;
