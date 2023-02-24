using Microsoft.EntityFrameworkCore;
using Student_County.DAL;

namespace Student_County.BusinessLogic.University
{
    public class BookStoreManager : IBookStoreManager
    {
        protected readonly StudentCountyContext _context;
        public BookStoreManager(StudentCountyContext context)
        {
            _context = context;
        }
        public async Task<List<UniversityEntity>> GetAll() => await _context.Universities.Where(entity => !entity.IsDeleted).ToListAsync();
        
        public async Task<UniversityEntity> Delete(int id)
        {
            var entity = await _context.Universities.FirstOrDefaultAsync(entity => entity.Id == id);
            if (entity == null)
                throw new Exception("University Not Found");
           else if (!entity.IsDeleted)
            {
                entity.IsDeleted = true;
                _context.Update(entity);
                await _context.SaveChangesAsync();
                throw new Exception("University Is Deleted");
            }
            return entity;
        }
        public async Task<UniversityEntity> GetUniversity(int id)
        {
            var entity = await _context.Universities.FirstOrDefaultAsync(x => x.Id == id);
            if (entity == null || id == 0)
                throw new Exception("University Not Found");
            else if(entity.IsDeleted)
                throw new Exception("University Is Deleted");
            return entity;
        }
        public async Task<UniversityEntity> CreateUpdate(BookStoreBo bo, int id = 0)
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
