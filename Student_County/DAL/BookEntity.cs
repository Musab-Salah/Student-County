using Microsoft.EntityFrameworkCore;
using Student_County.BusinessLogic.Auth.Models;
using Student_County.BusinessLogic.Helpers.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Student_County.DAL
{
    [Table("Book")]
    public class BookEntity : TrackableData
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? StudentName { get; set; }
        [Required]
        public string? ServiceName { get; set; } = "Book"; 
        [Required]
        public string? TheWay { get; set; }
        [Required]
        public string? University { get; set; }
        [Required]
        public string? Condition { get; set; }
        [Required]
        public int Price { get; set; }
        public string? ShortDescription { get; set; }
        [Required]
        public string? LongDescription { get; set; }
        [Required]
        public string StudentId { get; set; }
        public ApplicationUser Student { get; set; }
    }
}
