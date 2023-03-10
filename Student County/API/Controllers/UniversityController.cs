using Microsoft.AspNetCore.Mvc;
using Student_County.BusinessLogic.University;

namespace Student_County.API.Controller
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class UniversityController : ControllerBase
    {
        private readonly IUniversityManager _manager;
        public UniversityController(IUniversityManager manager)
        {
            _manager = manager;
        }
        [HttpGet]
        public async Task<IActionResult> Index() =>  Ok(await _manager.GetAll());
        
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] UniversityBo bo)
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
        public async Task<IActionResult> Get(int id) => Ok(await _manager.GetUniversity(id));
        
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody] UniversityBo bo, [FromRoute] int id)
        {
            if (bo == null)
                return BadRequest("University Not Found");
            if (!bo.IsDeleted)
                return Ok(await _manager.CreateUpdate(bo, id));
            return NotFound("University Is Deleted");
        }
    }
}
