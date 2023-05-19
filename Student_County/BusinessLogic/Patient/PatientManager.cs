using Microsoft.EntityFrameworkCore;
using Student_County.BusinessLogic.Tools;
using Student_County.DAL;

namespace Student_County.BusinessLogic.Patient
{
    public class PatientManager : IPatientManager
    {
        protected readonly StudentCountyContext _context;
        public PatientManager(StudentCountyContext context)
        {
            _context = context;
        }
        public async Task<List<PatientEntity>> GetAll() => await _context.Patients.Where(entity => !entity.IsDeleted).ToListAsync();
        public async Task<List<PatientEntity>> GetMyAllPatients(string userid) => await _context.Patients.Where(entity => !entity.IsDeleted && entity.UserId == userid).ToListAsync();

        public async Task Delete(int id)
        {
            var entity = await _context.Patients.FirstOrDefaultAsync(entity => entity.Id == id);
            if (entity == null)
                throw new Exception("Patient Not Found");
            else if (!entity.IsDeleted)
            {
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
        public async Task<PatientEntity> CreateUpdate(PatientBo bo, string userName, int id = 0)
        {
            var entity = bo.MapBoToEntity();
            if (id == 0)
            {
                entity.CreatedBy = userName;
                _context.Add(entity);
            }
            else if (id != 0)
            {
                entity.ModifiedBy = userName;
                entity.ModifiedOn = DateTime.UtcNow;
                _context.Update(entity);
            }
            await _context.SaveChangesAsync();
            return entity;
        }
    }
}
