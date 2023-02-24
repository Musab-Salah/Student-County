using Microsoft.AspNetCore.Mvc;
using Student_County.BusinessLogic.University;

namespace Student_County.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UniversityController : ControllerBase
    {
        private readonly IBookStoreManager _manager;
        public UniversityController(IBookStoreManager manager)
        {
            _manager = manager;
        }
        [HttpGet]
        public async Task<IActionResult> Index() =>  Ok(await _manager.GetAll());
        
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] BookStoreBo bo)
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
        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> Get(int id) => Ok(await _manager.GetUniversity(id));
        
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody] BookStoreBo bo, [FromRoute] int id)
        {
            if (bo == null)
                return BadRequest("University Not Found");
            if (!bo.IsDeleted)
                return Ok(await _manager.CreateUpdate(bo, id));
            return NotFound("University Is Deleted");
        }
    }
}
