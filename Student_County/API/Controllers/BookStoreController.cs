using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Student_County.BusinessLogic.BookStore;
using System.Data;

namespace Student_County.API.Controller
{
    [Route("[controller]/[action]")]
    [ApiController]
    [Authorize(Roles = "Student,DentistryStudent,Admin")]
    public class BookStoreController : ControllerBase
    {
        private readonly IBookStoreManager _manager;
        public BookStoreController(IBookStoreManager manager)
        {
            _manager = manager;
        }
        [HttpGet]
        public async Task<IActionResult> Index() => Ok(await _manager.GetAll());

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
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id) => Ok(await _manager.GetBookStore(id));

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody] BookStoreBo bo, [FromRoute] int id)
        {
            if (bo == null)
                return BadRequest("BookStore Not Found");
            if (!bo.IsDeleted)
                return Ok(await _manager.CreateUpdate(bo, id));
            return NotFound("BookStore Is Deleted");
        }
    }
}
