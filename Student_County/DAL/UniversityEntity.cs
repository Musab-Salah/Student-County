using Microsoft.EntityFrameworkCore;
using Student_County.BusinessLogic.Auth.Models;
using Student_County.BusinessLogic.Helpers.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Student_County.DAL
{
    [Table("University")]
    [Index(nameof(Name), IsUnique = true)]
    [Index(nameof(EmailDomainName), IsUnique = true)]
    public class UniversityEntity : TrackableData
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? EmailDomainName { get; set; }

        public List<ApplicationUser> Users { get; set; }

    }
}
