
using Microsoft.EntityFrameworkCore;

using Student_County.BusinessLogic.Helpers.Common;
using Student_County.DAL;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;

namespace Student_County.DAL
{
    [Table("Student")]
    public class StudentEntity : TrackableData
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? FullName { get; set; }
        [Required]
        public int  IdNumber { get; set; }
        [Required]
        public string? Email { get; set; }
        [Required]
        public int Password { get; set; }
        [Required]
        public int PhoneNumber { get; set; }
        [Required]
        public string? Gender { get; set; }
        public UniversityEntity? UniversityId { get; set; }
        public CollegeEntity? CollegeId { get; set; }

    }
}
