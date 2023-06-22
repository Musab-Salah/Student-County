using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Student_County.DAL
{
    [Table("TimeSlot")]
    public class TimeSlot
    {
        [Key]
        public int Id { get; set; }
        public string Day { get; set; }
        public string TimeToGo { get; set; }
        public string TimeToLeave { get; set; }
        [Required]
        public int RideEntityId { get; set; }
        public RideEntity? RideEntity { get; set; }
    }
}
