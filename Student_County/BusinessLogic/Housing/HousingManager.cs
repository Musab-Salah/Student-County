using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Student_County.BusinessLogic.Auth.Models;
using Student_County.DAL;

namespace Student_County.BusinessLogic.Housing
{
    public class HousingManager : IHousingManager
    {
        protected readonly StudentCountyContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public HousingManager(StudentCountyContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;

        }
        public async Task<List<HousingEntity>> GetAll() => await _context.Housings
            .Where(entity => !entity.IsDeleted).ToListAsync();
        public async Task<List<HousingEntity>> GetMyAllHousings(string userid) => await _context.Housings
            .Where(entity => !entity.IsDeleted && entity.StudentId == userid).ToListAsync();

        public async Task<List<HousingEntity>> GetMyAllHousingsWithDeleted(string userid) => await _context.Housings
            .Where(entity => entity.StudentId == userid)
        .OrderByDescending(entity => entity.ModifiedOn > entity.CreatedOn ? entity.ModifiedOn : entity.CreatedOn)
        .Take(5)
        .ToListAsync();

        public async Task Delete(int id)
        {
            var entity = await _context.Housings.FirstOrDefaultAsync(entity => entity.Id == id);
            if (entity == null)
                throw new Exception("Housing Not Found");
            else if (!entity.IsDeleted)
            {
                entity.IsDeleted = true;
                _context.Update(entity);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<HousingEntity> GetHousing(int id)
        {
            var entity = await _context.Housings.FirstOrDefaultAsync(x => x.Id == id);
            if (entity == null || id == 0)
                throw new Exception("Housing Not Found");
            else if (entity.IsDeleted)
                throw new Exception("Housing Is Deleted");
            return entity;
        }
        public async Task<HousingEntity> CreateUpdate(HousingBo bo, int id = 0)
        {
            try
            {
                var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == bo.StudentId);
                var entity = bo.MapBoToEntity();
                var numofhouse = _context.Housings.Where(entity => entity.StudentId == bo.StudentId && !entity.IsDeleted).Count();
                entity.StudentName = user.FirstName + " " + user.LastName;
                entity.PhoneNumber = user.PhoneNumber;
                entity.Gender = user.Gender;
                if (id == 0 && numofhouse < 1)
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
                else
                {
                    throw new Exception("You can't create more than one Housing");
                }

                await _context.SaveChangesAsync();
                return entity;
            }
            catch (Exception ex)
            {
                throw new Exception("Error: " + ex.Message);
            }
        }

    }
}
