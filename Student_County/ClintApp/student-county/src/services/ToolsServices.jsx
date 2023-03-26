import axios from "../api/axios";

const TOOLS_API_BASE_URL = "/Tools";

class ToolsServices {
  async getTools() {
    return await axios.get(TOOLS_API_BASE_URL + "/Index");
  }

  async createTool(tool) {
    return await axios.post(TOOLS_API_BASE_URL + "/Create", tool);
  }

  async getToolsById(toolId) {
    return await axios.get(TOOLS_API_BASE_URL + "/Get/" + toolId);
  }

  async updateTool(toolId, tool) {
    return await axios.put(TOOLS_API_BASE_URL + "/Update/" + toolId, tool);
  }

  async deleteTool(toolId) {
    return await axios.delete(TOOLS_API_BASE_URL + "/Delete/" + toolId);
  }
}
// eslint-disable-next-line
export default new ToolsServices();
