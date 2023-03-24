using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Student_County.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Student,DentistryStudent,Admin")]
    public class SecuredController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetData()
        {
            return Ok("Hello from secured controller");
        }
    }
}
