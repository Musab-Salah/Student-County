using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Student_County.BusinessLogic.Auth.Models;
using Student_County.BusinessLogic.BookStore;
using Student_County.BusinessLogic.Helpers.Common;
using System.Data;
using System.Security.Claims;

namespace Student_County.API.Controller
{
    [Route("[controller]/[action]")]
    [ApiController]
    [Authorize(Roles = "Student,Dentistry Student,Admin")]
    public class BookStoreController : ControllerBase
    {
        private readonly IBookStoreManager _manager;
        private readonly UserManager<ApplicationUser> _userManager;

        public BookStoreController(IBookStoreManager manager, UserManager<ApplicationUser> userManager)
        {
            _manager = manager;
            _userManager = userManager;

        }
        [HttpGet]
        public async Task<IActionResult> Index() => Ok(await _manager.GetAll());

        [HttpGet]
        public async Task<IActionResult> GetMyAllBooks( string userid) => Ok(await _manager.GetMyAllBooks(userid));
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] BookStoreBo bo)
        {
            var userName = _userManager.GetUserId(HttpContext.User);
            if (ModelState.IsValid)
                return Ok(await _manager.CreateUpdate(bo , userName));
            return BadRequest("Wrong Information");
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _manager.Delete(id);
            return Ok("Is Deleted");
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute]  int id) => Ok(await _manager.GetBookStore(id));

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody] BookStoreBo bo, [FromRoute] int id)
        {
            var userName = _userManager.GetUserId(HttpContext.User);
            if (bo == null)
                return BadRequest("BookStore Not Found");
            if (!bo.IsDeleted)
                return Ok(await _manager.CreateUpdate(bo, userName, id));
            return NotFound("BookStore Is Deleted");
        }
    }
}
