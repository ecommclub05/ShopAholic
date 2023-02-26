using API.Data;
using API.Middleware;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);                                                       // Create the builder

// Add services to the container.

builder.Services.AddControllers();                                                                      // Add Controllers to the container
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();                                                             // Add EndpointsApiExplorer to the container
builder.Services.AddSwaggerGen();                                                                       // Add SwaggerGen to the container
builder.Services.AddDbContext<StoreContext>(opt =>                                                      // Add StoreContext to the container
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));                      // Use Sqlite for the database            
});
builder.Services.AddCors();                                                                            // Add Cors to the container

var app = builder.Build();                                                                            // Build the app

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();                                                                // Use the ExceptionMiddleware

if (app.Environment.IsDevelopment())                                                                    
{
    app.UseSwagger();                                                                            // Use Swagger
    app.UseSwaggerUI();                                                                         // Use SwaggerUI
}

app.UseCors(opt =>                                                                                    // Use Cors
{
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000");  // Allow any header, any method, allow credentials, and allow the origin of http://localhost:3000
});

app.UseAuthorization();                                                                            // Use Authorization

app.MapControllers();                                                                               // Map Controllers

var scope = app.Services.CreateScope();                                                        // Create a scope
var context = scope.ServiceProvider.GetRequiredService<StoreContext>();                        // Get the StoreContext from the scope
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();                      // Get the ILogger from the scope
try                                                                                          // Try to migrate the database
{
    context.Database.Migrate();     
    DbInitializer.Initialize(context);                                                         // Initialize the database
}
catch (Exception ex)                                                                    // If there is an exception then log the exception
{
    logger.LogError(ex, "A problem occurred during migration");                 // Log the exception
}

app.Run();                                                                                // Run the app
