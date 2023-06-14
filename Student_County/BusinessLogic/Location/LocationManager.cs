using Microsoft.EntityFrameworkCore;
using Student_County.DAL;

namespace Student_County.BusinessLogic.Destination
{
    public class LocationManager : ILocationManager
    {
        protected readonly StudentCountyContext _context;
        public LocationManager(StudentCountyContext context)
        {
            _context = context;
        }
        public async Task<List<LocationEntity>> GetAll() => await _context.Locations.Where(entity => !entity.IsDeleted).ToListAsync();

        public async Task<LocationEntity> Delete(int id)
        {
            var entity = await _context.Locations.FirstOrDefaultAsync(entity => entity.Id == id);
            if (entity == null)
                throw new Exception("Location Not Found");
            else if (!entity.IsDeleted)
            {
                entity.IsDeleted = true;
                _context.Update(entity);
                await _context.SaveChangesAsync();
                throw new Exception("Location Is Deleted");
            }
            return entity;
        }
        public async Task<LocationEntity> GetDestination(int id)
        {
            var entity = await _context.Locations.FirstOrDefaultAsync(x => x.Id == id);
            if (entity == null || id == 0)
                throw new Exception("Location Not Found");
            else if (entity.IsDeleted)
                throw new Exception("Location Is Deleted");
            return entity;
        }
        public async Task<LocationEntity> CreateUpdate(LocationBo bo, int id = 0)
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
