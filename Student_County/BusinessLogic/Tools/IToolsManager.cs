using Student_County.BusinessLogic.Ride;
using Student_County.DAL;

namespace Student_County.BusinessLogic.Tools
{
    public interface IToolsManager
    {
        Task<List<ToolsEntity>> GetAll();
        Task<List<ToolsEntity>> GetMyAllTools(string userid);
        Task Delete(int id);
        Task<ToolsEntity> GetTools(int id);
        Task<ToolsEntity> CreateUpdate(ToolsBo bo, string userName, int id = 0);
    }
}
