using Student_County.BusinessLogic.Helpers.Common;
using Student_County.DAL;
using System.ComponentModel.DataAnnotations;

namespace Student_County.BusinessLogic.Ride
{
    public class RideBo : TrackableData
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int EmptySeats { get; set; }
        [Required]
        public string? CarDescription { get; set; }
        public string? ShortDescription { get; set; }
        [Required]
        public string? LongDescription { get; set; }
        public string StudentId { get; set; }
        public int DestinationId { get; set; }
    }
}
