import { useEffect, useMemo, useState } from "react";
import useComponent from "../../../../hooks/useComponent";
import useRides from "../../../../hooks/useRides";
import "./RideView.css";
import useLoader from "../../../../hooks/useLoader";
import { TbCrown } from "react-icons/tb";
import { BsTable } from "react-icons/bs";

import useChat from "../../../../hooks/useChat";
import useAuth from "../../../../hooks/useAuth";
import useLocation from "../../../../hooks/useLocation";
import { useNavigate } from "react-router-dom";
import ShowSchedule from "./show_schedule/ShowSchedule";

const RideView = () => {
  let navigate = useNavigate();

  const { setButtonCards, setOptionMenu, setOwnerItem } = useComponent();
  const { Ride, setRide, getTimeSlot, TimeSlot,setTimeSlot } = useRides();
  const { reJoinRoom } = useChat();
  const { FormRideLoader } = useLoader();
  const { decodedJwt } = useAuth();
  const { Location, getLocationById } = useLocation();
  const [date, setDate] = useState();
  const [nowLocation, setNowLocation] = useState("");
  const [ShowScheduleState, setShowScheduleState] = useState("");

  // State Hook
  const [ride, setRideBo] = useState({ timeSlots: [] });
  const [days, setDay] = useState([]);

  useMemo(() => {
    if (TimeSlot) {
      // Add the days from TimeSlot to the days array
      const timeSlotDays = TimeSlot.map((slot) => slot.day);
      setDay(() => [ ...timeSlotDays]);
    }
  }, [TimeSlot]);
  useEffect(() => {
    if (Ride) {
      setRideBo((prevRide) => ({
        ...prevRide,
        ...Ride,
        id: !Ride.isDeleted ? Ride.id : 0,
        timeSlots:
          Ride.isDeleted && Array.isArray(TimeSlot)
            ? TimeSlot.map((slot) => ({
                ...slot,
                id: 0,
              }))
            : TimeSlot,
        isDeleted: Ride.isDeleted,
        ...(Ride.isDeleted
          ? {}
          : {
              createdBy: Ride.createdBy,
              createdOn: Ride.createdOn,
              modifiedBy: Ride.modifiedBy,
              modifiedOn: Ride.modifiedOn,
            }),
      }));
    }
    // eslint-disable-next-line
  }, [Ride, TimeSlot]);
  useMemo(() => {
    const d = new Date(Date.parse(Ride.createdOn));
    setDate(d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getUTCDate());
  }, [Ride]);

  useEffect(() => {
    if (Ride.locationId) getLocationById(Ride.locationId);
    if (Ride) getTimeSlot(Ride.id);
  }, [Ride]);
  useMemo(() => {
    setNowLocation(Location);
  }, [Location]);
  useEffect(() => {
    return function cleanup() {
      setButtonCards("");
      setTimeSlot("")
      setRide("");
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {ShowScheduleState && (
        <ShowSchedule
          setShowScheduleState={setShowScheduleState}
          ride={ride}
          TimeSlot={TimeSlot}
          setTimeSlot={setTimeSlot}
          getTimeSlot={getTimeSlot}
          days={days}
          setDay={setDay}
        />
      )}
      <div
        style={{
          opacity: ShowScheduleState ? 0.2 : 1,
        }}
      >
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
            {" "}
            <div
              onClick={() => setShowScheduleState(true)}
              className="step-title-show-schedule"
            >
              Show The Schedule{" "}<BsTable/>
            </div>
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
      </div>
    </div>
  );
};

export default RideView;
