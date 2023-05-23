using Microsoft.EntityFrameworkCore;
using Student_County.BusinessLogic.Helpers.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Student_County.DAL
{
    [Table("Destination")]
    [Index(nameof(CityName), IsUnique = true)]
    public class DestinationEntity : TrackableData
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? CityName { get; set; }
        [Required]
        public string? TownName { get; set; }
    }
}
