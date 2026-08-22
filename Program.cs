using ControllHub.Data;
using Microsoft.EntityFrameworkCore;
using ControllHub.Administrador.Interfaces;
using ControllHub.Administrador.Services;
using ControllHub.Administrador.Helpers;
using ControllHub.Administrador.Repositories;
using ControllHub.Administrador.Models;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ===============================
// DATABASE
// ===============================

var connectionString =
    builder.Configuration.GetConnectionString("DefaultConnection");

if (string.IsNullOrWhiteSpace(connectionString))
{
    throw new InvalidOperationException(
        "A ConnectionString 'DefaultConnection' não foi encontrada."
    );
}

Console.WriteLine("==========================================");
Console.WriteLine("[DB] ConnectionString encontrada: True");
Console.WriteLine($"[DB] Tamanho: {connectionString.Length}");
Console.WriteLine("==========================================");

builder.Services.AddDbContext<ControllHubContext>(options =>
{
    options.UseNpgsql(
        connectionString,
        npgsqlOptions =>
        {
            npgsqlOptions.EnableRetryOnFailure(
                maxRetryCount: 5,
                maxRetryDelay: TimeSpan.FromSeconds(10),
                errorCodesToAdd: null
            );
        }
    );
});

// ===============================
// SERVICES
// ===============================

builder.Services.AddScoped<IEmpresaService, EmpresaService>();
builder.Services.AddScoped<IAutenticacaoService, AutenticacaoService>();
builder.Services.AddScoped<JwtHelper>();
builder.Services.AddScoped<IUsuarioService, UsuarioService>();
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<IPasswordHasher<Usuario>, PasswordHasher<Usuario>>();

// ===============================
// CORS
// ===============================

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:5173",
                "http://localhost:5174",
                "https://controllhub.onrender.com"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// ===============================
// SEED
// ===============================

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider
        .GetRequiredService<ControllHubContext>();

    await ControllHubSeed.InicializarAsync(
        context,
        builder.Configuration
    );
}

// ===============================
// SWAGGER
// ===============================

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ===============================
// MIDDLEWARE
// ===============================

app.UseCors("Frontend");


app.UseAuthorization();

app.MapControllers();

app.Run();