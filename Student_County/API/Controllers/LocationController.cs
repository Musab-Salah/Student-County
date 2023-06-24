using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Student_County.BusinessLogic.Destination;
using System.Data;

namespace Student_County.API.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    [Authorize(Roles = "Student,Dentistry Student,Admin")]

    public class LocationController : ControllerBase
    {
        private readonly ILocationManager _manager;
        public LocationController(ILocationManager manager)
        {
            _manager = manager;
        }

        [HttpGet]
        public async Task<IActionResult> Index() => Ok(await _manager.GetAll());
        
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] LocationBo bo)
        {
            if (ModelState.IsValid)
                return Ok(await _manager.CreateUpdate(bo));
            return BadRequest("Wrong Information");
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _manager.Delete(id);
            return Ok("Is Deleted");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] int id) => Ok(await _manager.GetDestination(id));
        
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody] LocationBo bo, [FromRoute] int id)
        {
            if (bo == null)
                return BadRequest("Location Not Found");
            if (!bo.IsDeleted)
                return Ok(await _manager.CreateUpdate(bo, id));
            return NotFound("Location Is Deleted");
        }
    }
}
