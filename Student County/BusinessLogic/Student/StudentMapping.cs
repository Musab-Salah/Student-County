using Student_County.DAL;

namespace Student_County.BusinessLogic.Student
{
    public static class UniversityMapping
    {
        public static StudentEntity? MapBoToEntity(this UniversityBo bo)
        {
            if (bo == null) return null;
            return new StudentEntity
            {
                Id = bo.Id,
                PhoneNumber = bo.PhoneNumber,
                FullName = bo.FullName,
                IdNumber = bo.IdNumber,
                Password = bo.Password,
                Email = bo.Email,
                Gender = bo.Gender,
                UniversityId = bo.UniversityId,
                CollegeId = bo.CollegeId,
            };
        }
    }
}
