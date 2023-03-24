using Student_County.BusinessLogic.Ride;
using Student_County.DAL;

namespace Student_County.BusinessLogic.Tools
{
    public interface IToolsManager
    {
        Task<List<ToolsEntity>> GetAll();
        Task<ToolsEntity> Delete(int id);
        Task<ToolsEntity> GetTools(int id);
        Task<ToolsEntity> CreateUpdate(ToolsBo bo, int id = 0);
    }
}
