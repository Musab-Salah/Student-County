using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Student_County.BusinessLogic.Auth
{
    public class PatientRegisterModel : ApplicationUser
    {

        [Required]
        public string? FirstName { get; set; }
        [Required]
        public string? LastName { get; set; }
        [Required]
        public string? UserName { get; set; }
        [StringLength(128)]
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? Gender { get; set; }
        [Required]
        public string? Password { get; set; }
        [Required]
        public string? PhoneNumber { get; set; }

    }
}
