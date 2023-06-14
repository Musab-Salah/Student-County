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
                NationalId = bo.NationalId,
                Address = bo.Address,
                City = bo.City,
                Province = bo.Province,
                HomeType = bo.HomeType,
                RoomType = bo.RoomType,
                RentalPrice = bo.RentalPrice,
                Furnishings = bo.Furnishings,
                BathRoom = bo.BathRoom,
                BedRoom = bo.BedRoom,
                TypeOfContract = bo.TypeOfContract,
                StudentId = bo.StudentId,        
            };
        }
    }
}
