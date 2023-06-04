import React from "react";
import { FaUserCircle } from "react-icons/fa";
import "./PatientCard.css";
import useComponent from "../../../../hooks/useComponent";
import usePatient from "../../../../hooks/usePatient";
import useAuth from "../../../../hooks/useAuth";

const PatientCard = ({
  userName,
  age,
  gender,
  createdOn,
  typeOfTreatment,
  id,
  userId,
}) => {
  const { setButtonCards } = useComponent();
  const { getPatientById } = usePatient();
  const { decodedJwt } = useAuth();

  return (
    <>
      <div className="patient-card-container">
        <div className="patient-card-data">
          <div className="patient-card-profile">
            <FaUserCircle className="patient-card-avatar" />
            <div className="patient-card-info">
              <div className="patient-card-name">{userName}</div>
              <div className="patient-card-role">
                {age}, {gender}
              </div>
            </div>
          </div>
          <div className="patient-card-action">
            <button
              className="btn btn-primary btn-small"
              onClick={() => {
                setButtonCards(
                  (decodedJwt.uid === userId ? true : false)
                    ? "UpdatePatient"
                    : "ViewPatient"
                );
                getPatientById(id);
              }}
            >
              {" "}
              {decodedJwt.uid === userId ? "Manage" : "View"}
            </button>
            <div className="patient-card-date">{createdOn}</div>
          </div>
        </div>
        <div className="patient-card-treatment">{typeOfTreatment}</div>
      </div>
    </>
  );
};

export default PatientCard;
