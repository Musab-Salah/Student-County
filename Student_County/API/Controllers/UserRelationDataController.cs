﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Student_County.BusinessLogic.Auth;
using Student_County.BusinessLogic.Auth.Models;
using Student_County.BusinessLogic.Book;
using Student_County.BusinessLogic.Helpers.Common;
using Student_County.BusinessLogic.Housing;
using Student_County.BusinessLogic.Patient;
using Student_County.BusinessLogic.Ride;
using Student_County.BusinessLogic.Tools;
using Student_County.DAL;
using System.Collections.Generic;

namespace Student_County.API.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    [Authorize(Roles = "Student,Dentistry Student,Admin,Patient")]
    public class UserRelationDataController : ControllerBase
    {
        private readonly IBookManager _bookmanager;
        private readonly IHousingManager _housingmanager;
        private readonly IPatientManager _patientmanager;
        private readonly IRideManager _ridemanager;
        private readonly IToolsManager _toolsmanager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        protected readonly StudentCountyContext _context;
        private readonly IAuthManager _authService;





        public UserRelationDataController(IAuthManager authService, IBookManager bookmanager, IHousingManager housingmanager, IPatientManager patientmanager, IRideManager ridemanager,
            IToolsManager toolsmanager, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, StudentCountyContext context)
        {
            _bookmanager = bookmanager;
            _housingmanager = housingmanager;
            _patientmanager = patientmanager;
            _ridemanager = ridemanager;
            _toolsmanager = toolsmanager;
            _userManager = userManager;
            _roleManager = roleManager;
            _context = context;
            _authService = authService;


        }
        [HttpGet]
        public async Task<IActionResult> GetMyAllData(string userid)
        {
             var user = await _context.UserRoles.FirstOrDefaultAsync(x=>x.UserId == userid);

            List<object> myList = new List<object>();
            if (user != null)
            {
                if (user.RoleId is not "398a104f-4e07-470c-9781-07d9852fb00d")//not patient
                {
                    var books = await _bookmanager.GetMyAllBooks(userid);
                    var housings = await _housingmanager.GetMyAllHousings(userid);
                    var rides = await _ridemanager.GetMyAllRides(userid);
                    var tools = await _toolsmanager.GetMyAllTools(userid);
                    myList.Add(books);
                    myList.Add(housings);
                    myList.Add(rides);
                    myList.Add(tools);
                }
                var patients = await _patientmanager.GetMyAllPatients(userid);
                myList.Add(patients);
                return Ok(myList);
            }
            else return BadRequest();


        }
        [HttpGet]
        public async Task<IActionResult> GetAllRecentActivity(string userid)
        {
            var user = await _context.UserRoles.FirstOrDefaultAsync(x => x.UserId == userid);

            List<object> myList = new List<object>();

            if (user != null)
            {
                if (user.RoleId is not "398a104f-4e07-470c-9781-07d9852fb00d")//not patient
                {
                    var books = await _bookmanager.GetMyAllBooksWithDeleted(userid);
                    var housings = await _housingmanager.GetMyAllHousingsWithDeleted(userid);
                    var rides = await _ridemanager.GetMyAllRidesWithDeleted(userid);
                    var tools = await _toolsmanager.GetMyAllToolsWithDeleted(userid);
                    myList.Add(books);
                    myList.Add(housings);
                    myList.Add(rides);
                    myList.Add(tools);
                }
                var patients = await _patientmanager.GetMyAllPatientsWithDeleted(userid);

                myList.Add(patients);
                return Ok(myList);
            }
            else return BadRequest();


        }
        [HttpGet]
        public async Task<IActionResult> GetUser(string userid)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userid);
            user.Password = Security.ComputeUnHash(user.Password);
            return Ok(user);

        }
        [HttpPut("{userid}")]
        public async Task<IActionResult> UpdateUser([FromBody] StudentRegisterModel user, [FromRoute] string userid)
        {
            if (user == null)
                return BadRequest("User Not Found");
            return Ok(await _authService.RegisterStudentAsync(user, userid));

        }
        [HttpGet]
        public async Task<IActionResult> GetPatient(string userid)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userid);
            user.Password = Security.ComputeUnHash(user.Password);
            return Ok(user);

        }
        [HttpPut("{userid}")]
        public async Task<IActionResult> UpdatePatient([FromBody] PatientRegisterModel user, [FromRoute] string userid)
        {
            if (user == null)
                return BadRequest("User Not Found");
            return Ok(await _authService.RegisterPatientAsync(user, userid));

        }
    }
}
