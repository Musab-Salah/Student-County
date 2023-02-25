using Microsoft.AspNetCore.Mvc;
using Student_County.BusinessLogic.Housing;

namespace Student_County.API.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class HousingController : ControllerBase
    {
        private readonly IHousingManager _manager;
        public HousingController(IHousingManager manager)
        {
            _manager = manager;
        }
        [HttpGet]
        public async Task<IActionResult> Index() => Ok(await _manager.GetAll());

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] HousingBo bo)
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
        public async Task<IActionResult> Get(int id) => Ok(await _manager.GetHousing(id));

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody] HousingBo bo, [FromRoute] int id)
        {
            if (bo == null)
                return BadRequest("Housing Not Found");
            if (!bo.IsDeleted)
                return Ok(await _manager.CreateUpdate(bo, id));
            return NotFound("Housing Is Deleted");
        }
    }
}
