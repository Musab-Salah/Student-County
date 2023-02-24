using Student_County.DAL;

namespace Student_County.BusinessLogic.BookStore
{
    public class RideManager : IRideManager
    {
        protected readonly StudentCountyContext _context;
        public RideManager(StudentCountyContext context)
        {
            _context = context;
        }
        public List<BookStoreEntity> GetAll() => _context.Books.Where(entity => !entity.IsDeleted).ToList();
        
        public void Delete(int id)
        {
            var entity = _context.Books.FirstOrDefault(entity => entity.Id == id);
            if (entity == null)
                throw new Exception("BookStore Not Found");
           else if (!entity.IsDeleted)
            {
                entity.IsDeleted = true;
                _context.Update(entity);
                _context.SaveChanges();
                throw new Exception("BookStore Is Deleted");
            }
        }
        public BookStoreEntity GetBookStore(int id)
        {
            var entity = _context.Books.FirstOrDefault(x => x.Id == id);
            if (entity == null || id == 0)
                throw new Exception("BookStore Not Found");
            else if(entity.IsDeleted)
                throw new Exception("BookStore Is Deleted");
            return entity;
        }
        public BookStoreEntity CreateUpdate(RideBo bo, int id = 0)
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
