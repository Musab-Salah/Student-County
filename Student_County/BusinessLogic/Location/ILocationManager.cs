using Student_County.DAL;

namespace Student_County.BusinessLogic.Destination
{
    public interface ILocationManager
    {
        Task<List<LocationEntity>> GetAll();
        Task<LocationEntity> Delete(int id);
        Task<LocationEntity> GetDestination(int id);
        Task<LocationEntity> CreateUpdate(LocationBo bo, int id = 0);
    }
}
