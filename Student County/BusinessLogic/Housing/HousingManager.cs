using Microsoft.EntityFrameworkCore;
using Student_County.DAL;

namespace Student_County.BusinessLogic.Housing
{
    public class HousingManager : IHousingManager
    {
        protected readonly StudentCountyContext _context;
        public HousingManager(StudentCountyContext context)
        {
            _context = context;
        }
        public async Task<List<HousingEntity>> GetAll() => await _context.Housings.Where(entity => !entity.IsDeleted).ToListAsync();

        public async Task<HousingEntity> Delete(int id)
        {
            var entity = await _context.Housings.FirstOrDefaultAsync(entity => entity.Id == id);
            if (entity == null)
                throw new Exception("Housing Not Found");
            else if (!entity.IsDeleted)
            {
                entity.IsDeleted = true;
                _context.Update(entity);
                await _context.SaveChangesAsync();
                throw new Exception("Housing Is Deleted");
            }
            return entity;
        }
        public async Task<HousingEntity> GetHousing(int id)
        {
            var entity = await _context.Housings.FirstOrDefaultAsync(x => x.Id == id);
            if (entity == null || id == 0)
                throw new Exception("Housing Not Found");
            else if (entity.IsDeleted)
                throw new Exception("Housing Is Deleted");
            return entity;
        }
        public async Task<HousingEntity> CreateUpdate(HousingBo bo, int id = 0)
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
