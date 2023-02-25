using Microsoft.EntityFrameworkCore;
using Student_County.DAL;

namespace Student_County.BusinessLogic.College
{
    public class CollegeManager : ICollegeManager
    {
        protected readonly StudentCountyContext _context;
        public CollegeManager(StudentCountyContext context)
        {
            _context = context;
        }
        public async Task<List<CollegeEntity>> GetAll() => await _context.Colleges.Where(entity => !entity.IsDeleted).ToListAsync();

        public async Task<CollegeEntity> Delete(int id)
        {
            var entity = await _context.Colleges.FirstOrDefaultAsync(entity => entity.Id == id);
            if (entity == null)
                throw new Exception("College Not Found");
            else if (!entity.IsDeleted)
            {
                entity.IsDeleted = true;
                _context.Update(entity);
                await _context.SaveChangesAsync();
                throw new Exception("College Is Deleted");
            }
            return entity;
        }
        public async Task<CollegeEntity> GetCollege(int id)
        {
            var entity = await _context.Colleges.FirstOrDefaultAsync(x => x.Id == id);
            if (entity == null || id == 0)
                throw new Exception("College Not Found");
            else if (entity.IsDeleted)
                throw new Exception("College Is Deleted");
            return entity;
        }
        public async Task<CollegeEntity> CreateUpdate(CollegeBo bo, int id = 0)
        {
            var entity = bo.MapBoToEntity();
            if (id == 0)
                _context.Add(entity);
            else if (id != 0)
                _context.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }
    }
}
