using Student_County.DAL;

namespace Student_County.BusinessLogic.BookStore
{
    public static class RideMapping
    {
        public static BookStoreEntity? MapBoToEntity(this RideBo bo)
        {
            if (bo == null) return null;
            return new BookStoreEntity
            {
                Id = bo.Id,
                BookName = bo.BookName,
                TheWay = bo.TheWay,
                Price = bo.Price,
                StudentId = bo.StudentId,        
            };
        }
    }
}
