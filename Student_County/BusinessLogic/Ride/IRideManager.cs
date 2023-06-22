using Student_County.DAL;

namespace Student_County.BusinessLogic.Ride
{
    public interface IRideManager
    {
        Task<List<RideEntity>> GetAll();
        Task<List<RideEntity>> GetMyAllRides(string userid);
        Task<List<RideEntity>> GetMyAllRidesWithDeleted(string userid);
        Task Delete(int id);
        Task<RideEntity> GetRide(int id);
        Task<List<TimeSlot>> GetTimeSlot(int id);
        Task<RideEntity> CreateUpdate(RideBo bo, int id = 0);
    }
}
