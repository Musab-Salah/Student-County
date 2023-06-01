using Student_County.BusinessLogic.Helpers.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Student_County.DAL
{
    [Table("Room")]
    public class RoomEntity : TrackableData
    {
        [Key]
        public string Id { get; set; }
        [Required]
        public string? From { get; set; }
        [Required]
        public string? To { get; set; }
        [Required]
        public string? FromName { get; set; }
        [Required]
        public string? ToName { get; set; }
        [Required]
        public string? FromRole { get; set; }
        [Required]
        public string? ToRole { get; set; }
        public string? LastMessage { get; set; }
        public DateTimeOffset? CreatedOnLastMessage { get; set; }




    }
}
