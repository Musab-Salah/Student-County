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

            await _mailService.SendEmailAsync(user.Email, "Confirm your email", $"<h1>Welcome to Student County</h1>" +
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

            await _mailService.SendEmailAsync(user.Email, "Confirm your email",
      @"<div class=""email-verification-container"" style=""display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 25px 50px; gap: 25px; background: #E2CDFF;"">
<svg class=""logo"" width=""106"" height=""35"" viewBox=""0 0 106 35"" fill=""none"" xmlns=""http://www.w3.org/2000/svg"">
<g clip-path=""url(#clip0_2_5)"">
<path d=""M51.6419 26.6256C51.6419 25.686 51.8518 24.8467 52.2714 24.1078C52.7001 23.3598 53.2794 22.7805 54.0092 22.37C54.7481 21.9504 55.5737 21.7406 56.4859 21.7406C57.5533 21.7406 58.4883 22.0142 59.2911 22.5616C60.0939 23.1089 60.6549 23.8661 60.9742 24.8331H58.7711C58.5522 24.3769 58.242 24.0349 57.8406 23.8068C57.4484 23.5787 56.9922 23.4647 56.4723 23.4647C55.9158 23.4647 55.4186 23.597 54.9807 23.8615C54.552 24.117 54.2145 24.4818 53.9682 24.9562C53.731 25.4306 53.6124 25.9871 53.6124 26.6256C53.6124 27.2551 53.731 27.8115 53.9682 28.295C54.2145 28.7694 54.552 29.1388 54.9807 29.4034C55.4186 29.6588 55.9158 29.7865 56.4723 29.7865C56.9922 29.7865 57.4484 29.6725 57.8406 29.4444C58.242 29.2073 58.5522 28.8606 58.7711 28.4045H60.9742C60.6549 29.3806 60.0939 30.1423 59.2911 30.6897C58.4974 31.2279 57.5624 31.497 56.4859 31.497C55.5737 31.497 54.7481 31.2917 54.0092 30.8812C53.2794 30.4616 52.7001 29.8823 52.2714 29.1434C51.8518 28.4045 51.6419 27.5652 51.6419 26.6256Z"" fill=""#8D37FF""></path>
<path d=""M65.9766 31.538C65.2468 31.538 64.59 31.3784 64.0062 31.0591C63.4223 30.7307 62.9616 30.27 62.6241 29.6771C62.2957 29.0841 62.1315 28.3999 62.1315 27.6245C62.1315 26.8491 62.3003 26.1649 62.6378 25.572C62.9845 24.979 63.4543 24.5229 64.0472 24.2036C64.6402 23.8752 65.3015 23.711 66.0313 23.711C66.7611 23.711 67.4225 23.8752 68.0155 24.2036C68.6084 24.5229 69.0737 24.979 69.4112 25.572C69.7579 26.1649 69.9312 26.8491 69.9312 27.6245C69.9312 28.3999 69.7533 29.0841 69.3975 29.6771C69.0509 30.27 68.5765 30.7307 67.9744 31.0591C67.3815 31.3784 66.7155 31.538 65.9766 31.538ZM65.9766 29.8686C66.3233 29.8686 66.6471 29.7865 66.9481 29.6223C67.2583 29.449 67.5046 29.1936 67.6871 28.856C67.8695 28.5185 67.9607 28.108 67.9607 27.6245C67.9607 26.9039 67.7692 26.3519 67.386 25.9688C67.012 25.5765 66.5513 25.3804 66.004 25.3804C65.4566 25.3804 64.996 25.5765 64.6219 25.9688C64.257 26.3519 64.0746 26.9039 64.0746 27.6245C64.0746 28.3452 64.2525 28.9017 64.6082 29.2939C64.9731 29.6771 65.4293 29.8686 65.9766 29.8686Z"" fill=""#8D37FF""></path>
<path d=""M78.493 23.8342V31.4149H76.5636V30.457C76.3173 30.7854 75.9934 31.0454 75.592 31.237C75.1998 31.4195 74.771 31.5107 74.3058 31.5107C73.7128 31.5107 73.1883 31.3875 72.7321 31.1412C72.276 30.8858 71.9157 30.5163 71.6511 30.0328C71.3957 29.5402 71.268 28.9564 71.268 28.2813V23.8342H73.1837V28.0077C73.1837 28.6097 73.3342 29.075 73.6353 29.4034C73.9363 29.7227 74.3468 29.8823 74.8668 29.8823C75.3959 29.8823 75.811 29.7227 76.112 29.4034C76.413 29.075 76.5636 28.6097 76.5636 28.0077V23.8342H78.493Z"" fill=""#8D37FF""></path>
<path d=""M84.584 23.7247C85.4871 23.7247 86.2169 24.012 86.7734 24.5868C87.3298 25.1524 87.6081 25.946 87.6081 26.9677V31.4149H85.6924V27.2277C85.6924 26.6256 85.5418 26.1649 85.2408 25.8457C84.9398 25.5172 84.5293 25.353 84.0093 25.353C83.4802 25.353 83.0605 25.5172 82.7504 25.8457C82.4493 26.1649 82.2988 26.6256 82.2988 27.2277V31.4149H80.3831V23.8342H82.2988V24.7783C82.5542 24.4499 82.8781 24.1945 83.2704 24.012C83.6717 23.8205 84.1096 23.7247 84.584 23.7247Z"" fill=""#8D37FF""></path>
<path d=""M91.6602 25.4078V29.075C91.6602 29.3304 91.7195 29.5174 91.8381 29.636C91.9658 29.7455 92.1756 29.8002 92.4676 29.8002H93.357V31.4149H92.1528C90.5382 31.4149 89.7308 30.6304 89.7308 29.0613V25.4078H88.8277V23.8342H89.7308V21.9595H91.6602V23.8342H93.357V25.4078H91.6602Z"" fill=""#8D37FF""></path>
<path d=""M101.987 23.8342L97.2937 35H95.2549L96.8969 31.2233L93.8591 23.8342H96.0075L97.9642 29.1297L99.9483 23.8342H101.987Z"" fill=""#8D37FF""></path>
<path d=""M103.868 31.5107C103.522 31.5107 103.234 31.4058 103.006 31.196C102.787 30.977 102.678 30.7079 102.678 30.3886C102.678 30.0693 102.787 29.8048 103.006 29.595C103.234 29.376 103.522 29.2666 103.868 29.2666C104.206 29.2666 104.484 29.376 104.703 29.595C104.922 29.8048 105.031 30.0693 105.031 30.3886C105.031 30.7079 104.922 30.977 104.703 31.196C104.484 31.4058 104.206 31.5107 103.868 31.5107Z"" fill=""#8D37FF""></path>
<path d=""M6.17049 16.3547C5.105 16.3547 4.14167 16.1722 3.28051 15.8073C2.43395 15.4424 1.76254 14.917 1.26628 14.231C0.770023 13.545 0.514596 12.7349 0.5 11.8008H3.78407C3.82786 12.4284 4.0468 12.9246 4.44088 13.2895C4.84957 13.6544 5.40421 13.8369 6.10481 13.8369C6.82001 13.8369 7.38195 13.669 7.79063 13.3333C8.19932 12.983 8.40366 12.5305 8.40366 11.9759C8.40366 11.5234 8.265 11.1512 7.98768 10.8593C7.71036 10.5674 7.36006 10.3412 6.93678 10.1806C6.52809 10.0055 5.95885 9.81571 5.22906 9.61137C4.23654 9.31945 3.42647 9.03483 2.79885 8.75751C2.18582 8.46559 1.65307 8.03501 1.2006 7.46577C0.762726 6.88194 0.543788 6.10836 0.543788 5.14503C0.543788 4.24009 0.770024 3.45191 1.2225 2.7805C1.67497 2.10909 2.30989 1.59824 3.12726 1.24794C3.94462 0.88304 4.87876 0.700592 5.92966 0.700592C7.50602 0.700592 8.78315 1.08738 9.76108 1.86096C10.7536 2.61995 11.3009 3.68545 11.4031 5.05746H8.03147C8.00228 4.53201 7.77604 4.10143 7.35276 3.76572C6.94407 3.41542 6.39673 3.24027 5.71072 3.24027C5.11229 3.24027 4.63063 3.39353 4.26573 3.70004C3.91543 4.00655 3.74028 4.45173 3.74028 5.03556C3.74028 5.44425 3.87165 5.78725 4.13437 6.06457C4.41169 6.3273 4.7474 6.54624 5.14149 6.72139C5.55017 6.88194 6.11941 7.07169 6.8492 7.29062C7.84172 7.58254 8.65179 7.87446 9.27941 8.16638C9.90704 8.45829 10.4471 8.89617 10.8996 9.48C11.352 10.0638 11.5783 10.8301 11.5783 11.7789C11.5783 12.5962 11.3666 13.3552 10.9433 14.0558C10.5201 14.7564 9.89974 15.3184 9.08237 15.7416C8.265 16.1503 7.29438 16.3547 6.17049 16.3547Z"" fill=""#09072F""></path>
<path d=""M17.8043 6.59004V12.4576C17.8043 12.8663 17.8992 13.1655 18.0889 13.3552C18.2933 13.5304 18.629 13.6179 19.096 13.6179H20.5191V16.2014H18.5925C16.009 16.2014 14.7173 14.9462 14.7173 12.4357V6.59004H13.2723V4.07226H14.7173V1.07281H17.8043V4.07226H20.5191V6.59004H17.8043Z"" fill=""#09072F""></path>
<path d=""M34.1742 4.07224V16.2014H31.0872V14.6688C30.6931 15.1943 30.1749 15.6103 29.5327 15.9168C28.9051 16.2087 28.2191 16.3547 27.4747 16.3547C26.526 16.3547 25.6867 16.1576 24.9569 15.7635C24.2271 15.3549 23.6506 14.7637 23.2273 13.9901C22.8186 13.202 22.6143 12.2678 22.6143 11.1877V4.07224H25.6794V10.7499C25.6794 11.7132 25.9202 12.4576 26.4019 12.983C26.8836 13.4939 27.5404 13.7493 28.3723 13.7493C29.2189 13.7493 29.883 13.4939 30.3647 12.983C30.8463 12.4576 31.0872 11.7132 31.0872 10.7499V4.07224H34.1742Z"" fill=""#09072F""></path>
<path d=""M36.4103 10.093C36.4103 8.86699 36.6511 7.7796 37.1328 6.83086C37.629 5.88213 38.3004 5.15234 39.147 4.64149C39.9936 4.13063 40.935 3.8752 41.9713 3.8752C42.7595 3.8752 43.5112 4.05035 44.2264 4.40065C44.9416 4.73636 45.5108 5.18883 45.9341 5.75807V0H49.043V16.2014H45.9341V14.4061C45.5546 15.0045 45.0218 15.4862 44.3358 15.8511C43.6498 16.216 42.8544 16.3985 41.9494 16.3985C40.9277 16.3985 39.9936 16.1357 39.147 15.6103C38.3004 15.0848 37.629 14.3477 37.1328 13.399C36.6511 12.4357 36.4103 11.3337 36.4103 10.093ZM45.956 10.1368C45.956 9.39244 45.81 8.75752 45.5181 8.23207C45.2262 7.69202 44.8321 7.28334 44.3358 7.00602C43.8396 6.7141 43.3068 6.56814 42.7376 6.56814C42.1683 6.56814 41.6429 6.7068 41.1612 6.98412C40.6796 7.26144 40.2855 7.67013 39.979 8.21017C39.687 8.73563 39.5411 9.36325 39.5411 10.093C39.5411 10.8228 39.687 11.4651 39.979 12.0197C40.2855 12.5597 40.6796 12.9757 41.1612 13.2676C41.6575 13.5596 42.1829 13.7055 42.7376 13.7055C43.3068 13.7055 43.8396 13.5669 44.3358 13.2895C44.8321 12.9976 45.2262 12.5889 45.5181 12.0635C45.81 11.5234 45.956 10.8812 45.956 10.1368Z"" fill=""#09072F""></path>
<path d=""M63.3119 9.87411C63.3119 10.312 63.2827 10.7061 63.2244 11.0564H54.3574C54.4304 11.9321 54.7369 12.6181 55.2769 13.1144C55.817 13.6106 56.4811 13.8588 57.2692 13.8588C58.4077 13.8588 59.2178 13.3698 59.6995 12.3919H63.0054C62.6551 13.5596 61.9837 14.5229 60.9912 15.2819C59.9987 16.0263 58.7799 16.3985 57.3349 16.3985C56.1673 16.3985 55.1164 16.143 54.1822 15.6322C53.2627 15.1067 52.5402 14.3696 52.0147 13.4209C51.5039 12.4722 51.2485 11.3775 51.2485 10.1368C51.2485 8.88159 51.5039 7.77961 52.0147 6.83087C52.5256 5.88214 53.2408 5.15235 54.1603 4.6415C55.0799 4.13064 56.1381 3.87521 57.3349 3.87521C58.488 3.87521 59.517 4.12334 60.422 4.6196C61.3415 5.11586 62.0494 5.82376 62.5457 6.7433C63.0565 7.64824 63.3119 8.69185 63.3119 9.87411ZM60.1373 8.99836C60.1227 8.21018 59.8381 7.58256 59.2835 7.11549C58.7288 6.63383 58.0501 6.393 57.2474 6.393C56.4884 6.393 55.8462 6.62653 55.3207 7.0936C54.8098 7.54607 54.496 8.18099 54.3793 8.99836H60.1373Z"" fill=""#09072F""></path>
<path d=""M72.2706 3.89709C73.7156 3.89709 74.8833 4.35686 75.7736 5.2764C76.664 6.18134 77.1091 7.45118 77.1091 9.08592V16.2014H74.044V9.5019C74.044 8.53857 73.8032 7.80148 73.3215 7.29062C72.8398 6.76517 72.183 6.50245 71.3511 6.50245C70.5045 6.50245 69.8331 6.76517 69.3368 7.29062C68.8552 7.80148 68.6143 8.53857 68.6143 9.5019V16.2014H65.5492V4.07224H68.6143V5.58291C69.023 5.05746 69.5412 4.64877 70.1688 4.35686C70.811 4.05034 71.5116 3.89709 72.2706 3.89709Z"" fill=""#09072F""></path>
<path d=""M83.5926 6.59004V12.4576C83.5926 12.8663 83.6875 13.1655 83.8772 13.3552C84.0816 13.5304 84.4173 13.6179 84.8843 13.6179H86.3074V16.2014H84.3808C81.7973 16.2014 80.5056 14.9462 80.5056 12.4357V6.59004H79.0606V4.07226H80.5056V1.07281H83.5926V4.07226H86.3074V6.59004H83.5926Z"" fill=""#09072F""></path>
</g>
<defs>
<clipPath id=""clip0_2_5"">
<rect width=""105"" height=""35"" fill=""white"" transform=""translate(0.5)""></rect>
</clipPath>
</defs>
</svg>      
<div class=""email-verification"" style=""display: flex; flex-direction: column; align-items: center; padding: 50px 30px; gap: 15px; background: #FFFFFF; border-radius: 5px;"">
<svg class=""icon"" width=""50"" height=""50"" viewBox=""0 0 50 50"" fill=""none"" xmlns=""http://www.w3.org/2000/svg"">
<path d=""M37.5 26.25V17.5C37.5 16.837 37.2366 16.2011 36.7678 15.7322C36.2989 15.2634 35.663 15 35 15H15C14.337 15 13.7011 15.2634 13.2322 15.7322C12.7634 16.2011 12.5 16.837 12.5 17.5V32.5C12.5 33.875 13.625 35 15 35H25"" stroke=""#8D37FF"" stroke-linecap=""round"" stroke-linejoin=""round""></path>
<path d=""M37.5 18.75L26.2875 25.875C25.9016 26.1168 25.4554 26.245 25 26.245C24.5446 26.245 24.0984 26.1168 23.7125 25.875L12.5 18.75"" stroke=""#8D37FF"" stroke-linecap=""round"" stroke-linejoin=""round""></path>
<path d=""M30 33.75L32.5 36.25L37.5 31.25"" stroke=""#8D37FF"" stroke-linecap=""round"" stroke-linejoin=""round""></path>
<rect x=""0.5"" y=""0.5"" width=""49"" height=""49"" rx=""24.5"" stroke=""#8D37FF""></rect>
</svg>           
<div class=""verify-text"" style=""font-family: 'Poppins'; font-style: normal; font-weight: 500; font-size: 16px; line-height: 19px; color: #09072F;"">Verify your email address</div>
            <div class=""vertical-line"" style=""height: 1px; width: -webkit-fill-available; background: #D9D9D9;""></div>
            <div class=""note"" style=""font-family: 'Poppins'; font-style: normal; font-weight: 400; font-size: 10px; line-height: 12px; text-align: center; color: #09072F; max-width: 250px;"">In order to make use of your Student County account, kindly verify your email address.</div>
            <a class=""a-btn"" href=""{url}"" style=""width: -webkit-fill-available;""><button class=""btn"" style=""cursor: pointer; padding: 10px 20px; width: -webkit-fill-available; border: 1.25px solid #09072F; border-radius: 5px; box-shadow: 3px 3px 0 #09072F; text-transform: capitalize; font-family: 'Poppins'; font-size: 12px; font-weight: 500; transition: 300ms ease; display: flex; align-items: center; position: relative; background-color: #8D37FF!important; color: white !important; justify-content: center;"">Verify Email Address</button></a>
        </div>
        <div class=""note-error"" style=""font-family: 'Poppins'; font-style: italic; font-weight: 400; font-size: 10px; line-height: 12px; text-align: center; color: #2C2750; max-width: 250px;"">If you didn't create this account, please reach out to support@student-county.com to request the deletion of your account.</div>
        <div class=""copyright"" style=""font-family: 'Inter'; font-style: normal; font-weight: 500; font-size: 10px; line-height: 12px; text-align: center; color: #09072F;"">©️ Student County 2023</div>
    </div>");

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
