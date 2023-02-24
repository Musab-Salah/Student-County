using Student_County.DAL;

namespace Student_County.BusinessLogic.Housing
{
    public interface IHousingManager
    {
        List<HousingEntity> GetAll();
        void Delete(int id);
        HousingEntity GetHousing(int id);
        HousingEntity CreateUpdate(HousingBo bo, int id = 0);
    }
}
