using Student_County.BusinessLogic.Helpers.Common;
using Student_County.DAL;
using System.ComponentModel.DataAnnotations;

namespace Student_County.BusinessLogic.Student
{
    public class StudentBo : TrackableData
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? FullName { get; set; }
        [Required]
        public int IdNumber { get; set; }
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }
        [Required]
        public int PhoneNumber { get; set; }
        [Required]
        public string? Gender { get; set; }
        public UniversityEntity? University { get; set; }
        public CollegeEntity? College { get; set; }
    }
}
