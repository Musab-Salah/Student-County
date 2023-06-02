import React from 'react';
import "./PatientView.css";
import { BsInfoCircle } from 'react-icons/bs';
import { FaUserCircle } from "react-icons/fa";

const PatientView = () => {
  return (
    <div className="patient-card">
      <div className="patient-top-info-container">
        <div className="patient-profile">
          <FaUserCircle className="patient-avatar-icon" />
          <div className="patient-name">Musab Al hotaree</div>
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
              <div className="patient-info-item-value">Musab Al hotaree</div>
            </div>
            <div className="patient-info-item">
              <div className="patient-info-item-title">Age</div>
              <div className="patient-info-item-value">18 Years</div>
            </div>
            <div className="patient-info-item">
              <div className="patient-info-item-title">Address</div>
              <div className="patient-info-item-value">123 Main Street USA</div>
            </div>
            <div className="patient-info-item">
              <div className="patient-info-item-title">Phone Number</div>
              <div className="patient-info-item-value">0612345678</div>
            </div>
            <div className="patient-info-item">
              <div className="patient-info-item-title">National id</div>
              <div className="patient-info-item-value">123456789912</div>
            </div>
            <div className="patient-info-item">
              <div className="patient-info-item-title">Gender</div>
              <div className="patient-info-item-value">Male</div>
            </div>
          </div>
        </div>
        <div className="patient-info">
          <div className="patient-info-title">Medical Status:</div>
          <div className="patient-info-items">
            <div className="patient-info-item">
              <div className="patient-info-item-title">Type OF TREATMENT</div>
              <div className="patient-info-item-value">TEETH</div>
            </div>
            <div className="patient-info-item">
              <div className="patient-info-item-title">SENSITIVITY</div>
              <div className="patient-info-item-value">None</div>
            </div>
            <div className="patient-info-item">
              <div className="patient-info-item-title">CURRENT illnesses</div>
              <div className="patient-info-item-value">None</div>
            </div>
            <div className="patient-info-item">
              <div className="patient-info-item-title">Current T.M</div>
              <div className="patient-info-item-value">123456789912</div>
            </div>
            <div className="patient-info-item">
              <div className="patient-info-item-title">Additional Information</div>
              <div className="patient-info-item-value">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tristique nisi ac.</div>
            </div>
          </div>
        </div>
      </div>
      <div className="btns">
        <button className="btn btn-primary btn-fill">Contact The Patient</button>
        <button className="btn btn-secondary btn-fill">Cancel</button>
      </div>
    </div>
  );
};

export default PatientView;
