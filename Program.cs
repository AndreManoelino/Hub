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

builder.Services.AddDbContext<ControllHubContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

Console.WriteLine("==========================================");
Console.WriteLine($"[DB] ConnectionString encontrada: {!string.IsNullOrWhiteSpace(connectionString)}");
Console.WriteLine($"[DB] Tamanho: {connectionString?.Length ?? 0}");
Console.WriteLine("==========================================");

builder.Services.AddDbContext<ControllHubContext>(options =>
    options.UseNpgsql(connectionString)
);
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
                "http://localhost:5174"
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

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();