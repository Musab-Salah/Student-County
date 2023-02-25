using Student_County.DAL;

namespace Student_County.BusinessLogic.Student
{
    public interface IStudentManager
    {
        Task<List<StudentEntity>> GetAll();
        Task<StudentEntity> Delete(int id);
        Task<StudentEntity> GetStudent(int id);
        Task<StudentEntity> CreateUpdate(StudentBo bo, int id = 0);
    }
}
