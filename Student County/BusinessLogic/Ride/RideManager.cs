using Microsoft.EntityFrameworkCore;
using Student_County.DAL;

namespace Student_County.BusinessLogic.Ride
{
    public class RideManager : IRideManager
    {
        protected readonly StudentCountyContext _context;
        public RideManager(StudentCountyContext context)
        {
            _context = context;
        }
        public async Task<List<RideEntity>> GetAll() => await _context.Rides.Where(entity => !entity.IsDeleted).ToListAsync();

        public async Task<RideEntity> Delete(int id)
        {
            var entity = await _context.Rides.FirstOrDefaultAsync(entity => entity.Id == id);
            if (entity == null)
                throw new Exception("Ride Not Found");
            else if (!entity.IsDeleted)
            {
                entity.IsDeleted = true;
                _context.Update(entity);
                await _context.SaveChangesAsync();
                throw new Exception("Ride Is Deleted");
            }
            return entity;
        }
        public async Task<RideEntity> GetRide(int id)
        {
            var entity = await _context.Rides.FirstOrDefaultAsync(x => x.Id == id);
            if (entity == null || id == 0)
                throw new Exception("Ride Not Found");
            else if (entity.IsDeleted)
                throw new Exception("Ride Is Deleted");
            return entity;
        }
        public async Task<RideEntity> CreateUpdate(RideBo bo, int id = 0)
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
