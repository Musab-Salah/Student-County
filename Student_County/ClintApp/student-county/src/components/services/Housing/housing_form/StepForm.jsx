import React, { useState } from "react";

const StepForm = ({ currentStep }) => {
  return (
    <div>
      <ul>
        <li className={`step ${currentStep === 1 ? "code to active css for icon" : ""}`}></li>
      </ul>
    </div>
  );
};

export default StepForm;
