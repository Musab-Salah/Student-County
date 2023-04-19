using Student_County.DAL;
using System.Security.Cryptography;

namespace Student_County.BusinessLogic.Helpers.Common
{
    public class Security
    {
        public static string ComputeHash(string password)
        {
            var password_encode = System.Text.Encoding.UTF8.GetBytes(password + "studcoun");
            return Convert.ToBase64String(password_encode);
        }     
    
    }
}
