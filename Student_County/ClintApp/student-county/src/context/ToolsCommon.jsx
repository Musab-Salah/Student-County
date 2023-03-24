import React, { createContext, useEffect, useState } from "react";
import ToolsServices from "../services/ToolsServices";
import useAuth from "../hooks/useAuth";

const ToolsCxt = createContext();

export function ToolsProvider({ children }) {
  const { decodedJwt } = useAuth();

  const [Tools, setTools] = useState([]);
  const [ToolsError, setError] = useState();
  const [Tool, setTool] = useState("Loading");

  const [ToolBo] = useState({
    id: "0",
    emptySeats: "",
    carDescription: "",
    studentId: "",
    destinationId: "",
  });

  useEffect(() => {
    //getToolss();
  }, []);
  const getTools = () => {
    ToolsServices.getTools()
      .then((res) => {
        setTools(res.data);
        setError(null);
      })
      .catch(() => setError("Failed bring the Tools..."));
  };

  const createTool = (Bo) => {
    Bo.studentId = decodedJwt.uid;
    ToolsServices.createTool(Bo)
      .then((res) => {
        setTool(res.data);
        setError(null);
      })
      .catch(() => setError("Failed create the Tool..."));
  };

  const getToolById = (id) => {
    ToolsServices.getToolById(id)
      .then((res) => {
        setTool(res.data);
        setError(null);
      })
      .catch(() => setError("Failed bring the Tool..."));
  };

  const updateTool = (id, Bo) => {
    ToolsServices.updateTool(id, Bo)
      .then((res) => {
        setTool(res.data);
        setError(null);
      })
      .catch(() => setError("Failed update the Tool..."));
  };

  const deleteTool = (id) => {
    ToolsServices.deleteTool(id)
      .then((res) => {
        setTool(res.data);
        setError(null);
      })
      .catch(() => setError("Failed delete the Tool..."));
  };

  return (
    <ToolsCxt.Provider
      value={{
        Tools,
        Tool,
        ToolBo,
        ToolsError,
        getToolById,
        getTools,
        createTool,
        updateTool,
        deleteTool,
      }}
    >
      {children}
    </ToolsCxt.Provider>
  );
}

export default ToolsCxt;
