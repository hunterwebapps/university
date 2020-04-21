using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using University.Business.Users;
using University.Models.User.ViewModels;

namespace University.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager _userManager;

        public UsersController(UserManager userManager)
        {
            _userManager = userManager;
        }

        [HttpGet("{userId}", Name = nameof(GetUser))]
        [ProducesResponseType(200, Type = typeof(User))]
        public async Task<IActionResult> GetUser(string userId)
        {
            var model = await _userManager.GetUserAsync(userId);

            return Ok(model);
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(List<User>))]
        public async Task<IActionResult> GetUsers()
        {
            var models = await _userManager.GetUsersAsync();

            return Ok(models);
        }
    }
}
