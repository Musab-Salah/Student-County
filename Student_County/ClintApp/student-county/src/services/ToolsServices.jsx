import axios from "../api/axios";

const TOOLS_API_BASE_URL = "/Tools";

class ToolsServices {
  getTools = async () => await axios.get(TOOLS_API_BASE_URL + "/Index");

  createTool = async (tool) =>
    await axios.post(TOOLS_API_BASE_URL + "/Create", tool);

  getToolsById = async (toolId) =>
    await axios.get(TOOLS_API_BASE_URL + "/Get/" + toolId);

  updateTool = async (toolId, tool) =>
    await axios.put(TOOLS_API_BASE_URL + "/Update/" + toolId, tool);

  deleteTool = async (toolId) =>
    await axios.delete(TOOLS_API_BASE_URL + "/Delete/" + toolId);
}
// eslint-disable-next-line
export default new ToolsServices();
