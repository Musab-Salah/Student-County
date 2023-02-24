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
        public List<HousingEntity> GetAll() => _context.Housings.Where(entity => !entity.IsDeleted).ToList();
        
        public void Delete(int id)
        {
            var entity = _context.Housings.FirstOrDefault(entity => entity.Id == id);
            if (entity == null)
                throw new Exception("Housing Not Found");
           else if (!entity.IsDeleted)
            {
                entity.IsDeleted = true;
                _context.Update(entity);
                _context.SaveChanges();
                throw new Exception("Housing Is Deleted");
            }
        }
        public HousingEntity GetHousing(int id)
        {
            var entity = _context.Housings.FirstOrDefault(x => x.Id == id);
            if (entity == null || id == 0)
                throw new Exception("Housing Not Found");
            else if(entity.IsDeleted)
                throw new Exception("Housing Is Deleted");
            return entity;
        }
        public HousingEntity CreateUpdate(HousingBo bo, int id = 0)
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
