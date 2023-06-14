import React from "react";
import { RiContactsFill } from "react-icons/ri"
import { FaHome } from "react-icons/fa"
import { BsHouseGearFill } from "react-icons/bs"

const StepForm = ({ currentStep }) => {
  return (
      <div className="steps-container">
        <div className="step-line" />
        <div className={`step ${currentStep === 1 ? "step-active" : ""}`}>
          <div className="step-icon-container">
            <RiContactsFill className="step-icon" />
          </div>
          <div className="step-title">Contact Info</div>
        </div>
        <div className="step-line" />
        <div className={`step ${currentStep === 2 ? "step-active" : ""}`}>
          <div className="step-icon-container">
            <BsHouseGearFill className="step-icon" />
          </div>
          <div className="step-title">Home Info</div>
        </div>
        <div className="step-line" />
        <div className={`step ${currentStep === 3 ? "step-active" : ""}`}>
          <div className="step-icon-container">
            <FaHome className="step-icon" />
          </div>
          <div className="step-title">Home Description</div>
        </div>
        <div className="step-line" />
      </div>
  );
};

export default StepForm;
