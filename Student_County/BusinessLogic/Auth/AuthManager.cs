using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Student_County.BusinessLogic.Auth.Models;
using Student_County.BusinessLogic.Helpers.Common;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Student_County.BusinessLogic.Auth
{
    public class AuthManager : IAuthManager
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly JWT _jwt;
        private IConfiguration _configuration;
        private IMailService _mailService;



        public AuthManager(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager,
            IOptions<JWT> jwt, IMailService mailService, IConfiguration configuration)
        {
             _userManager = userManager;
            _roleManager = roleManager;
            _jwt = jwt.Value;
            _configuration = configuration;
            _mailService = mailService;



        }

        public async Task<AuthModel> RegisterStudentAsync(StudentRegisterModel model)
        {
  

            if (await _userManager.FindByEmailAsync(model.Email) is not null)
                return new AuthModel { Message = "Email is already registered!" };
            if (await _userManager.FindByNameAsync(model.UserName) is not null)
                return new AuthModel { Message = "Username is already registered!" };
            var user = new ApplicationUser
            {
                UserName = model.UserName,
                Gender = model.Gender,
                IdNumber=model.IdNumber,
                Password = model.Password,
                PhoneNumber=model.PhoneNumber,
                UniversityId=model.UniversityId,
                CollegeId=model.CollegeId,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
            };

            
            user.Password= Security.ComputeHash(model.Password);

            var result = await _userManager.CreateAsync(user, user.Password);
             
            if (!result.Succeeded)
            {  
                var errors = string.Empty;
                foreach (var error in result.Errors)
                    errors += $"{error.Description},";
                return new AuthModel { Message = errors };
            }

            await _userManager.AddToRoleAsync(user, "Student");
            var jwtSecurityToken = await CreateJwtToken(user);
            var refreshToken = GenerateRefreshToken();
            user.RefreshTokens?.Add(refreshToken);
            await _userManager.UpdateAsync(user);

            var confirmEmailToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);

            var encodedEmailToken = Encoding.UTF8.GetBytes(confirmEmailToken);
            var validEmailToken = WebEncoders.Base64UrlEncode(encodedEmailToken);

            string url = $"{_configuration["AppUrl"]}/api/auth/confirmemail?userid={user.Id}&token={validEmailToken}";

            await _mailService.SendEmailAsync(user.Email, "Confirm your email", $"<h1>Welcome to Auth Demo</h1>" +
                $"<p>Please confirm your email by <a href='{url}'>Clicking here</a></p>");

            return new AuthModel
            {
                Email = user.Email,
                ExpiresOn = jwtSecurityToken.ValidTo,
                IsAuthenticated = true,
                Roles = new List<string> { "Student" },
                Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken),
                Username = user.UserName,
                RefreshToken = refreshToken.Token,
                RefreshTokenExpiration = refreshToken.ExpiresOn
            };
        }

        public async Task<AuthModel> RegisterPatientAsync(PatientRegisterModel model)
        {
  

            if (await _userManager.FindByEmailAsync(model.Email) is not null)
                return new AuthModel { Message = "Email is already registered!" };
            if (await _userManager.FindByNameAsync(model.UserName) is not null)
                return new AuthModel { Message = "Username is already registered!" };
            var user = new ApplicationUser
            {
                UserName = model.UserName,
                Password = model.Password,
                PhoneNumber = model.PhoneNumber,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Gender = model.Gender,
                UniversityId = 1,
                CollegeId = 1,// change to Denistry college
            };

            user.Password = Security.ComputeHash(model.Password);

            var result = await _userManager.CreateAsync(user, user.Password);

            if (!result.Succeeded)
            {
                var errors = string.Empty;
                foreach (var error in result.Errors)
                    errors += $"{error.Description},";
                return new AuthModel { Message = errors };
            }

            await _userManager.AddToRoleAsync(user, "Patient");
            var jwtSecurityToken = await CreateJwtToken(user);
            var refreshToken = GenerateRefreshToken();
            user.RefreshTokens?.Add(refreshToken);
            await _userManager.UpdateAsync(user);


            var confirmEmailToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);

            var encodedEmailToken = Encoding.UTF8.GetBytes(confirmEmailToken);
            var validEmailToken = WebEncoders.Base64UrlEncode(encodedEmailToken);

            string url = $"{_configuration["AppUrl"]}/auth/confirmemail?userid={user.Id}&token={validEmailToken}";

            await _mailService.SendEmailAsync(user.Email, "Confirm your email", $"<h1>Welcome to Auth Demo</h1>" +
                $"<p>Please confirm your email by <a href='{url}'>Clicking here</a></p>");

            return new AuthModel
            {
                Email = user.Email,
                ExpiresOn = jwtSecurityToken.ValidTo,
                IsAuthenticated = true,
                Roles = new List<string> { "Patient" },
                Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken),
                Username = user.UserName,
                RefreshToken = refreshToken.Token,
                RefreshTokenExpiration = refreshToken.ExpiresOn
            };
        }

        public async Task<AuthModel> GetTokenAsync(TokenRequestModel model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);

            var authModel = new AuthModel();
          

            if (!await _userManager.IsEmailConfirmedAsync(user))
            {
                authModel.Message = "Email Not Confirmed";
                return authModel;
            }

            user.Password = Security.ComputeHash(model.Password);


            if (user is null || !await _userManager.CheckPasswordAsync(user, user.Password))
            {
                authModel.Message = "Email or Password is incorrect!";
                return authModel;
            }

            var jwtSecurityToken = await CreateJwtToken(user);
            var rolesList = await _userManager.GetRolesAsync(user);



            authModel.IsAuthenticated = true;
            authModel.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
            authModel.Email = user.Email;
            authModel.Username = user.UserName;
            authModel.ExpiresOn = jwtSecurityToken.ValidTo;
            authModel.Roles = rolesList.ToList();
         

            if (user.RefreshTokens.Any(t => t.IsActive))
            {
                var activeRefreshToken = user.RefreshTokens.FirstOrDefault(t => t.IsActive);
                authModel.RefreshToken = activeRefreshToken.Token;
                authModel.RefreshTokenExpiration = activeRefreshToken.ExpiresOn;
            }
            else
            {
                var refreshToken = GenerateRefreshToken();
                authModel.RefreshToken = refreshToken.Token;
                authModel.RefreshTokenExpiration = refreshToken.ExpiresOn;
                user.RefreshTokens.Add(refreshToken);
                await _userManager.UpdateAsync(user);
                
            }

            return authModel;
        }

        public async Task<string> AddRoleAsync(AddRoleModel model)
        {
            var user = await _userManager.FindByIdAsync(model.UserId);

            if (user is null || !await _roleManager.RoleExistsAsync(model.Role))
                return "Invalid user ID or Role";

            if (await _userManager.IsInRoleAsync(user, model.Role))
                return "User already assigned to this role";

            var result = await _userManager.AddToRoleAsync(user, model.Role);

            return result.Succeeded ? string.Empty : "Sonething went wrong";
        }

        private async Task<JwtSecurityToken> CreateJwtToken(ApplicationUser user)
        {
            var userClaims = await _userManager.GetClaimsAsync(user);
            var roles = await _userManager.GetRolesAsync(user);
            var roleClaims = new List<Claim>();

            foreach (var role in roles)
                roleClaims.Add(new Claim("roles", role));

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Name, user.FirstName),
                new Claim(JwtRegisteredClaimNames.FamilyName, user.LastName),
                new Claim("uid", user.Id)
            }
            .Union(userClaims)
            .Union(roleClaims);

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Key));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);

            var jwtSecurityToken = new JwtSecurityToken(
                issuer: _jwt.Issuer,
                audience: _jwt.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_jwt.DurationInMinutes),
                signingCredentials: signingCredentials);

            return jwtSecurityToken;
        }

        public async Task<AuthModel> RefreshTokenAsync(string token)
        {
            var authModel = new AuthModel();

            var user = await _userManager.Users.SingleOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == token));

            if (user == null)
            {
                authModel.Message = "Invalid token";
                return authModel;
            }

            var refreshToken = user.RefreshTokens.Single(t => t.Token == token);

            if (!refreshToken.IsActive)
            {
                authModel.Message = "Inactive token";
                return authModel;
            }

            refreshToken.RevokedOn = DateTime.UtcNow;

            var newRefreshToken = GenerateRefreshToken();
            user.RefreshTokens.Add(newRefreshToken);
            await _userManager.UpdateAsync(user);

            var jwtToken = await CreateJwtToken(user);
            authModel.IsAuthenticated = true;
            authModel.Token = new JwtSecurityTokenHandler().WriteToken(jwtToken);
            authModel.Email = user.Email;
            authModel.Username = user.UserName;
            var roles = await _userManager.GetRolesAsync(user);
            authModel.Roles = roles.ToList();
            authModel.RefreshToken = newRefreshToken.Token;

            authModel.RefreshTokenExpiration = newRefreshToken.ExpiresOn;

            return authModel;
        }

        public async Task<bool> RevokeTokenAsync(string token)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == token));

            if (user == null)
                return false;

            var refreshToken = user.RefreshTokens.Single(t => t.Token == token);

            if (!refreshToken.IsActive)
                return false;

            refreshToken.RevokedOn = DateTime.UtcNow;

            await _userManager.UpdateAsync(user);

            return true;
        }

        private RefreshToken GenerateRefreshToken()
        {
            var randomNumber = new byte[32];

            using var generator = new RNGCryptoServiceProvider();

            generator.GetBytes(randomNumber);



            return new RefreshToken
            {

                Token = Convert.ToBase64String(randomNumber),
                
                ExpiresOn = DateTime.UtcNow.AddHours(12),
                CreatedOn = DateTime.UtcNow,
                

        };
        }

        public async Task<List<IdentityRole>> GetAllRoles() =>  await _roleManager.Roles.ToListAsync();


        public async Task<AuthModel> ConfirmEmailAsync(string userId, string token)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return new AuthModel
                {
                    IsSuccess = false,
                    Message = "User not found"
                };

            var decodedToken = WebEncoders.Base64UrlDecode(token);
            string normalToken = Encoding.UTF8.GetString(decodedToken);

            var result = await _userManager.ConfirmEmailAsync(user, normalToken);

            if (result.Succeeded)
                return new AuthModel
                {
                    Message = "Email confirmed successfully!",
                    IsSuccess = true,

                };

            return new AuthModel
            {
                Message = "Email did not confirm",
                IsSuccess = false,
            };
        }

        public async Task<AuthModel> ForgetPasswordAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return new AuthModel
                {
                    IsSuccess = false,
                    Message = "No user associated with email",
                };

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var encodedToken = Encoding.UTF8.GetBytes(token);
            var validToken = WebEncoders.Base64UrlEncode(encodedToken);


            string url = $"http://localhost:3000/reset_password/{email}/{validToken}";

            await _mailService.SendEmailAsync(email, "Reset Password", "<h1>Follow the instructions to reset your password</h1>" +
                $"<p>To reset your password <a href='{url}'>Click here</a></p>");

            return new AuthModel
            {
                IsSuccess = true,
                Message = "Reset password URL has been sent to the email successfully!"
            };
        }

        public async Task<AuthModel> ResetPasswordAsync(ResetPasswordModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return new AuthModel
                {
                    IsSuccess = false,
                    Message = "No user associated with email",
                };

            if (model.NewPassword != model.ConfirmPassword)
                return new AuthModel
                {
                    IsSuccess = false,
                    Message = "Password doesn't match its confirmation",
                };

            var decodedToken = WebEncoders.Base64UrlDecode(model.Token);
            string normalToken = Encoding.UTF8.GetString(decodedToken);



            user.Password = Security.ComputeHash(model.NewPassword);

            var result = await _userManager.ResetPasswordAsync(user, normalToken,user.Password);

            if (result.Succeeded)
                return new AuthModel
                {
                    Message = "Password has been reset successfully!",
                    IsSuccess = true,
                };
            var errors = string.Empty;
            foreach (var error in result.Errors)
                errors += $"{error.Description},";

            return new AuthModel
            {
                Message = "Something went wrong" +" "+ errors,
                IsSuccess = false,
            };
        }

    }
}
