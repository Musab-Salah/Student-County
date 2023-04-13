
using Microsoft.AspNetCore.Identity;
using Student_County.DAL;

namespace Student_County.BusinessLogic.Auth
{
    public interface IAuthManager
    {
        Task<AuthModel> RegisterStudentAsync(StudentRegisterModel model);
        Task<AuthModel> RegisterPatientAsync (PatientRegisterModel model);

        Task<AuthModel> GetTokenAsync(TokenRequestModel model);
        Task<string> AddRoleAsync(AddRoleModel model);
        Task<AuthModel> RefreshTokenAsync(string token);
        Task<bool> RevokeTokenAsync(string token);
        Task<List<IdentityRole>> GetAllRoles();


        Task<AuthModel> ConfirmEmailAsync(string userId, string token);



    }
}
