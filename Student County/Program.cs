using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Student_County.BusinessLogic.University;
using Student_County.DAL;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<IBookStoreManager, BookStoreManager>();
builder.Services.AddControllers();
builder.Services.AddDbContext<StudentCountyContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("Connectionstring")));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//builder.Services.AddControllers().AddJsonOptions(x =>
//                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
//builder.Services.AddCors((setup) =>
//{
//    setup.AddPolicy("defult", (options) =>
//    {

//        options.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin();
//    });
//});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();


app.Run();
