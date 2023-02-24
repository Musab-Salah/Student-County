using Student_County.DAL;

namespace Student_County.BusinessLogic.Student
{
    public interface IUniversityManager
    {
        List<StudentEntity> GetAll();
        void Delete(int id);
        StudentEntity GetStudent(int id);
        StudentEntity CreateUpdate(UniversityBo bo, int id = 0);
    }
}
