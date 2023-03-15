using Student_County.BusinessLogic.Helpers.Common;
using System.ComponentModel.DataAnnotations;

namespace Student_County.BusinessLogic.University
{
    public class UniversityBo : TrackableData
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? EmailDomainName { get; set; }
    }
}
