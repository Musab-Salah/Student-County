using Student_County.DAL;

namespace Student_County.BusinessLogic.Ride
{
    public class HousingManager : IHousingManager
    {
        protected readonly StudentCountyContext _context;
        public HousingManager(StudentCountyContext context)
        {
            _context = context;
        }
        public List<RideEntity> GetAll() => _context.Rides.Where(entity => !entity.IsDeleted).ToList();
        
        public void Delete(int id)
        {
            var entity = _context.Rides.FirstOrDefault(entity => entity.Id == id);
            if (entity == null)
                throw new Exception("Ride Not Found");
           else if (!entity.IsDeleted)
            {
                entity.IsDeleted = true;
                _context.Update(entity);
                _context.SaveChanges();
                throw new Exception("Ride Is Deleted");
            }
        }
        public RideEntity GetRide(int id)
        {
            var entity = _context.Rides.FirstOrDefault(x => x.Id == id);
            if (entity == null || id == 0)
                throw new Exception("Ride Not Found");
            else if(entity.IsDeleted)
                throw new Exception("Ride Is Deleted");
            return entity;
        }
        public RideEntity CreateUpdate(HousingBo bo, int id = 0)
        {
            var entity = bo.MapBoToEntity();
            if (id == 0)
                _context.Add(entity);
           else if (id != 0)
                _context.Update(entity);
            _context.SaveChanges();
            return entity;
        }
    }
}
