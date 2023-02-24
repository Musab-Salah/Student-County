using Student_County.DAL;

namespace Student_County.BusinessLogic.Destination
{
    public interface ICollegeManager
    {
        List<DestinationEntity> GetAll();
        void Delete(int id);
        DestinationEntity GetDestination(int id);
        DestinationEntity CreateUpdate(CollegeBo bo, int id = 0);
    }
}
