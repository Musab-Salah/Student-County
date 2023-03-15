
using Student_County.BusinessLogic.Auth;
using Student_County.BusinessLogic.Helpers.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Student_County.DAL
{
    [Table("Ride")]
    public class RideEntity : TrackableData
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int EmptySeats { get; set; }
        [Required]
        public string? CarDescription { get; set; }
        [Required]
        public string StudentId { get; set; }
        [Required]
        public int DestinationId { get; set; }
        public ApplicationUser? Student { get; set; }
        public DestinationEntity? Destination { get; set; }
    }
}
