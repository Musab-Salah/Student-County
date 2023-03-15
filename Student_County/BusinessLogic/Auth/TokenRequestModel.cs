using System.ComponentModel.DataAnnotations;

namespace Student_County.BusinessLogic.Auth
{
    public class TokenRequestModel
    {
        [EmailAddress]
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
