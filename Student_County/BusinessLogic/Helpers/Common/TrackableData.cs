namespace Student_County.BusinessLogic.Helpers.Common
{
    public class TrackableData
    {
        public string? CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
        public string? ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; } = DateTime.UtcNow;
        public bool IsDeleted { get; set; }
    }
}
