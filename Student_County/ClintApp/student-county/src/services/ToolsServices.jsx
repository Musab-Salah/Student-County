import axios from "../api/axios";

const TOOLS_API_BASE_URL = "/Tools";

class ToolsServices {
  getTools = async (token) =>
    await axios.get(TOOLS_API_BASE_URL + "/Index", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  getMyAllTools = async (userid, token) =>
    await axios.get(
      TOOLS_API_BASE_URL + "/GetMyAllTools?userid=" + userid,
      {
        params: {
          userid: userid,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  createTool = async (tool, token) =>
    await axios.post(TOOLS_API_BASE_URL + "/Create", tool, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  getToolById = async (toolId, token) =>
    await axios.get(TOOLS_API_BASE_URL + "/Get/" + toolId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  updateTool = async (toolId, tool, token) =>
    await axios.put(TOOLS_API_BASE_URL + "/Update/" + toolId, tool, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  deleteTool = async (toolId, token) =>
    await axios.delete(TOOLS_API_BASE_URL + "/Delete/" + toolId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
}
// eslint-disable-next-line
export default new ToolsServices();
