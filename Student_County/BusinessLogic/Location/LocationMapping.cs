using Student_County.DAL;

namespace Student_County.BusinessLogic.Destination
{
    public static class LocationMapping
    {
        public static LocationEntity? MapBoToEntity(this LocationBo bo)
        {
            if (bo == null) return null;
            return new LocationEntity
            {
                Id = bo.Id,
                CityName = bo.CityName,  
                TownName = bo.TownName,
            };
        }
    }
}
