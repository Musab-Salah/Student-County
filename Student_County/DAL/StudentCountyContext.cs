

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Student_County.BusinessLogic.Auth;
using System.Reflection.Emit;

namespace Student_County.DAL
{
    public class StudentCountyContext : IdentityDbContext<ApplicationUser>
    {
        public StudentCountyContext(DbContextOptions<StudentCountyContext> options) : base(options)
        {
        }

        public DbSet<BookStoreEntity> Books { get; set; }
        public DbSet<ToolsEntity> Toolss { get; set; }
        public DbSet<ChatEntity> Chats { get; set; }
        public DbSet<CollegeEntity> Colleges { get; set; }
        public DbSet<DestinationEntity> Destinations { get; set; }
        public DbSet<HousingEntity> Housings { get; set; }
        public DbSet<RideEntity> Rides { get; set; }
        public DbSet<UniversityEntity> Universities { get; set; }
        public DbSet<PatientEntity> Patients { get; set; }

    

        protected override void OnModelCreating(ModelBuilder builder)
        {

            string DENTISTRY_STUDENT_ID = "0b380ceb-a2e3-4d11-a7ac-79c617f7b39b";
            string PATIENT = "398a104f-4e07-470c-9781-07d9852fb00d";
            string STUDENT = "70140aa8-9d44-4896-9dd8-d149ca8d7df3";
            string ADMIN = "8b2fe1d6-aa4d-4556-9589-cac1c9a89b53";


            //seed
            builder.Entity<IdentityRole>().HasData(new IdentityRole
            {
                Name = "Dentistry Student",
                NormalizedName = "DENTISTRYSTUDENT",
                Id = DENTISTRY_STUDENT_ID,
                ConcurrencyStamp = DENTISTRY_STUDENT_ID
            });
            builder.Entity<IdentityRole>().HasData(new IdentityRole
            {
                Name = "Patient",
                NormalizedName = "PATIENT",
                Id = PATIENT,
                ConcurrencyStamp = PATIENT
            });
            builder.Entity<IdentityRole>().HasData(new IdentityRole
            {
                Name = "Student",
                NormalizedName = "STUDENT",
                Id = STUDENT,
                ConcurrencyStamp = STUDENT
            });
            builder.Entity<IdentityRole>().HasData(new IdentityRole
            {
                Name = "Admin",
                NormalizedName = "ADMIN",
                Id = ADMIN,
                ConcurrencyStamp = ADMIN
            });
            builder.Entity<UniversityEntity>().HasData(new UniversityEntity
            {
                Id = 1,
                Name = "AAUP",
                EmailDomainName= "@AAUP.COM",
                CreatedBy = "Ini",
                CreatedOn = DateTime.UtcNow,
                IsDeleted = true,
                ModifiedBy = "Ini",
                ModifiedOn = DateTime.UtcNow,
            }); builder.Entity<CollegeEntity>().HasData(new CollegeEntity
            {
                Id = 1,
                Name = "EIT",
                CreatedBy = "Ini",
                CreatedOn = DateTime.UtcNow,
                IsDeleted = true,
                ModifiedBy = "Ini",
                ModifiedOn = DateTime.UtcNow,
            });

            base.OnModelCreating(builder);


        }
    }

}







