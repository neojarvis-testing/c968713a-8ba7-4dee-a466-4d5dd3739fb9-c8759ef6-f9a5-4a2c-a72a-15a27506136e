using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;
using dotnetapp.Services;
using dotnetapp.Data;
 
var builder = WebApplication.CreateBuilder(args);
 
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("conn")));
 
// Configure authentication with JWT
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
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
 
// Add CORS policy configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("SpecificOriginsPolicy", builder =>
    {
        builder.WithOrigins("https://8081-ceeabaaafcbadfbfdaaedceffaacaaae.premiumproject.examly.io") // Replace with your front-end or
               .AllowAnyMethod()
               .AllowAnyHeader()
               .AllowCredentials();
    });
});
 
// https://8081-fcbbdabddbadffbefadcceffaacaaae.premiumproject.examly.io/
 
// Registering services
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<FeedbackService>();
builder.Services.AddScoped<LoanApplicationService>();
builder.Services.AddScoped<LoanService>();
 
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
 
var app = builder.Build();
 
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API v1"));
}
 
app.UseHttpsRedirection();
 
// Use the CORS policy
app.UseCors("SpecificOriginsPolicy");
 
app.UseAuthentication();
app.UseAuthorization();
 
 
app.MapControllers();
app.Run();
 
 
 
///https://8080-ceeabaaafcbadfbfdaaedceffaacaaae.premiumproject.examly.io/ Duhita
 
//https://8080-fddafbebadfbfdaaedceffaacaaae.premiumproject.examly.io/  Shreyas
 
//https://8080-afbccbebadfbfdaaedceffaacaaae.premiumproject.examly.io/ vasavi
 
//https://8080-fbdcdabdaeaacbadfbfdaaedceffaacaaae.premiumproject.examly.io/  Aditya
 
 //https://8080-ffbdddabdbdabbadfbfdaaedceffaacaaae.premiumproject.examly.io/  Subham
 
 