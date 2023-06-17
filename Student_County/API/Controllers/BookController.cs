using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Student_County.BusinessLogic.Auth.Models;
using Student_County.BusinessLogic.Book;
using Student_County.BusinessLogic.Helpers.Common;
using System.Data;
using System.Security.Claims;

namespace Student_County.API.Controller
{
    [Route("[controller]/[action]")]
    [ApiController]
    [Authorize(Roles = "Student,Dentistry Student,Admin")]
    public class BookController : ControllerBase
    {
        private readonly IBookManager _manager;

        public BookController(IBookManager manager)
        {
            _manager = manager;

        }
        [HttpGet]
        public async Task<IActionResult> Index() => Ok(await _manager.GetAll());

        [HttpGet]
        public async Task<IActionResult> GetMyAllBooks( string userid) => Ok(await _manager.GetMyAllBooks(userid));
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] BookBo bo)
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
        public async Task<IActionResult> Get([FromRoute]  int id) => Ok(await _manager.GetBook(id));

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody] BookBo bo, [FromRoute] int id)
        {
            if (bo == null)
                return BadRequest("BookStore Not Found");
            if (!bo.IsDeleted)
                return Ok(await _manager.CreateUpdate(bo, id));
            return NotFound("BookStore Is Deleted");
        }
    }
}
