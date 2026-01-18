var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers(); // Controller'ları etkinleştir
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi(); // .NET 10'da Swagger yerine OpenAPI

// CORS ekle (React için)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy =>
        {
            policy.WithOrigins(
                    "http://localhost:3000",   // React (Create React App)
                    "http://localhost:5173",   // React (Vite)
                    "http://localhost:5004"    // API kendisi (test için)
                )
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi(); // Swagger UI benzeri
}

app.UseHttpsRedirection();
app.UseCors("AllowReact"); // CORS'u aktif et
app.UseAuthorization();
app.MapControllers(); // Controller route'larını etkinleştir

app.Run();