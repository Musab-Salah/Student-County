using Student_County.DAL;
using System.Security.Cryptography;
using System.Text;

namespace Student_County.BusinessLogic.Helpers.Common
{
    public class Security
    {
        public static string ComputeHash(string password)
        {
            bool hasAlphabetic = password.Any(char.IsLetter);

            if (!hasAlphabetic)
            {
                throw new ArgumentException("Password must contain at least one alphabetic character.");
            }

            var passwordBytes = Encoding.UTF8.GetBytes(password + "studcoun");
            return Convert.ToBase64String(passwordBytes);
        }


        public static string ComputeUnHash(string hashpassword)
        {
            var passwordBytes = Convert.FromBase64String(hashpassword);
            var originalPasswordBytes = new byte[passwordBytes.Length - 8]; 

            Array.Copy(passwordBytes, originalPasswordBytes, originalPasswordBytes.Length);

            return Encoding.UTF8.GetString(originalPasswordBytes);
        }

    }
}
