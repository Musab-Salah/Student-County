using Student_County.DAL;

namespace Student_County.BusinessLogic.Patient
{
    public interface IPatientManager
    {
        Task<List<PatientEntity>> GetAll();
        Task<List<PatientEntity>> GetMyAllPatients(string userid);
        Task<List<PatientEntity>> GetMyAllPatientsWithDeleted(string userid);
        Task Delete(int id);
        Task<PatientEntity> GetPatient(int id);
        Task<PatientEntity> CreateUpdate(PatientBo bo, int id = 0);
    }
}
