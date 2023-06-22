using Student_County.DAL;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Student_County.BusinessLogic.Auth.Models
{
    public class StudentRegisterModel
    {
        [StringLength(100)]
        [Required]
        public string? FirstName { get; set; }
        [StringLength(100)]
        [Required]
        public string? LastName { get; set; }
        [Required]
        public int? IdNumber { get; set; }
        [StringLength(50)]
        [Required]
        public string? UserName { get; set; }
        [StringLength(128)]
        [Required]
        public string? Email { get; set; }
        [StringLength(256)]
        [Required]
        public string? Password { get; set; }
        [Required]
        public string? PhoneNumber { get; set; }
        [Required]
        public string? Gender { get; set; }
        [Required]
        public int UniversityId { get; set; }
        [Required]
        public int CollegeId { get; set; }
        public UniversityEntity? University { get; set; }
        public CollegeEntity? College { get; set; }
        public List<BookEntity> Books { get; set; } = new List<BookEntity>();
        public List<HousingEntity> Housings { get; set; } = new List<HousingEntity>();
        public List<PatientEntity> Patients { get; set; } = new List<PatientEntity>();
        public List<RideEntity> Rides { get; set; } = new List<RideEntity>();
        public List<ToolsEntity> Tools { get; set; } = new List<ToolsEntity>();
    }
}
