using System.ComponentModel.DataAnnotations;

namespace Student_County.BusinessLogic.Auth.Models
{
    public class TokenRequestModel
    {

        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
