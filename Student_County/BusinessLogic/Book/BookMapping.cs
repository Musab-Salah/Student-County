using Student_County.DAL;

namespace Student_County.BusinessLogic.Book
{
    public static class BookMapping
    {
        public static BookEntity? MapBoToEntity(this BookBo bo)
        {
            if (bo == null) return null;
            return new BookEntity
            {
                Id = bo.Id,
                Name = bo.Name,
                TheWay = bo.TheWay,
                Price = bo.Price,
                LongDescription = bo.LongDescription,
                ShortDescription = bo.ShortDescription,
                StudentId = bo.StudentId,  
                Condition = bo.Condition,   
                CollegeId = bo.CollegeId,
            };
        }
    }
}
