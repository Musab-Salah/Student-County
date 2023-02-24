using Student_County.DAL;

namespace Student_County.BusinessLogic.College
{
    public interface ICollegeManager
    {
        List<CollegeEntity> GetAll();
        void Delete(int id);
        CollegeEntity GetCollege(int id);
        CollegeEntity CreateUpdate(CollegeBo bo, int id = 0);
    }
}
