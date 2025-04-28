# c968713a-8ba7-4dee-a466-4d5dd3739fb9-c8759ef6-f9a5-4a2c-a72a-15a27506136e
https://sonarcloud.io/summary/overall?id=iamneo-production_c968713a-8ba7-4dee-a466-4d5dd3739fb9-c8759ef6-f9a5-4a2c-a72a-15a27506136e

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Data;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
 
namespace dotnetapp.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;
 
        public AuthService(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration,
            ApplicationDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _context = context;
        }
 
        // Simplified registration method.
        public async Task<(int, string)> Register(User model)
        {
            // Check if a user with the provided email already exists.
            var foundUser = await _userManager.FindByEmailAsync(model.Email);
            if (foundUser != null)
            {
                Console.WriteLine($"[Register] User already exists for email: {model.Email}");
                return (0, "User already exists");
            }
 
            // Create the ASP.NET Identity user.
            var user = new ApplicationUser
            {
                UserName = model.Username,
                Email = model.Email,
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                Console.WriteLine($"[Register] User creation failed for '{model.Email}'.");
                return (0, "User creation failed! Please check user details and try again.");
            }
 
            // Ensure the role exists before assigning it.
            if (!await _roleManager.RoleExistsAsync(model.UserRole))
            {
                await _roleManager.CreateAsync(new IdentityRole(model.UserRole));
            }
            await _userManager.AddToRoleAsync(user, model.UserRole);
 
            // Add a custom user record in your application-specific database.
            var customUser = new User
            {
                Username = model.Username,
                Email = model.Email,
                MobileNumber = model.MobileNumber,
                Password = model.Password,
                UserRole = model.UserRole
            };
            _context.Users.Add(customUser);
            await _context.SaveChangesAsync();
 
            Console.WriteLine($"[Register] User '{model.Email}' created successfully.");
            return (1, "User created successfully!");
        }
 
        // Simplified login to generate a JWT token.
        public async Task<(int, string)> Login(LoginModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                Console.WriteLine($"[Login] Invalid email: {model.Email}");
                return (0, "Invalid email");
            }
 
            var customUser = _context.Users.FirstOrDefault(u => u.Email == model.Email);
            if (customUser == null)
            {
                Console.WriteLine($"[Login] User not found in the database: {model.Email}");
                return (0, "User not found in the database");
            }
 
            var role = await _userManager.GetRolesAsync(user);
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.NameIdentifier, customUser.UserId.ToString()),
                new Claim(ClaimTypes.Role, role.FirstOrDefault() ?? "User"),
            };
 
            var token = GenerateToken(claims);
            Console.WriteLine($"[Login] JWT token generated for '{model.Email}'.");
            return (1, token);
        }
 
        // Helper: Token Generation
        private string GenerateToken(IEnumerable<Claim> claims)
        {
            // WARNING: Ensure that the JWT secret key is obtained from a secure source (e.g., an environment variable or a secret manager)
            var secretKey = _configuration["JWT:SecretKey"];
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:Issuer"],
                audience: _configuration["JWT:Issuer"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(30),
                signingCredentials: creds
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
 
 
 
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using dotnetapp.Data;
using dotnetapp.Models;
using dotnetapp.Services;
using System;
using System.IO;
// using log4net;
 
 
// var logger = LogManager.GetLogger(typeof(Program));
// logger.Info("Application started - testing log creation.");
 
// // At the very start of your Main method, add:
// Console.WriteLine("Current working directory: " + Directory.GetCurrentDirectory());
 
var builder = WebApplication.CreateBuilder(args);
 
// Add log4net support (ensure the log4net.config file is in your project root)
// builder.Logging.AddLog4Net(".config/log4net.config");
 
 
// Add Controllers
builder.Services.AddControllers();
 
// Add DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("conn")));
 
// Add Identity
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();
 
// Configure JSON options (preserve property names)
builder.Services.AddMvc().AddJsonOptions(options =>
    options.JsonSerializerOptions.PropertyNamingPolicy = null);
 
// Add Authentication - JWT
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    var key = Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"]);
 
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Issuer"],
        IssuerSigningKey = new SymmetricSecurityKey(key)
    };
 
    // Allow SignalR to retrieve the JWT token from the query string.
    // options.Events = new JwtBearerEvents
    // {
    //     OnMessageReceived = context =>
    //     {
    //         var accessToken = context.Request.Query["access_token"];
    //         var path = context.HttpContext.Request.Path;
    //         if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/chatHub"))
    //         {
    //             context.Token = accessToken;
    //         }
    //         return Task.CompletedTask;
    //     }
    // };
});
 
// Update CORS policy to allow specific origins and credentials
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.WithOrigins("https://8081-dedadddddbafecbafcedadafebfecdebbceacfecbecaeebe.premiumproject.examly.io",
                           "https://8081-ceaeccbebfffaedadafebfecdebbceacfecbecaeebe.premiumproject.examly.io",
                           "https://8081-cdebaaabaaceadafebfecdebbceacfecbecaeebe.premiumproject.examly.io",
                           "https://8081-abfbbbdabfccfffadafebfecdebbceacfecbecaeebe.premiumproject.examly.io",
                           "https://8081-cebeddbfbadafebfecdebbceacfecbecaeebe.premiumproject.examly.io",
                           "https://8081-dedadddddbafecbafcedadafebfecdebbceacfecbecaeebe.premiumproject.examly.io",
                           "https://8081-dfaadbbbbbadafebfecdebbceacfecbecaeebe.premiumproject.examly.io")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});
 
// Swagger + JWT Support
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
 
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter 'Bearer' followed by a space and your token."
    });
 
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            },
            Array.Empty<string>()
        }
    });
});
 
// Register custom services
builder.Services.AddTransient<IAuthService, AuthService>();
builder.Services.AddTransient<AnnouncementService>();
builder.Services.AddTransient<BlogPostService>();
builder.Services.AddScoped<FeedbackService>();
//builder.Services.AddTransient<IEmailService, EmailService>();
 
builder.Services.AddEndpointsApiExplorer();
 
// Register SignalR services
builder.Services.AddSignalR();
 
var app = builder.Build();
 
// Middleware configuration
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
 
app.UseHttpsRedirection();
 
// Use the specific CORS policy defined above
app.UseCors("AllowSpecificOrigin");
 
app.UseAuthentication();
app.UseAuthorization();
 
app.MapControllers();
 
// Map SignalR hub endpoint.
// app.MapHub<ChatHub>("/chatHub");
 
app.Run();
 
 
using dotnetapp.Models;
using System.Threading.Tasks;
namespace dotnetapp.Services
{
    public interface IAuthService
    {
        // Simplified registration flow:
        Task<(int, string)> Register(User model);
 
        // Simplified login flow:
        Task<(int, string)> Login(LoginModel model);
    }
}
 
 