using Student_County.BusinessLogic.Helpers.Common;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Student_County.BusinessLogic.Auth.Models;

namespace Student_County.DAL
{
    [Table("Tools")]
        public class ToolsEntity : TrackableData
        {
            [Key]
            public int Id { get; set; }
            [Required]
            public string? ServiceName { get; set; } = "Tools";
            [Required]
            public string? Name { get; set; }
            [Required]
            public string? TheWay { get; set; }
            [Required]
            public int Price { get; set; }
            [Required]
            public string? ShortDescription { get; set; }
            [Required]
            public string? LongDescription { get; set; }
            [Required]
            public string? StudentName { get; set; }
            [Required]
            public string? StudentId { get; set; }
     
            public ApplicationUser? Student { get; set; }
        }
    }

