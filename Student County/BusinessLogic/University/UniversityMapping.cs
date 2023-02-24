using Student_County.DAL;

namespace Student_County.BusinessLogic.University
{
    public static class BookStoreMapping
    {
        public static UniversityEntity? MapBoToEntity(this BookStoreBo bo)
        {
            if (bo == null) return null;
            return new UniversityEntity
            {
                Id = bo.Id,
                Name = bo.Name,
                EmailDomainName = bo.EmailDomainName,
            };
        }
    }
}
