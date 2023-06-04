import React, { useEffect } from "react";
import "./PatientView.css";
import { FaUserCircle } from "react-icons/fa";
import useLoader from "../../../../hooks/useLoader";
import usePatient from "../../../../hooks/usePatient";
import useComponent from "../../../../hooks/useComponent";
import useAuth from "../../../../hooks/useAuth";
import useChat from "../../../../hooks/useChat";

const PatientView = () => {
  const { FormPatientLoader } = useLoader();
  const { setButtonCards, setOptionMenu, setOwnerItem } = useComponent();
  const { reJoinRoom } = useChat();
  const { decodedJwt } = useAuth();
  const { Patient, setPatient } = usePatient();
  useEffect(() => {
    return function cleanup() {
      setButtonCards("");
      setPatient("");
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div
        className="container-load-form"
        style={{ display: FormPatientLoader ? "block" : "none" }}
      >
        <div className="block-load-form"></div>
        <div className="block-load-form"></div>
        <div className="block-load-form"></div>
        <div className="block-load-form"></div>
        <div className="block-load-form"></div>
        <div className="block-load-form"></div>
        <div className="block-load-form"></div>
        <div className="block-load-form"></div>
        <div className="block-load-form"></div>
        <div className="block-load-form"></div>
        <div className="block-load-form"></div>
        <div className="block-load-form"></div>
        <div className="block-load-form"></div>
        <div className="block-load-form"></div>
        <div className="block-load-form"></div>
        <div className="block-load-form"></div>
      </div>
      <div
        className="patient-view "
        style={{ display: FormPatientLoader ? "none" : "flex" }}
      >
        <div className="patient-top-info-container">
          <div className="patient-profile">
            <FaUserCircle className="patient-avatar-icon" />
            <div className="patient-name">{Patient.userName}</div>
          </div>
          {/* <BsInfoCircle className="btn btn-primary btn-icon" alt="" /> */}
        </div>
        <div className="vertical-line" />
        <div className="patient-info-container">
          <div className="patient-info">
            <div className="patient-info-title">Patient Info:</div>
            <div className="patient-info-items">
              <div className="patient-info-item">
                <div className="patient-info-item-title">Full Name</div>
                <div className="patient-info-item-value">
                  {Patient.userName}
                </div>
              </div>
              <div className="patient-info-item">
                <div className="patient-info-item-title">Age</div>
                <div className="patient-info-item-value">{Patient.age}</div>
              </div>
              <div className="patient-info-item">
                <div className="patient-info-item-title">Address</div>
                <div className="patient-info-item-value">{Patient.address}</div>
              </div>
              <div className="patient-info-item">
                <div className="patient-info-item-title">Phone Number</div>
                <div className="patient-info-item-value">
                  {Patient.phoneNumber}
                </div>
              </div>
              <div className="patient-info-item">
                <div className="patient-info-item-title">National id</div>
                <div className="patient-info-item-value">
                  {Patient.nationalIdNumber}
                </div>
              </div>
              <div className="patient-info-item">
                <div className="patient-info-item-title">Gender</div>
                <div className="patient-info-item-value">{Patient.gender}</div>
              </div>
            </div>
          </div>
          <div className="patient-info">
            <div className="patient-info-title">Medical Status:</div>
            <div className="patient-info-items">
              <div className="patient-info-item">
                <div className="patient-info-item-title">Type OF TREATMENT</div>
                <div className="patient-info-item-value">
                  {Patient.typeOfTreatment}
                </div>
              </div>
              <div className="patient-info-item">
                <div className="patient-info-item-title">SENSITIVITY</div>
                <div className="patient-info-item-value">
                  {Patient.sensitivity}
                </div>
              </div>
              <div className="patient-info-item">
                <div className="patient-info-item-title">CURRENT illnesses</div>
                <div className="patient-info-item-value">
                  {Patient.currentIllnesses}
                </div>
              </div>
              <div className="patient-info-item">
                <div className="patient-info-item-title">Current T.M</div>
                <div className="patient-info-item-value">
                  {Patient.currentlyUsedMedicines}
                </div>
              </div>
              {Patient.additionalInformation ? (
                <div className="patient-info-item">
                  <div className="patient-info-item-title">
                    Additional Information
                  </div>
                  <div className="patient-info-item-value">
                    {Patient.additionalInformation}
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
              reJoinRoom(decodedJwt.uid, Patient.userId);
              setOwnerItem(Patient.userId);
              setOptionMenu("Chat");
              setButtonCards("");
            }}
            className="btn btn-primary btn-fill"
          >
            Contact The Patient
          </button>
          <button
            onClick={() => setButtonCards("")}
            className="btn btn-secondary btn-fill"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default PatientView;
