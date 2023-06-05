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
                PhoneNumber = bo.PhoneNumber,
                NationalId = bo.NationalId,
                Address = bo.Address,
                City = bo.City,
                Province = bo.Province,
                HouseType = bo.HouseType,
                RoomType = bo.RoomType,
                RentalPrice = bo.RentalPrice,
                Furnishings = bo.Furnishings,
                Bathroom = bo.Bathroom,
                Bedroom = bo.Bedroom,
                TypeOfContract = bo.TypeOfContract,
                StudentId = bo.StudentId,        
            };
        }
    }
}
