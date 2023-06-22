using Student_County.DAL;

namespace Student_County.BusinessLogic.Ride
{
    public static class ToolsMapping
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
                LocationId = bo.LocationId,
                TimeSlots = new List<TimeSlot>()
            };

            if (bo.TimeSlots != null)
            {
                entity.TimeSlots.AddRange(bo.TimeSlots.Select(slot => new TimeSlot
                {
                    Day = slot.Day,
                    TimeToGo = slot.TimeToGo,
                    TimeToLeave = slot.TimeToLeave,
                    RideEntityId = entity.Id 
                }));
            }

            return entity;
        }
    }
}
