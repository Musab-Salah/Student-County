using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Student_County.BusinessLogic.Patient;
using System.Data;

namespace Student_County.API.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]

    public class PatientController : ControllerBase
    {
        private readonly IPatientManager _manager;
        public PatientController(IPatientManager manager)
        {
            _manager = manager;
        }

        [Authorize(Roles = "DentistryStudent,Admin")]
        [HttpGet]
        public async Task<IActionResult> Index() => Ok(await _manager.GetAll());

        [Authorize(Roles = "Student,Admin,Patient")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] PatientBo bo)
        {
            if (ModelState.IsValid)
                return Ok(await _manager.CreateUpdate(bo));
            return BadRequest("Wrong Information");
        }

        [Authorize(Roles = "Student,Admin,Patient")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _manager.Delete(id);
            return Ok("Is Deleted");
        }

        [Authorize(Roles = "Student,DentistryStudent,Admin,Patient")]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id) => Ok(await _manager.GetPatient(id));

        [Authorize(Roles = "Student,Admin,Patient")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody] PatientBo bo, [FromRoute] int id)
        {
            if (bo == null)
                return BadRequest("Patient Not Found");
            if (!bo.IsDeleted)
                return Ok(await _manager.CreateUpdate(bo, id));
            return NotFound("Patient Is Deleted");
        }
    }
}
