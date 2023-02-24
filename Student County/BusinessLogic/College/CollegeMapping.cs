using Student_County.DAL;

namespace Student_County.BusinessLogic.College
{
    public static class CollegeMapping
    {
        public static CollegeEntity? MapBoToEntity(this CollegeBo bo)
        {
            if (bo == null) return null;
            return new CollegeEntity
            {
                Id = bo.Id,
                Name = bo.Name,                              
            };
        }
    }
}
