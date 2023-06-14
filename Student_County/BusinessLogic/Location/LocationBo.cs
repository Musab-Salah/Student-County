using Student_County.BusinessLogic.Helpers.Common;
using System.ComponentModel.DataAnnotations;

namespace Student_County.BusinessLogic.Destination
{
    public class LocationBo : TrackableData
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? CityName { get; set; }
        [Required]
        public string? TownName { get; set; }
    }
}
