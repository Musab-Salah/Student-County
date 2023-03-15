﻿using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Student_County.BusinessLogic.Auth
{
    public class RegisterModel
    {
        [StringLength(100)]
        [Required]
        public string? FirstName { get; set; }
        [StringLength(100)]
        [Required]
        public string? LastName { get; set; }
        [Required]
        public int IdNumber { get; set; }
        [StringLength(50)]
        [Required]
        public string? UserName { get; set; }
        [StringLength(128)]
        [Required]
        public string? Email { get; set; }
        [StringLength(256)]
        [Required]
        public string? Password { get; set; }
        [Required]
        public int PhoneNumber { get; set; }
        [Required]
        public string? Gender { get; set; }
        [Required]
        public int UniversityId { get; set; }
        [Required]
        public int CollegeId { get; set; }
    }
}