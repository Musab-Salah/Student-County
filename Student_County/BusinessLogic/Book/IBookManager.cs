using Student_County.DAL;

namespace Student_County.BusinessLogic.Book
{
    public interface IBookManager
    {
        Task<List<BookEntity>> GetAll();
        Task<List<BookEntity>> GetMyAllBooks(string userid);
        Task<List<BookEntity>> GetMyAllBooksWithDeleted(string userid);
        Task Delete(int id);
        Task<BookEntity> GetBook(int id);
        Task<BookEntity> CreateUpdate(BookBo bo , int id = 0);
    }
}
