import { useEffect, useMemo, useState } from "react";

import "./ShowSchedule.css";
import { CgCloseO } from "react-icons/cg";
const ShowSchedule = ({
  setShowScheduleState,
  ride,
  TimeSlot,
  setTimeSlot,
  getTimeSlot,
  days,
  setDay,
}) => {
  useEffect(() => {
    if (ride) getTimeSlot(ride.id);
  }, []);
  useEffect(() => {
    return function cleanup() {
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="create-section">
      <div className="show-schedule-container">
        <div className="show-schedule-view">
          <CgCloseO
            onClick={() => setShowScheduleState(false)}
            className="input-selected-icon-show-schedule"
          />
          <div className="input-group-day-view">
            {days.map((day, index) => (
              <div key={index}>
                <div className="input-container-group-time">
                  <div className="input-title">{day}:</div>{" "}
                  <input
                    disabled
                    className="input-time-show-schedule"
                    type="time"
                    id={`timeToGo-${index}`}
                    name="timeToGo"
                    defaultValue={
                      ride.timeSlots.find((slot) => slot.day === day)?.timeToGo
                    }
                  />
                  <div className="form-paragraph">Time To Go</div>
                  <div className="input-container-group-time">
                    <input
                      disabled
                      className="input-time-show-schedule"
                      type="time"
                      id={`timeToLeave-${index}`}
                      name="timeToLeave"
                      defaultValue={
                        ride.timeSlots.find((slot) => slot.day === day)
                          ?.timeToLeave
                      }
                    />
                    <div className="form-paragraph">Time To Leave</div>
                  </div>
                </div>
                <div className="vertical-line" />
              </div>
            ))}
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default ShowSchedule;
