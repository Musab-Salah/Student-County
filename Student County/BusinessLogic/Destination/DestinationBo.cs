using Student_County.BusinessLogic.Helpers.Common;
using System.ComponentModel.DataAnnotations;

namespace Student_County.BusinessLogic.Destination
{
    public class DestinationBo : TrackableData
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
    }
}
