using Student_County.DAL;

namespace Student_County.BusinessLogic.BookStore
{
    public interface IBookStoreManager
    {
        Task<List<BookStoreEntity>> GetAll();
        Task<List<BookStoreEntity>> GetMyAllBooks(string userid);
        Task<BookStoreEntity> Delete(int id);
        Task<BookStoreEntity> GetBookStore(int id);
        Task<BookStoreEntity> CreateUpdate(BookStoreBo bo, string userName , int id = 0);
    }
}
