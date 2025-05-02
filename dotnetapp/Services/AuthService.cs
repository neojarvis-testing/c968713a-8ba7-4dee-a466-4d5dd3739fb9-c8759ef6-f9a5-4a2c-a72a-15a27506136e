using dotnetapp.Models;
using dotnetapp.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace dotnetapp.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;

        public AuthService(IConfiguration configuration, ApplicationDbContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        public async Task<(int, string)> Registration(User model, string role)
        {
            if (await _context.Users.AnyAsync(u => u.Email == model.Email))
            {
                return (400, "User already exists");
            }
            model.UserRole = role;
            _context.Users.Add(model);
            await _context.SaveChangesAsync();
            return (200, "User created successfully!");
        }


      public async Task<(int, string)> Login(LoginModel model)
{
    var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == model.Email);
    
    if (user == null || user.Password != model.Password)
        return (400, "Invalid Email or Password");
            
            var token = GenerateToken(user);
    

           return (200, JsonSerializer.Serialize(new { token ,  user.UserRole }));
}


        private string GenerateToken(User user)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Role, user.UserRole)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
