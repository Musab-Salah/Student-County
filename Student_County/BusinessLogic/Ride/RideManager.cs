using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;
using Student_County.BusinessLogic.Auth.Models;
using Student_County.DAL;

namespace Student_County.BusinessLogic.Ride
{
    public class RideManager : IRideManager
    {
        protected readonly StudentCountyContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private static StudentCountyContext _contextt;


        public RideManager(StudentCountyContext context, UserManager<ApplicationUser> userManager, StudentCountyContext contextt)
        {
            _context = context;
            _userManager = userManager;
            _contextt = contextt;

        }
        
        public async Task<List<RideEntity>> GetAll() => await _context.Rides
            .Where(entity => !entity.IsDeleted).ToListAsync();
        public async Task<List<RideEntity>> GetMyAllRides(string userid) => await _context.Rides
            .Where(entity => !entity.IsDeleted && entity.StudentId == userid).ToListAsync();

        public async Task<List<RideEntity>> GetMyAllRidesWithDeleted(string userid) => await _context.Rides
            .Where(entity => entity.StudentId == userid)
        .OrderByDescending(entity => entity.ModifiedOn > entity.CreatedOn ? entity.ModifiedOn : entity.CreatedOn)
        .Take(5)
        .ToListAsync();

        public async Task Delete(int id)
        {
            var entity = await _context.Rides.FirstOrDefaultAsync(entity => entity.Id == id);
            if (entity == null)
                throw new Exception("Ride Not Found");
            else if (!entity.IsDeleted)
            {
                var timeentity = await _contextt.TimeSlots.FirstOrDefaultAsync(tentity => tentity.RideEntity == entity);
                entity.IsDeleted = true;
                timeentity.IsDeleted = true;
                _contextt.Update(timeentity);
                _context.Update(entity);
                await _context.SaveChangesAsync();
            }
        }
     
        public async Task<RideEntity> GetRide(int id)
        {
            var entity = await _context.Rides.FirstOrDefaultAsync(x => x.Id == id);
            if (entity == null || id == 0)
                throw new Exception("Ride Not Found");
            else if (entity.IsDeleted)
                throw new Exception("Ride Is Deleted");
            return entity;
        }
        public async Task<List<TimeSlot>> GetTimeSlot(int id) => await _context.TimeSlots
        .Where(entity =>  entity.RideEntityId == id).ToListAsync();
        public async Task<RideEntity> CreateUpdate(RideBo bo, int id = 0)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == bo.StudentId);
            var existingSlots = await _contextt.TimeSlots.Where(entity => entity.RideEntityId == bo.Id).ToListAsync();
        
            var entity = bo.MapBoToEntity();
            entity.Gender = user.Gender;
            entity.StudentName = user.FirstName + " " + user.LastName;
            MergeTimeSlots(existingSlots, bo.TimeSlots, entity);
            if (id == 0)
            {
                entity.CreatedBy = user.UserName;
                _context.Add(entity);
            }
            else if (id != 0)
            {
                entity.ModifiedBy = user.UserName;
                entity.ModifiedOn = DateTimeOffset.Now;
                _context.Update(entity);
            }
            await _context.SaveChangesAsync();
            return entity;
        }
        public static async Task MergeTimeSlots(List<TimeSlot> existingSlots, List<TimeSlot> updatedSlots, RideEntity entity)
        {
            // Remove existing slots not present in updated slots
            var existingSlotIds = existingSlots.Select(slot => slot.Id).ToList();
            var updatedSlotIds = updatedSlots.Select(slot => slot.Id).ToList();
            var slotsToDelete = existingSlotIds.Except(updatedSlotIds).ToList();

            foreach (var slotId in slotsToDelete)
            {
                await DeleteTimeSlotAsync(slotId);
                existingSlots.RemoveAll(slot => slot.Id == slotId);
            }

            foreach (var updatedSlot in updatedSlots)
            {
                var existingSlot = existingSlots.FirstOrDefault(slot => slot.Id == updatedSlot.Id);

                if (existingSlot != null)
                {
                    if (updatedSlot.TimeToGo == null && updatedSlot.TimeToLeave == null)
                    {
                        // Delete the existing time slot
                        await DeleteTimeSlotAsync(existingSlot.Id);
                        // Remove the existing slot from the list
                        existingSlots.Remove(existingSlot);
                    }
                    else
                    {
                        // Update existing time slot
                        existingSlot.TimeToGo = updatedSlot.TimeToGo;
                        existingSlot.TimeToLeave = updatedSlot.TimeToLeave;
                        _contextt.TimeSlots.Update(existingSlot);
                    }
                }
                else
                {
                    if (updatedSlot.TimeToGo != null || updatedSlot.TimeToLeave != null)
                    {
                        // Add new time slot
                        existingSlots.Add(updatedSlot);
                        updatedSlot.RideEntity = entity;
                        _contextt.TimeSlots.Add(updatedSlot);

                    }
                }
            }
        }

        public static async Task DeleteTimeSlotAsync(int timeSlotId)
        {
            // Perform the deletion operation using your ORM or database interaction code
            // Delete the TimeSlot with the given timeSlotId from the database
            var entity = await _contextt.TimeSlots.FirstOrDefaultAsync(entity => entity.Id == timeSlotId);
            _contextt.TimeSlots.Remove(entity);
            //await _contextt.SaveChangesAsync();
        }
    }
}
