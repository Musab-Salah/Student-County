using Student_County.DAL;

namespace Student_County.BusinessLogic.Ride
{
    public static class RideMapping
    {
        public static RideEntity? MapBoToEntity(this RideBo bo)
        {
            if (bo == null)
                return null;

            var entity = new RideEntity
            {
                Id = bo.Id,
                EmptySeats = bo.EmptySeats,
                CarDescription = bo.CarDescription,
                LongDescription = bo.LongDescription,
                StudentId = bo.StudentId,
                Latitude = bo.Latitude,
                Longitude = bo.Longitude,   
                TimeSlots = new List<TimeSlot>()
            };

   

            return entity;
        }

    }
}