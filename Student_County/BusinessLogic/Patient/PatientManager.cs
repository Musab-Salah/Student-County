using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Student_County.BusinessLogic.Auth.Models;
using Student_County.BusinessLogic.Tools;
using Student_County.DAL;

namespace Student_County.BusinessLogic.Patient
{
    public class PatientManager : IPatientManager
    {
        protected readonly StudentCountyContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public PatientManager(StudentCountyContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;

        }
        
        public async Task<List<PatientEntity>> GetAll() => await _context.Patients
            .Where(entity => !entity.IsDeleted).ToListAsync();
        public async Task<List<PatientEntity>> GetMyAllPatients(string userid) => await _context.Patients
            .Where(entity => !entity.IsDeleted && entity.UserId == userid).ToListAsync();

        public async Task<List<PatientEntity>> GetMyAllPatientsWithDeleted(string userid) => await _context.Patients
         .Where(entity => entity.UserId == userid)
        .OrderByDescending(entity => entity.ModifiedOn > entity.CreatedOn ? entity.ModifiedOn : entity.CreatedOn)
        .Take(5)
        .ToListAsync();

        public async Task Delete(int id)
        {
            var entity = await _context.Patients.FirstOrDefaultAsync(entity => entity.Id == id);
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == entity.UserId);
            if (entity == null)
                throw new Exception("Patient Not Found");
            else if (!entity.IsDeleted)
            {
                entity.ModifiedBy = user.UserName;
                entity.ModifiedOn = DateTimeOffset.Now;
                entity.IsDeleted = true;
                _context.Update(entity);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<PatientEntity> GetPatient(int id)
        {
            var entity = await _context.Patients.FirstOrDefaultAsync(x => x.Id == id);
            if (entity == null || id == 0)
                throw new Exception("Patient Not Found");
            else if (entity.IsDeleted)
                throw new Exception("Patient Is Deleted");
            return entity;
        }
        public async Task<PatientEntity> CreateUpdate(PatientBo bo, int id = 0)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == bo.UserId);
            var entity = bo.MapBoToEntity();
            entity.UserName = user.FirstName + " " + user.LastName;
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
    }
}
