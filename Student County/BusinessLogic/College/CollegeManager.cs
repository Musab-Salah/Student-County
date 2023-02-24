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
        public List<CollegeEntity> GetAll() => _context.Colleges.Where(entity => !entity.IsDeleted).ToList();
        
        public void Delete(int id)
        {
            var entity = _context.Colleges.FirstOrDefault(entity => entity.Id == id);
            if (entity == null)
                throw new Exception("College Not Found");
           else if (!entity.IsDeleted)
            {
                entity.IsDeleted = true;
                _context.Update(entity);
                _context.SaveChanges();
                throw new Exception("College Is Deleted");
            }
        }
        public CollegeEntity GetCollege(int id)
        {
            var entity = _context.Colleges.FirstOrDefault(x => x.Id == id);
            if (entity == null || id == 0)
                throw new Exception("College Not Found");
            else if(entity.IsDeleted)
                throw new Exception("College Is Deleted");
            return entity;
        }
        public CollegeEntity CreateUpdate(CollegeBo bo, int id = 0)
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
