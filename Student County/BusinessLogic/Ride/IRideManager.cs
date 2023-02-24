using Student_County.DAL;

namespace Student_County.BusinessLogic.Ride
{
    public interface IHousingManager
    {
        List<RideEntity> GetAll();
        void Delete(int id);
        RideEntity GetRide(int id);
        RideEntity CreateUpdate(HousingBo bo, int id = 0);
    }
}
