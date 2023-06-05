using Student_County.BusinessLogic.Helpers.Common;
using Student_County.DAL;
using System.ComponentModel.DataAnnotations;

namespace Student_County.BusinessLogic.Housing
{
    public class HousingBo : TrackableData
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? PhoneNumber { get; set; }
        [Required]
        public string? NationalId { get; set; }
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
        public string? HouseType { get; set; }
        [Required]
        public string? RoomType { get; set; }
        [Required]
        public int Bedroom { get; set; }
        [Required]
        public int Bathroom { get; set; }

        [Required]
        public string? StudentId { get; set; }
    }
}
