using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Services;
using System.Threading.Tasks;



namespace dotnetapp.Controllers
{
    [Route("api/")]
   
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthService _authService;
 
        public AuthenticationController(IAuthService authService)
        {
            _authService = authService;
        }
 
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var (statusCode, message) = await _authService.Login(model);
            if (statusCode == 200)
                return Ok(message);
                // return Ok(new { Message = "User login successfully"});
 
            return BadRequest(message);
        }
 
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User model)
        {
            System.Console.WriteLine(model.UserRole);
            var (statusCode, message) = await _authService.Registration(model, model.UserRole);
            if (statusCode == 200) 
                // return Ok(message);
                return Ok(new { Message = "User created successfully"});
 
            return StatusCode(statusCode, message);
        }
    }
}
 