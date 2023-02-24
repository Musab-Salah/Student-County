using Student_County.BusinessLogic.Helpers.Common;
using Student_County.DAL;
using System.ComponentModel.DataAnnotations;

namespace Student_County.BusinessLogic.BookStore
{
    public class RideBo : TrackableData
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? BookName { get; set; }
        [Required]
        public string? TheWay { get; set; }
        [Required]
        public int Price { get; set; }
        public StudentEntity? StudentId { get; set; }
    }
}
