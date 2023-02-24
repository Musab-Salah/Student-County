

using Microsoft.EntityFrameworkCore;


namespace Student_County.DAL
{
    public class StudentCountyContext : DbContext
    {
        public StudentCountyContext(DbContextOptions<StudentCountyContext> options) : base(options)
        {
        }
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
            

        //    //modelBuilder.Seed();
        //}

        public DbSet<AdminEntity> Admins { get; set; }
        public DbSet<BookStoreEntity> Books { get; set; }
        public DbSet<ChatEntity> Chats { get; set; }
        public DbSet<CollegeEntity> Colleges { get; set; }
        public DbSet<DestinationEntity> Destinations { get; set; }
        public DbSet<HousingEntity> Housings { get; set; }
        public DbSet<RideEntity> Rides { get; set; }
        public DbSet<StudentEntity> Students { get; set; }
        public DbSet<UniversityEntity> Universities { get; set; }


    }

}







