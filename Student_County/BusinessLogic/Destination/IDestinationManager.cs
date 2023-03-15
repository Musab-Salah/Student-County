using Student_County.DAL;

namespace Student_County.BusinessLogic.Destination
{
    public interface IDestinationManager
    {
        Task<List<DestinationEntity>> GetAll();
        Task<DestinationEntity> Delete(int id);
        Task<DestinationEntity> GetDestination(int id);
        Task<DestinationEntity> CreateUpdate(DestinationBo bo, int id = 0);
    }
}
