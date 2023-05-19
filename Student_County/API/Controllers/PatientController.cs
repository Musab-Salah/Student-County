using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Student_County.BusinessLogic.Auth.Models;
using Student_County.BusinessLogic.Patient;
using System.Data;

namespace Student_County.API.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]

    public class PatientController : ControllerBase
    {
        private readonly IPatientManager _manager;
        private readonly UserManager<ApplicationUser> _userManager;

        public PatientController(IPatientManager manager, UserManager<ApplicationUser> userManager)
        {
            _manager = manager;
            _userManager = userManager;
        }

        [Authorize(Roles = "Dentistry Student,Admin")]
        [HttpGet]
        public async Task<IActionResult> Index() => Ok(await _manager.GetAll());

        [Authorize(Roles = "Student,Admin,Patient")]
        [HttpGet]
        public async Task<IActionResult> GetMyAlPatients(string userid) => Ok(await _manager.GetMyAllPatients(userid));

        [Authorize(Roles = "Student,Admin,Patient")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] PatientBo bo)
        {
            var userName = _userManager.GetUserId(HttpContext.User);
            if (ModelState.IsValid)
                return Ok(await _manager.CreateUpdate(bo, userName));
            return BadRequest("Wrong Information");
        }

        [Authorize(Roles = "Dentistry Student,Student,Admin,Patient")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _manager.Delete(id);
            return Ok("Is Deleted");
        }

        [Authorize(Roles = "Student,Dentistry Student,Admin,Patient")]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] int id) => Ok(await _manager.GetPatient(id));

        [Authorize(Roles = "Student,Admin,Patient")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody] PatientBo bo, [FromRoute] int id)
        {
            var userName = _userManager.GetUserId(HttpContext.User);
            if (bo == null)
                return BadRequest("Patient Not Found");
            if (!bo.IsDeleted)
                return Ok(await _manager.CreateUpdate(bo, userName, id));
            return NotFound("Patient Is Deleted");
        }
    }
}
