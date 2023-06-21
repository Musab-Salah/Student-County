import { useEffect, useMemo, useState } from "react";
import useComponent from "../../../../hooks/useComponent";
import useRides from "../../../../hooks/useRides";
import "./RideView.css";
import useLoader from "../../../../hooks/useLoader";
import { TbCrown } from "react-icons/tb";
import useChat from "../../../../hooks/useChat";
import useAuth from "../../../../hooks/useAuth";
import useLocation from "../../../../hooks/useLocation";
import { useNavigate } from "react-router-dom";

const RideView = () => {
  let navigate = useNavigate();

  const { setButtonCards, setOptionMenu, setOwnerItem } = useComponent();
  const { Ride, setRide } = useRides();
  const { reJoinRoom } = useChat();
  const { FormRideLoader } = useLoader();
  const { decodedJwt } = useAuth();
  const { Location, getLocationById } = useLocation();
  const [date, setDate] = useState();
  const [nowLocation, setNowLocation] = useState("");
  // State Hook
  useMemo(() => {
    const d = new Date(Date.parse(Ride.createdOn));
    setDate(d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getUTCDate());
  }, [Ride]);

  useEffect(() => {
    if (Ride.locationId) getLocationById(Ride.locationId);
  }, [Ride.locationId]);
  useMemo(() => {
    setNowLocation(Location);
  }, [Location]);
  useEffect(() => {
    return function cleanup() {
      setButtonCards("");
      setRide("");
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="create-section">
        <div
          className="container-load-form"
          style={{ display: FormRideLoader ? "block" : "none" }}
        >
          {[...Array(16)].map((_, index) => (
            <div key={index} className="block-load-form"></div>
          ))}
        </div>
        <div
          className="form-create-view"
          style={{ display: FormRideLoader ? "none" : "flex" }}
        >
          <div className="section-view">
            <div className="ride-image-container">
              <img
                className="ride-image"
                src="../assets/images/services/ride-view.svg"
              />
              <div className="ride-owner">
                <TbCrown className="ride-owner-icon" />
                <div className="ride-owner-name">{Ride.studentName}</div>
              </div>
            </div>
            <div className="ride-info">
              <div className="ride-main-info-container">
                <div className="ride-main-info">
                  <div className="title-ride-name">{Ride.carDescription}</div>
                  <div className="seats-field-ride">
                    Have {Ride.emptySeats} Seats Available
                  </div>
                </div>
                <div className="description-ride-view">
                  {Ride.longDescription}
                </div>
              </div>
              <div className="ride-additional-info-container">
                <div className="ride-additional-info">
                  {nowLocation.cityName}, {nowLocation.townName}
                </div>

                <div className="ride-additional-info">{date}</div>
              </div>
              <div className="buttons">
                <button
                  onClick={() => {
                    reJoinRoom(decodedJwt.uid, Ride.studentId);
                    setOwnerItem(Ride.studentId);
                    navigate("/dashboard/chat");
                    setOptionMenu("Chat");
                    setButtonCards("");
                  }}
                  className={`btn btn-primary `}
                >
                  Contact With Owner
                </button>
                <button
                  onClick={() => setButtonCards("")}
                  className={`btn btn-secondary `}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RideView;
