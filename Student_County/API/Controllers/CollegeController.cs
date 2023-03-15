using Microsoft.AspNetCore.Mvc;
using Student_County.BusinessLogic.College;

namespace Student_County.API.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class CollegeController : ControllerBase
    {
        private readonly ICollegeManager _manager;
        public CollegeController(ICollegeManager manager)
        {
            _manager = manager;
        }
        [HttpGet]
        public async Task<IActionResult> Index() => Ok(await _manager.GetAll());

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CollegeBo bo)
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
        public async Task<IActionResult> Get(int id) => Ok(await _manager.GetCollege(id));

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody] CollegeBo bo, [FromRoute] int id)
        {
            if (bo == null)
                return BadRequest("College Not Found");
            if (!bo.IsDeleted)
                return Ok(await _manager.CreateUpdate(bo, id));
            return NotFound("College Is Deleted");
        }
    }
}
