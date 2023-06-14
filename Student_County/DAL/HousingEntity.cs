using Student_County.BusinessLogic.Auth.Models;
using Student_County.BusinessLogic.Helpers.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Student_County.DAL
{
    [Table("Housing")]
    public class HousingEntity : TrackableData
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? NationalId { get; set; }
        [Required]
        public string? ServiceName { get; set; } = "Housing";
        [Required]
        public string? Address { get; set; }
        [Required]
        public string? City { get; set; }
        [Required]
        public string? Province { get; set; }
        [Required]
        public string? TypeOfContract { get; set; }
        [Required]
        public int RentalPrice { get; set; }
        [Required]
        public bool Furnishings { get; set; }
        [Required]
        public string? HomeType { get; set; }
        [Required]
        public string? RoomType { get; set; }
        [Required]
        public int BedRoom { get; set; }
        [Required]
        public int BathRoom { get; set; }
        [Required]
        public string? PhoneNumber { get; set; }
        [Required]
        public string? Gender { get; set; }
        [Required]
        public string? StudentName { get; set; }
        [Required]
        public string StudentId { get; set; }
        public ApplicationUser Student { get; set; }

    }
}
