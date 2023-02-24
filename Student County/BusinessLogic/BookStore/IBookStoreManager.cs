using Student_County.DAL;

namespace Student_County.BusinessLogic.BookStore
{
    public interface IRideManager
    {
        List<BookStoreEntity> GetAll();
        void Delete(int id);
        BookStoreEntity GetBookStore(int id);
        BookStoreEntity CreateUpdate(RideBo bo, int id = 0);
    }
}
