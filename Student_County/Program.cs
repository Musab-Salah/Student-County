using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Student_County.BusinessLogic.Auth;
using Student_County.BusinessLogic.BookStore;
using Student_County.BusinessLogic.Chat;
using Student_County.BusinessLogic.College;
using Student_County.BusinessLogic.Destination;
using Student_County.BusinessLogic.Housing;
using Student_County.BusinessLogic.Ride;
using Student_County.BusinessLogic.University;
using Student_County.DAL;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<IBookStoreManager, BookStoreManager>();
builder.Services.AddScoped<IUniversityManager, UniversityManager>();
builder.Services.AddScoped<IChatManager, ChatManager>();
builder.Services.AddScoped<ICollegeManager, CollegeManager>();
builder.Services.AddScoped<IDestinationManager, DestinationManager>();
builder.Services.AddScoped<IHousingManager, HousingManager>();
builder.Services.AddScoped<IRideManager, RideManager>();
//builder.Services.AddScoped<IStudentManager, StudentManager>();
builder.Services.Configure<JWT>(builder.Configuration.GetSection("JWT"));
builder.Services.AddScoped<IAuthManager, AuthManager>();



builder.Services.AddControllers();
builder.Services.AddIdentity<ApplicationUser, IdentityRole>().AddEntityFrameworkStores<StudentCountyContext>();

builder.Services.AddDbContext<StudentCountyContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("Connectionstring")));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(o =>
    {
        o.RequireHttpsMetadata = false;
        o.SaveToken = false;
        o.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidIssuer = builder.Configuration["JWT:Issuer"],
            ValidAudience = builder.Configuration["JWT:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"])),
            ClockSkew = TimeSpan.Zero
        };
    });


builder.Services.AddCors(options =>
    {

        options.AddDefaultPolicy(
            policy =>
            {
                policy.WithOrigins("http://localhost:3000")
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
    });
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseAuthentication();


app.MapControllers();

app.UseCors();

app.Run();