using Student_County.BusinessLogic.Auth;
using Student_County.BusinessLogic.Helpers.Common;
using Student_County.DAL;
using System.ComponentModel.DataAnnotations;

namespace Student_County.BusinessLogic.Patient
{
    public class PatientBo : TrackableData
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
        public string? AdditionalInformation { get; set; }
        [Required]
        public int Age { get; set; }
        [Required]
        public string? Address { get; set; }
        [Required]
        public string? Gender { get; set; }
        [Required]
        public string UserId { get; set; }

    }
}
