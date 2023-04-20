
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Student_County.BusinessLogic.Helpers.Common;
using Student_County.DAL;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;

namespace Student_County.BusinessLogic.Auth.Models
{
    public class ApplicationUser : IdentityUser
    {

        [Required]
        public string? FirstName { get; set; }
        [Required]
        public string? LastName { get; set; }
        [Required]
        public string? Password { get; set; }
        public int? IdNumber { get; set; }
        public string? Gender { get; set; }

        public int UniversityId { get; set; }

        public int CollegeId { get; set; }

        public List<RefreshToken>? RefreshTokens { get; set; }

        public UniversityEntity? University { get; set; }
        public CollegeEntity? College { get; set; }

    }
}
