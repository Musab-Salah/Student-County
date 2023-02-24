using Student_County.BusinessLogic.Helpers.Common;
using Student_County.DAL;

namespace Student_County.BusinessLogic.Student
{
    public class UniversityManager : IUniversityManager
    {
        protected readonly StudentCountyContext _context;
        public UniversityManager(StudentCountyContext context)
        {
            _context = context;
        }
        public List<StudentEntity> GetAll() => _context.Students.Where(entity => !entity.IsDeleted).ToList();
        
        public void Delete(int id)
        {
            var entity = _context.Students.FirstOrDefault(entity => entity.Id == id);
            if (entity == null)
                throw new Exception("Student Not Found");
           else if (!entity.IsDeleted)
            {
                entity.IsDeleted = true;
                _context.Update(entity);
                _context.SaveChanges();
                throw new Exception("Student Is Deleted");
            }
        }
        public StudentEntity GetStudent(int id)
        {
            var entity = _context.Students.FirstOrDefault(x => x.Id == id);
            if (entity == null || id == 0)
                throw new Exception("Student Not Found");
            else if(entity.IsDeleted)
                throw new Exception("Student Is Deleted");
            return entity;
        }
        public StudentEntity CreateUpdate(UniversityBo bo, int id = 0)
        {
            var entity = bo.MapBoToEntity();
            entity.Password = Security.Encrypt_Password(entity.Password);
            if (id == 0)
                _context.Add(entity);
           else if (id != 0)
                _context.Update(entity);
            _context.SaveChanges();
            return entity;
        }
    }
}
