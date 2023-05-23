using Student_County.DAL;

namespace Student_County.BusinessLogic.Destination
{
    public static class DestinationMapping
    {
        public static DestinationEntity? MapBoToEntity(this DestinationBo bo)
        {
            if (bo == null) return null;
            return new DestinationEntity
            {
                Id = bo.Id,
                CityName = bo.CityName,  
                TownName = bo.TownName,
            };
        }
    }
}
