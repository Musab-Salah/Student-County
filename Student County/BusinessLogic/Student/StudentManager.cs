using Microsoft.EntityFrameworkCore;
using Student_County.BusinessLogic.Helpers.Common;
using Student_County.DAL;

namespace Student_County.BusinessLogic.Student
{
    public class StudentManager : IStudentManager
    {
        protected readonly StudentCountyContext _context;
        public StudentManager(StudentCountyContext context)
        {
            _context = context;
        }
        public async Task<List<StudentEntity>> GetAll() => await _context.Students.Where(entity => !entity.IsDeleted).ToListAsync();

        public async Task<StudentEntity> Delete(int id)
        {
            var entity = await _context.Students.FirstOrDefaultAsync(entity => entity.Id == id);
            if (entity == null)
                throw new Exception("Student Not Found");
            else if (!entity.IsDeleted)
            {
                entity.IsDeleted = true;
                _context.Update(entity);
                await _context.SaveChangesAsync();
                throw new Exception("Student Is Deleted");
            }
            return entity;
        }
        public async Task<StudentEntity> GetStudent(int id)
        {
            var entity = await _context.Students.FirstOrDefaultAsync(x => x.Id == id);
            if (entity == null || id == 0)
                throw new Exception("Student Not Found");
            else if (entity.IsDeleted)
                throw new Exception("Student Is Deleted");
            return entity;
        }
        public async Task<StudentEntity> CreateUpdate(StudentBo bo, int id = 0)
        {
            var entity = bo.MapBoToEntity();
            entity.Password = Security.Encrypt_Password(entity.Password);
            if (id == 0)
                _context.Add(entity);
            else if (id != 0)
                _context.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }
    }
}
