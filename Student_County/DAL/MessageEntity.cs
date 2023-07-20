using Student_County.BusinessLogic.Helpers.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Student_County.DAL
{
    [Table("Message")]
    public class MessageEntity : TrackableData
    {
        [Key]
        public string Id { get; set; }
        [Required]
        public string From { get; set; }
        [Required]
        public string Message { get; set; }
        [Required]
        public string RoomId { get; set; }
        public RoomEntity Room { get; set; }
        public bool IsRead { get; set; }

    }
}
