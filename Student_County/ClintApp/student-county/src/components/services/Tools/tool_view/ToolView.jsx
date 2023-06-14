import React, { useEffect } from "react";
import "./ToolView.css";
import { FaUserCircle } from "react-icons/fa";
import useLoader from "../../../../hooks/useLoader";
import useComponent from "../../../../hooks/useComponent";
import useAuth from "../../../../hooks/useAuth";
import useChat from "../../../../hooks/useChat";
import useTools from "../../../../hooks/useTools";

const ToolView = () => {
  const { FormToolLoader } = useLoader();
  const { setButtonCards, setOptionMenu, setOwnerItem } = useComponent();
  const { reJoinRoom } = useChat();
  const { decodedJwt } = useAuth();
  const { Tool, setTool } = useTools();
  useEffect(() => {
    return function cleanup() {
      setButtonCards("");
      setTool("");
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="tool-section">
        <div
          className="container-load-form"
          style={{ display: FormToolLoader ? "block" : "none" }}
        >
          {[...Array(16)].map((_, index) => (
            <div key={index} className="block-load-form"></div>
          ))}
        </div>
        <div
          className="tool-view "
          style={{ display: FormToolLoader ? "none" : "flex" }}
        >
          <div className="tool-top-info-container">
            <div className="tool-profile">
              <FaUserCircle className="tool-avatar-icon" />
              <div className="tool-name">{Tool.name}</div>
            </div>
            {/* <BsInfoCircle className="btn btn-primary btn-icon" alt="" /> */}
          </div>
          <div className="vertical-line" />
          <div className="tool-info-container">
            <div className="tool-info">
              <div className="tool-info-title">Tool Info:</div>
              <div className="tool-info-items">
                <div className="tool-info-item">
                  <div className="tool-info-item-title">Full Name</div>
                  <div className="tool-info-item-value">
                    {Tool.userName}
                  </div>
                </div>
                <div className="tool-info-item">
                  <div className="tool-info-item-title">Age</div>
                  <div className="tool-info-item-value">{Tool.age}</div>
                </div>
                <div className="tool-info-item">
                  <div className="tool-info-item-title">Address</div>
                  <div className="tool-info-item-value">
                    {Tool.address}
                  </div>
                </div>
                <div className="tool-info-item">
                  <div className="tool-info-item-title">Phone Number</div>
                  <div className="tool-info-item-value">
                    {Tool.phoneNumber}
                  </div>
                </div>
                <div className="tool-info-item">
                  <div className="tool-info-item-title">National id</div>
                  <div className="tool-info-item-value">
                    {Tool.nationalIdNumber}
                  </div>
                </div>
                <div className="tool-info-item">
                  <div className="tool-info-item-title">Gender</div>
                  <div className="tool-info-item-value">
                    {Tool.gender}
                  </div>
                </div>
              </div>
            </div>
            <div className="tool-info">
              <div className="tool-info-title">Medical Status:</div>
              <div className="tool-info-items">
                <div className="tool-info-item">
                  <div className="tool-info-item-title">
                    Type OF TREATMENT
                  </div>
                  <div className="tool-info-item-value">
                    {Tool.typeOfTreatment}
                  </div>
                </div>
                <div className="tool-info-item">
                  <div className="tool-info-item-title">SENSITIVITY</div>
                  <div className="tool-info-item-value">
                    {Tool.sensitivity}
                  </div>
                </div>
                <div className="tool-info-item">
                  <div className="tool-info-item-title">
                    CURRENT illnesses
                  </div>
                  <div className="tool-info-item-value">
                    {Tool.currentIllnesses}
                  </div>
                </div>
                <div className="tool-info-item">
                  <div className="tool-info-item-title">Current T.M</div>
                  <div className="tool-info-item-value">
                    {Tool.currentlyUsedMedicines}
                  </div>
                </div>
                {Tool.additionalInformation ? (
                  <div className="tool-info-item">
                    <div className="tool-info-item-title">
                      Additional Information
                    </div>
                    <div className="tool-info-item-value">
                      {Tool.additionalInformation}
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
                reJoinRoom(decodedJwt.uid, Tool.userId);
                setOwnerItem(Tool.userId);
                setOptionMenu("Chat");
                setButtonCards("");
              }}
              className="btn btn-primary btn-fill"
            >
              Contact The Tool
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

export default ToolView;
