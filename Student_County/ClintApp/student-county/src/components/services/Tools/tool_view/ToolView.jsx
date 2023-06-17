import { useEffect, useMemo, useState } from "react";
import useComponent from "../../../../hooks/useComponent";
import useTools from "../../../../hooks/useTools";
import "./ToolView.css";
import useLoader from "../../../../hooks/useLoader";
import ChatController from "../../../chat/ChatController";
import { TbCrown } from "react-icons/tb";
import useChat from "../../../../hooks/useChat";
import useAuth from "../../../../hooks/useAuth";

const ToolView = () => {
  const { setButtonCards, setOpenChatArea, setOptionMenu, setOwnerItem } =
    useComponent();
  const { Tool, setTool } = useTools();
  const { reJoinRoom, setChatOpened } = useChat();
  const { FormToolLoader } = useLoader();
  const { decodedJwt } = useAuth();
  const [date, setDate] = useState();
  // State Hook
  useMemo(() => {
    const d = new Date(Date.parse(Tool.createdOn));
    setDate(d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getUTCDate());
  }, [Tool]);

  useEffect(() => {
    return function cleanup() {
      setButtonCards("");
      setTool("");
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="create-section">
        <div
            className="container-load-form"
            style={{ display: FormToolLoader ? "block" : "none" }}
          >
            {[...Array(16)].map((_, index) => (
              <div key={index} className="block-load-form"></div>
            ))}
        </div>
        <div
          className="form-create-view"
          style={{ display: FormToolLoader ? "none" : "flex" }}
        >
          <div className="section-view">
            <div className="tool-image-container">
              <div className="tool-image" />
              <div className="tool-owner">
                <TbCrown className="tool-owner-icon" />
                <div className="tool-owner-name">{Tool.studentName}</div>
              </div>
            </div>
            <div className="tool-info">
              <div className="tool-main-info-container">
                <div className="tool-main-info">
                  <div className="title-tool-name">{Tool.name}</div>
                  <div className="price-field">
                    {Tool.price === 0 ? "Free" : `₪${Tool.price}`}
                  </div>
                </div>
                <div className="description-tool-view">
                  {Tool.longDescription}
                </div>
              </div>
              <div className="tool-additional-info-container">
                <div className="tool-additional-info">{Tool.condition}</div>
                <div className="tool-additional-info">{Tool.university}</div>
                <div className="tool-additional-info">{date}</div>
              </div>
              <div className="buttons">
                <button
                  onClick={() => {
                    reJoinRoom(decodedJwt.uid, Tool.studentId);
                    setOwnerItem(Tool.studentId);
                    setOptionMenu("Chat");
                    // setOpenChatArea(true);
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

export default ToolView;
