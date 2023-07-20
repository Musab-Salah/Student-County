using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Student_County.BusinessLogic.Helpers.Common;

namespace Student_County.DAL
{
    [Table("TimeSlot")]
    public class TimeSlot : TrackableData
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Day { get; set; }
        [Required]
        public string TimeToGo { get; set; }
        [Required]
        public string TimeToLeave { get; set; }
        [Required]
        public int RideEntityId { get; set; }
        public RideEntity? RideEntity { get; set; }
    }
}
