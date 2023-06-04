using Student_County.BusinessLogic.Helpers.Common;
using Student_County.DAL;
using System.ComponentModel.DataAnnotations;

namespace Student_County.BusinessLogic.Book
{
    public class BookBo : TrackableData
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? TheWay { get; set; }
        [Required]
        public int Price { get; set; }
        public string? ShortDescription { get; set; }
        [Required]
        public string? Condition { get; set; }
        [Required]
        public string? LongDescription { get; set; }
        public string StudentId { get; set; }

    }
}
