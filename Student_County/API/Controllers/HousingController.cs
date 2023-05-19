using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Student_County.BusinessLogic.Auth.Models;
using Student_County.BusinessLogic.Housing;
using System.Data;

namespace Student_County.API.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    [Authorize(Roles = "Student,Dentistry Student,Admin")]

    public class HousingController : ControllerBase
    {
        private readonly IHousingManager _manager;
        private readonly UserManager<ApplicationUser> _userManager;

        public HousingController(IHousingManager manager, UserManager<ApplicationUser> userManager)
        {
            _manager = manager;
            _userManager = userManager;

        }
        [HttpGet]
        public async Task<IActionResult> Index() => Ok(await _manager.GetAll());

        [HttpGet]
        public async Task<IActionResult> GetMyAllHousings(string userid) => Ok(await _manager.GetMyAllHousings(userid));


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] HousingBo bo)
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
        public async Task<IActionResult> Get([FromRoute] int id) => Ok(await _manager.GetHousing(id));

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody] HousingBo bo, [FromRoute] int id)
        {
            var userName = _userManager.GetUserId(HttpContext.User);
            if (bo == null)
                return BadRequest("Housing Not Found");
            if (!bo.IsDeleted)
                return Ok(await _manager.CreateUpdate(bo, userName, id));
            return NotFound("Housing Is Deleted");
        }
    }
}
