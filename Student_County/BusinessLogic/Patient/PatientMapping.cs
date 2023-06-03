using Student_County.DAL;

namespace Student_County.BusinessLogic.Patient
{
    public static class PatientMapping
    {
        public static PatientEntity? MapBoToEntity(this PatientBo bo)
        {
            if (bo == null) return null;
            return new PatientEntity
            {
                Id = bo.Id,
                FirstName = bo.FirstName,
                LastName = bo.LastName,
                PhoneNumber = bo.PhoneNumber,
                NationalIdNumber = bo.NationalIdNumber,
                AdditionalInformation = bo.AdditionalInformation,
                Age = bo.Age,
                Address = bo.Address,
                Gender = bo.Gender,
                UserId = bo.UserId,
                TypeOfTreatment = bo.TypeOfTreatment,
                CurrentIllnesses = bo.CurrentIllnesses,
                CurrentlyUsedMedicines = bo.CurrentlyUsedMedicines,
                Sensitivity=bo.Sensitivity

            };
        }
    }
}
