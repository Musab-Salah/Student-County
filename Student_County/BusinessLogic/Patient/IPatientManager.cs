using Student_County.DAL;

namespace Student_County.BusinessLogic.Patient
{
    public interface IPatientManager
    {
        Task<List<PatientEntity>> GetAll();
        Task<List<PatientEntity>> GetMyAllPatients(string userid);
        Task Delete(int id);
        Task<PatientEntity> GetPatient(int id);
        Task<PatientEntity> CreateUpdate(PatientBo bo, string userName, int id = 0);
    }
}
