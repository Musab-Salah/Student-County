
using Student_County.BusinessLogic.Auth;
using Student_County.BusinessLogic.Helpers.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Student_County.DAL
{
    [Table("BookStore")]
    public class BookStoreEntity : TrackableData
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? BookName { get; set; }
        [Required]
        public string? TheWay { get; set; }
        [Required]
        public int Price { get; set; }
        [Required]
        public string StudentId { get; set; }
        public ApplicationUser? Student { get; set; }
    }
}
