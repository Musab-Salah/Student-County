using Student_County.DAL;

namespace Student_County.BusinessLogic.Helpers.Common
{
    public class Security
    {
        protected readonly StudentCountyContext _context;
        public Security(StudentCountyContext context)
        {
            _context = context;
        }
        public static string Encrypt_Password(string password)
        {
            var password_encode = System.Text.Encoding.UTF8.GetBytes(password);
            var passwordstr = Convert.ToBase64String(password_encode);
            return passwordstr;
        }
   
    
    }
}
