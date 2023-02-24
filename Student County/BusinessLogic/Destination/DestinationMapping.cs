using Student_County.DAL;

namespace Student_County.BusinessLogic.Destination
{
    public static class CollegeMapping
    {
        public static DestinationEntity? MapBoToEntity(this CollegeBo bo)
        {
            if (bo == null) return null;
            return new DestinationEntity
            {
                Id = bo.Id,
                Name = bo.Name,                              
            };
        }
    }
}
