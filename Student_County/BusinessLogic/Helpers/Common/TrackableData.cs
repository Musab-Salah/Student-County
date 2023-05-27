namespace Student_County.BusinessLogic.Helpers.Common
{
    public class TrackableData
    {
        public string? CreatedBy { get; set; } 
        public DateTimeOffset CreatedOn { get; set; } = DateTimeOffset.Now;
        public string? ModifiedBy { get; set; }
        public DateTimeOffset ModifiedOn { get; set; }
        public bool IsDeleted { get; set; }
    }
}
