using Student_County.DAL;
using System.Security.Cryptography;

namespace Student_County.BusinessLogic.Helpers.Common
{
    public class Security
    {
        public static string ComputeHash(byte[] bytesToHash, byte[] salt)
        {
            var byteResult = new Rfc2898DeriveBytes(bytesToHash, salt, 10000);
            return Convert.ToBase64String(byteResult.GetBytes(24));
        }
        public static string GenerateSalt()
        {
            return "SCSaltENcR!";
        }
    
    }
}
