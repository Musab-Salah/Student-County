using Microsoft.AspNetCore.Mvc;
using Student_County.BusinessLogic.Destination;

namespace Student_County.API.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class DestinationController : ControllerBase
    {
        private readonly IDestinationManager _manager;
        public DestinationController(IDestinationManager manager)
        {
            _manager = manager;
        }
        [HttpGet]
        public async Task<IActionResult> Index() => Ok(await _manager.GetAll());

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] DestinationBo bo)
        {
            if (ModelState.IsValid)
                return Ok(await _manager.CreateUpdate(bo));
            return BadRequest("Wrong Information");
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _manager.Delete(id);
            return Ok("Is Deleted");
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id) => Ok(await _manager.GetDestination(id));

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody] DestinationBo bo, [FromRoute] int id)
        {
            if (bo == null)
                return BadRequest("Destination Not Found");
            if (!bo.IsDeleted)
                return Ok(await _manager.CreateUpdate(bo, id));
            return NotFound("Destination Is Deleted");
        }
    }
}
