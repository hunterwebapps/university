using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using University.Business.Auth;
using University.Business.Extensions;
using University.Models.Auth.BindingModels;

namespace University.API.Controllers
{
    [ApiController, Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthManager _authManager;

        public AuthController(AuthManager authManager)
        {
            _authManager = authManager;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(string))]
        public async Task<IActionResult> RenewToken()
        {
            var userId = User.GetUserId();
            
            var token = await _authManager.RenewToken(userId);

            return Ok(token);
        }

        [HttpPost]
        public async Task<IActionResult> AuthenticateUser(LoginCredentials loginCredentials)
        {
            var authenticatedUser = await _authManager.AuthenticateUserAsync(loginCredentials);

            return Ok(authenticatedUser);
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser(RegisterCredentials registerCredentials)
        {
            var user = await _authManager.RegisterUserAsync(registerCredentials);

            return CreatedAtRoute(
                nameof(UsersController.GetUser),
                new { userId = user.Id },
                user);
        }
    }
}
