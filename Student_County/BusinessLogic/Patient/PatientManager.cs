﻿using Microsoft.EntityFrameworkCore;
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

        public async Task<PatientEntity> Delete(int id)
        {
            var entity = await _context.Patients.FirstOrDefaultAsync(entity => entity.Id == id);
            if (entity == null)
                throw new Exception("Patient Not Found");
            else if (!entity.IsDeleted)
            {
                entity.IsDeleted = true;
                _context.Update(entity);
                await _context.SaveChangesAsync();
                throw new Exception("Patient Is Deleted");
            }
            return entity;
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
            var entity = bo.MapBoToEntity();
            if (id == 0)
                _context.Add(entity);
            else if (id != 0)
                _context.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }
    }
}