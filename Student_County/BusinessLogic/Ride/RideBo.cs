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
        public string CarDescription { get; set; }
        [Required]
        public string LongDescription { get; set; }
        [Required]
        public string StudentId { get; set; }
        [Required]
        public double Latitude { get; set; }
        [Required]
        public double Longitude { get; set; }
        public List<TimeSlot> TimeSlots { get; set; } = new List<TimeSlot>();
    }
}
