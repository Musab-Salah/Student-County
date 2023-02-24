using Student_County.DAL;

namespace Student_County.BusinessLogic.Destination
{
    public class CollegeManager : ICollegeManager
    {
        protected readonly StudentCountyContext _context;
        public CollegeManager(StudentCountyContext context)
        {
            _context = context;
        }
        public List<DestinationEntity> GetAll() => _context.Destinations.Where(entity => !entity.IsDeleted).ToList();
        
        public void Delete(int id)
        {
            var entity = _context.Destinations.FirstOrDefault(entity => entity.Id == id);
            if (entity == null)
                throw new Exception("Destination Not Found");
           else if (!entity.IsDeleted)
            {
                entity.IsDeleted = true;
                _context.Update(entity);
                _context.SaveChanges();
                throw new Exception("Destination Is Deleted");
            }
        }
        public DestinationEntity GetDestination(int id)
        {
            var entity = _context.Destinations.FirstOrDefault(x => x.Id == id);
            if (entity == null || id == 0)
                throw new Exception("Destination Not Found");
            else if(entity.IsDeleted)
                throw new Exception("Destination Is Deleted");
            return entity;
        }
        public DestinationEntity CreateUpdate(CollegeBo bo, int id = 0)
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
