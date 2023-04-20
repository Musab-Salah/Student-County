using Student_County.BusinessLogic.Auth.Models;
using Student_County.BusinessLogic.Helpers.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Student_County.DAL
{
    [Table("Patient")]
    public class PatientEntity : TrackableData
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? FirstName { get; set; }
        [Required]
        public string? LastName { get; set; }
        [Required]
        public string? PhoneNumber { get; set; }
        [Required]
        public string? NationalIdNumber { get; set; }
        [Required]
        public string? Description { get; set; }
        [Required]
        public int Age { get; set; }
        [Required]
        public string? TypeOfTreatment { get; set;}
        [Required]
        public string? CurrentIllnesses { get; set; }
        [Required]
        public string? Sensitivity { get; set; }
        [Required]
        public string? CurrentlyUsedMedicines { get; set; }
        [Required]
        public string? Address { get; set;}
        [Required]
        public string? Gender { get; set; }
        [Required]
        public string UserId { get; set; }
        public ApplicationUser? User { get; set; }


    }
}
