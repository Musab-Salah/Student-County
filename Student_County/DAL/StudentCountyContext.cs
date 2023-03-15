

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Student_County.BusinessLogic.Auth;

namespace Student_County.DAL
{
    public class StudentCountyContext : IdentityDbContext<ApplicationUser>
    {
        public StudentCountyContext(DbContextOptions<StudentCountyContext> options) : base(options)
        {
        }
        public DbSet<BookStoreEntity> Books { get; set; }
        public DbSet<ChatEntity> Chats { get; set; }
        public DbSet<CollegeEntity> Colleges { get; set; }
        public DbSet<DestinationEntity> Destinations { get; set; }
        public DbSet<HousingEntity> Housings { get; set; }
        public DbSet<RideEntity> Rides { get; set; }
        public DbSet<UniversityEntity> Universities { get; set; }
    }

}







