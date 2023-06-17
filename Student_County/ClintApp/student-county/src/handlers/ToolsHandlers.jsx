import React, { createContext, useState } from "react";
import ToolsServices from "../services/ToolsServices";
import useAuth from "../hooks/useAuth";

const ToolsCxt = createContext();

export function ToolsProvider({ children }) {
  const { decodedJwt, token } = useAuth();

  const [Tools, setTools] = useState([]); //all tools
  const [MyTools, setMyTools] = useState([]); //all my tools
  const [Tool, setTool] = useState("");
  const [ToolLoader, setToolLoader] = useState("");
  const [FormToolLoader, setFormToolLoader] = useState("");
  const [ButtonsFormToolLoader, setButtonsFormToolLoader] = useState("");
  const [DeleteButtonsFormToolLoader, setDeleteButtonsFormToolLoader] =
    useState("");

  const [ToolsError, setError] = useState("");
  const [Success, setSuccess] = useState("");

  const [ToolBo] = useState({
    id: "0",
    name: "",
    theWay: "",
    price: 0,
    shortDescription: "",
    longDescription: "",
    studentId: "",
  });

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const cleanupError = () =>
    sleep(5000).then(() => {
      setError("");
    });
  const cleanupSuccess = () =>
    sleep(2000).then(() => {
      setSuccess("");
    });

  const getTools = () => {
    setToolLoader(true);
    ToolsServices.getTools(token)
      .then((res) => {
        setTools(res.data);
        setError(null);
      })
      .catch(() => {
        setError("Failed bring the Tools...");
        cleanupError();
      })
      .finally(() => setToolLoader(false));
  };
  const getMyAllTools = () => {
    setToolLoader(true);

    ToolsServices.getMyAllTools(decodedJwt.uid, token)
      .then((res) => {
        setMyTools(res.data);
        setError(null);
      })
      .catch(() => setError("Failed bring the Tools..."))
      .finally(() => setToolLoader(false));
  };
  const createTool = (Bo) => {
    setButtonsFormToolLoader(true);

    Bo.studentId = decodedJwt.uid;
    ToolsServices.createTool(Bo, token)
      .then((res) => {
        setSuccess("Successfully Created The Tool.");
        cleanupSuccess();
        setError(null);
      })
      .catch(() => {
        setError("Failed create the Tool...");
        cleanupError();
      })
      .finally(() => setButtonsFormToolLoader(false));
  };

  const getToolById = (id) => {
    setFormToolLoader(true);

    ToolsServices.getToolById(id, token)
      .then((res) => {
        setTool(res.data);
        setError(null);
      })
      .catch(() => {
        setError("Failed bring the Tool...");
        cleanupError();
      })
      .finally(() => setFormToolLoader(false));
  };

  const updateTool = (id, Bo) => {
    setButtonsFormToolLoader(true);

    ToolsServices.updateTool(id, Bo, token)
      .then((res) => {
        setSuccess("Successfully Updated The Tool.");
        cleanupSuccess();
        setError(null);
      })
      .catch(() => setError("Failed update the Tool..."))
      .finally(() => setButtonsFormToolLoader(false));
  };

  const deleteTool = (id) => {
    setDeleteButtonsFormToolLoader(true);

    ToolsServices.deleteTool(id, token)
      .then((res) => {
        setTool(res.data);
        setError(null);
      })
      .catch(() => {
        setError("Failed delete the Tool...");
        cleanupError();
      })
      .finally(() => setDeleteButtonsFormToolLoader(false));
  };

  return (
    <ToolsCxt.Provider
      value={{
        Tools,
        Tool,
        ToolBo,
        ToolsError,
        Success,
        MyTools,
        getToolById,
        getTools,
        createTool,
        updateTool,
        deleteTool,
        setSuccess,
        getMyAllTools,
        setTool,
        ToolLoader,
        setToolLoader,
        FormToolLoader,
        setFormToolLoader,
        ButtonsFormToolLoader,
        setButtonsFormToolLoader,
        DeleteButtonsFormToolLoader,
        setDeleteButtonsFormToolLoader,
        setTools,
      }}
    >
      {children}
    </ToolsCxt.Provider>
  );
}

export default ToolsCxt;
