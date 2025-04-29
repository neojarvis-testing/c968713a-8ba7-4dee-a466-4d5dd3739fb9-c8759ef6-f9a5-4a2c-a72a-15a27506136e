using Microsoft.EntityFrameworkCore;
using dotnetapp.Data;
using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Identity; 
using Microsoft.Extensions.DependencyInjection; 
using System.Linq;
using System.Runtime.Intrinsics.X86;
using System.Text;
using System.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddDbContext<ApplicationDbContext>(e=>e.UseSqlServer(builder.Configuration.GetConnectionString("conn")));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"]))
        };
    });

builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 6;
    options.Password.RequireNonAlphanumeric = false;
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.WithOrigins("https://8081-ffbdddabdbdabbadfbfdaaedceffaacaaae.premiumproject.examly.io",
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


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowSpecificOrigin");
app.UseHttpsRedirection();
app.UseAuthentication();

app.UseAuthorization();
app.UseAuthentication();
app.MapControllers();

app.Run();