using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using dotnetapp.Models;
using dotnetapp.Data;

namespace dotnetapp.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;

        public AuthService(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration,
            ApplicationDbContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _context = context;
        }

// //public async Task<(int, string)> Registration(User model, string role)
// {
//     // Check if user already exists
//     var userExists = await _userManager.FindByEmailAsync(model.Email);
//     if (userExists != null)
//         return (0, "User already exists");

//     // Create user
//     var user = new ApplicationUser
//     {
//         UserName = model.Email,
//         Email = model.Email,
//         SecurityStamp = Guid.NewGuid().ToString(),
//         Name = model.Name
//     };

//     var result = await _userManager.CreateAsync(user, model.Password);
//     if (!result.Succeeded)
//     {
//         var errors = string.Join(", ", result.Errors.Select(e => e.Description));
//         return (0, $"User creation failed! Errors: {errors}");
//     }

//     // Assign role
//     if (!await _roleManager.RoleExistsAsync(role))
//         await _roleManager.CreateAsync(new IdentityRole(role));

//     await _userManager.AddToRoleAsync(user, role);

//     return (1, "User created successfully!");
// }

        public async Task<(int, string)> Registration(User model, string role)
        {
            var userExists = await _userManager.FindByEmailAsync(model.Email);
            if (userExists != null)
                return (0, "User already exists");

            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                Name=model.Username
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return (0, "User creation failed! Please check user details and try again");

            if (!await _roleManager.RoleExistsAsync(role))
                await _roleManager.CreateAsync(new IdentityRole(role));

            await _userManager.AddToRoleAsync(user, role);

            return (1, "User created successfully!");
        }

        public async Task<(int, string)> Login(LoginModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return (0, "Invalid email");

            if (!await _userManager.CheckPasswordAsync(user, model.Password))
                return (0, "Invalid password");

            var userRoles = await _userManager.GetRolesAsync(user);
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Id)
            };
            claims.AddRange(userRoles.Select(role => new Claim(ClaimTypes.Role, role)));

            var token = GenerateToken(claims);
            return (1, token);
        }

        private string GenerateToken(IEnumerable<Claim> claims)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:Issuer"],
                audience: _configuration["JWT:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}