using Student_County.DAL;

namespace Student_County.BusinessLogic.University
{
    public interface IUniversityManager
    {
        Task<List<UniversityEntity>> GetAll();
        Task<UniversityEntity> Delete(int id);
        Task<UniversityEntity> GetUniversity(int id);
        Task<UniversityEntity> CreateUpdate(UniversityBo bo, int id = 0);
    }
}
