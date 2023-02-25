using Student_County.DAL;

namespace Student_County.BusinessLogic.Housing
{
    public interface IHousingManager
    {
        Task<List<HousingEntity>> GetAll();
        Task<HousingEntity> Delete(int id);
        Task<HousingEntity> GetHousing(int id);
        Task<HousingEntity> CreateUpdate(HousingBo bo, int id = 0);
    }
}
