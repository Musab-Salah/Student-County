﻿using Student_County.BusinessLogic.Auth;
using Student_County.BusinessLogic.Helpers.Common;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Student_County.DAL
{
        [Table("Tools")]
        public class ToolsEntity : TrackableData
        {
            [Key]
            public int Id { get; set; }
            [Required]
            public string? Name { get; set; }
            [Required]
            public string? TheWay { get; set; }
            [Required]
            public int Price { get; set; }
            [Required] 
            public string? Description { get; set; }
            [Required]
            public string StudentId { get; set; }
            public ApplicationUser? Student { get; set; }
        }
    }

