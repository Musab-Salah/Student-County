using Student_County.DAL;

namespace Student_County.BusinessLogic.Ride
{
    public static class RideMapping
    {
        public static RideEntity? MapBoToEntity(this RideBo bo)
        {
            if (bo == null) return null;
            return new RideEntity
            {
                Id = bo.Id,
                EmptySeats = bo.EmptySeats,
                CarDescription = bo.CarDescription,
                DestinationId = bo.DestinationId,
                StudentId = bo.StudentId,        
            };
        }
    }
}
