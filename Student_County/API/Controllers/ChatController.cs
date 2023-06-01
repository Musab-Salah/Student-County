﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Student_County.BusinessLogic.Auth.Models;
using Student_County.BusinessLogic.Chat;

namespace Student_County.API.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    //[Authorize(Roles = "Student,Dentistry Student,Admin,Patient")]
    public class ChatController : ControllerBase
    {
        private readonly IChatManager _manager;


        public ChatController(IChatManager manager)
        {
            _manager = manager;
        }
        [HttpGet]
        public async Task<IActionResult> GetMyAllChats(string userid) => Ok(await _manager.GetMyAllChats(userid));

        [HttpDelete]
        public async Task<IActionResult> Delete(string userid, string roomid)
        {
            await _manager.Delete(userid, roomid);
            return Ok("Is Deleted");
        }
    }
}
