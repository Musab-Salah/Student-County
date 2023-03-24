using Student_County.DAL;

namespace Student_County.BusinessLogic.Patient
{
    public interface IPatientManager
    {
        Task<List<PatientEntity>> GetAll();
        Task<PatientEntity> Delete(int id);
        Task<PatientEntity> GetPatient(int id);
        Task<PatientEntity> CreateUpdate(PatientBo bo, int id = 0);
    }
}
