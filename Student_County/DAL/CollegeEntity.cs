using Microsoft.EntityFrameworkCore;
using Student_County.BusinessLogic.Helpers.Common;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Student_County.DAL
{
    [Table("College")]
    [Index(nameof(Name), IsUnique = true)]
    public class CollegeEntity  : TrackableData
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
    }
}
