using Student_County.BusinessLogic.Helpers.Common;
using Student_County.DAL;
using System.ComponentModel.DataAnnotations;

namespace Student_County.BusinessLogic.Ride
{
    public class HousingBo : TrackableData
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int EmptySeats { get; set; }
        [Required]
        public string? CarDescription { get; set; }
        public StudentEntity? StudentId { get; set; }
        public DestinationEntity? DestinationId { get; set; }
    }
}
