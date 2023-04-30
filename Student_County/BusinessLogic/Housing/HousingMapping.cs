using Student_County.DAL;

namespace Student_County.BusinessLogic.Housing
{
    public static class HousingMapping
    {
        public static HousingEntity? MapBoToEntity(this HousingBo bo)
        {
            if (bo == null) return null;
            return new HousingEntity
            {
                Id = bo.Id,
                Name = bo.Name,
                Location = bo.Location,
                TypeOfContract = bo.TypeOfContract,
                Price = bo.Price,
                ShortDescription = bo.ShortDescription,
                LongDescription = bo.LongDescription,
                StudentId = bo.StudentId,        
            };
        }
    }
}
