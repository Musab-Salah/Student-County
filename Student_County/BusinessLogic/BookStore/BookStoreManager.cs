using Microsoft.EntityFrameworkCore;
using Student_County.DAL;

namespace Student_County.BusinessLogic.BookStore
{
    public class BookStoreManager : IBookStoreManager
    {
        protected readonly StudentCountyContext _context;
        public BookStoreManager(StudentCountyContext context)
        {
            _context = context;
        }
        public async Task<List<BookStoreEntity>> GetAll() => await _context.Books.Where(entity => !entity.IsDeleted).ToListAsync();

        public async Task<BookStoreEntity> Delete(int id)
        {
            var entity = await _context.Books.FirstOrDefaultAsync(entity => entity.Id == id);
            if (entity == null)
                throw new Exception("BookStore Not Found");
            else if (!entity.IsDeleted)
            {
                entity.IsDeleted = true;
                _context.Update(entity);
                await _context.SaveChangesAsync();
                throw new Exception("BookStore Is Deleted");
            }
            return entity;
        }
        public async Task<BookStoreEntity> GetBookStore(int id)
        {
            var entity = await _context.Books.FirstOrDefaultAsync(x => x.Id == id);
            if (entity == null || id == 0)
                throw new Exception("BookStore Not Found");
            else if (entity.IsDeleted)
                throw new Exception("BookStore Is Deleted");
            return entity;
        }
        public async Task<BookStoreEntity> CreateUpdate(BookStoreBo bo, int id = 0)
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