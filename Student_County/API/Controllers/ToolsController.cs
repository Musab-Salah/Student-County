using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Student_County.BusinessLogic.Auth.Models;
using Student_County.BusinessLogic.Tools;
using System.Data;

namespace Student_County.API.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    [Authorize(Roles = "Student,Dentistry Student,Admin")]

    public class ToolsController : ControllerBase
    {
        private readonly IToolsManager _manager;
        private readonly UserManager<ApplicationUser> _userManager;

        public ToolsController(IToolsManager manager, UserManager<ApplicationUser> userManager)
        {
            _manager = manager;
            _userManager = userManager;

        }
        [HttpGet]
        public async Task<IActionResult> Index() => Ok(await _manager.GetAll());

        [HttpGet]
        public async Task<IActionResult> GetMyAllTools(string userid) => Ok(await _manager.GetMyAllTools(userid));

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ToolsBo bo)
        {
            var userName = _userManager.GetUserId(HttpContext.User);
            if (ModelState.IsValid)
                return Ok(await _manager.CreateUpdate(bo, userName));
            return BadRequest("Wrong Information");
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _manager.Delete(id);
            return Ok("Is Deleted");
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] int id) => Ok(await _manager.GetTools(id));

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody] ToolsBo bo, [FromRoute] int id)
        {
            var userName = _userManager.GetUserId(HttpContext.User);
            if (bo == null)
                return BadRequest("Tools Not Found");
            if (!bo.IsDeleted)
                return Ok(await _manager.CreateUpdate(bo, userName, id));
            return NotFound("Tools Is Deleted");
        }
    }
}
