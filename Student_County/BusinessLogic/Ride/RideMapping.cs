using Student_County.DAL;

namespace Student_County.BusinessLogic.Ride
{
    public static class ToolsMapping
    {
        public static RideEntity? MapBoToEntity(this RideBo bo)
        {
            if (bo == null) return null;
            return new RideEntity
            {
                Id = bo.Id,
                EmptySeats = bo.EmptySeats,
                CarDescription = bo.CarDescription,
                ShortDescription = bo.ShortDescription,
                LongDescription = bo.LongDescription,
                DestinationId = bo.DestinationId,
                StudentId = bo.StudentId,        
            };
        }
    }
}
