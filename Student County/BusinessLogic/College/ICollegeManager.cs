using Student_County.DAL;

namespace Student_County.BusinessLogic.College
{
    public interface ICollegeManager
    {
        Task<List<CollegeEntity>> GetAll();
        Task<CollegeEntity> Delete(int id);
        Task<CollegeEntity> GetCollege(int id);
        Task<CollegeEntity> CreateUpdate(CollegeBo bo, int id = 0);
    }
}
