using Student_County.DAL;

namespace Student_County.BusinessLogic.University
{
    public interface IBookStoreManager
    {
        Task<List<UniversityEntity>> GetAll();
        Task<UniversityEntity> Delete(int id);
        Task<UniversityEntity> GetUniversity(int id);
        Task<UniversityEntity> CreateUpdate(BookStoreBo bo, int id = 0);
    }
}
