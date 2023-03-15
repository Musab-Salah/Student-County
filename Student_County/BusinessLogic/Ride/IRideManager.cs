using Student_County.DAL;

namespace Student_County.BusinessLogic.Ride
{
    public interface IRideManager
    {
        Task<List<RideEntity>> GetAll();
        Task<RideEntity> Delete(int id);
        Task<RideEntity> GetRide(int id);
        Task<RideEntity> CreateUpdate(RideBo bo, int id = 0);
    }
}
