using Microsoft.EntityFrameworkCore;
using Student_County.DAL;

namespace Student_County.BusinessLogic.Destination
{
    public class DestinationManager : IDestinationManager
    {
        protected readonly StudentCountyContext _context;
        public DestinationManager(StudentCountyContext context)
        {
            _context = context;
        }
        public async Task<List<DestinationEntity>> GetAll() => await _context.Destinations.Where(entity => !entity.IsDeleted).ToListAsync();

        public async Task<DestinationEntity> Delete(int id)
        {
            var entity = await _context.Destinations.FirstOrDefaultAsync(entity => entity.Id == id);
            if (entity == null)
                throw new Exception("Destination Not Found");
            else if (!entity.IsDeleted)
            {
                entity.IsDeleted = true;
                _context.Update(entity);
                await _context.SaveChangesAsync();
                throw new Exception("Destination Is Deleted");
            }
            return entity;
        }
        public async Task<DestinationEntity> GetDestination(int id)
        {
            var entity = await _context.Destinations.FirstOrDefaultAsync(x => x.Id == id);
            if (entity == null || id == 0)
                throw new Exception("Destination Not Found");
            else if (entity.IsDeleted)
                throw new Exception("Destination Is Deleted");
            return entity;
        }
        public async Task<DestinationEntity> CreateUpdate(DestinationBo bo, int id = 0)
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
