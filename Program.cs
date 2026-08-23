using System.Text;
using ControllHub.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

using ControllHub.Administrador.Interfaces;
using ControllHub.Administrador.Services;
using ControllHub.Administrador.Helpers;
using ControllHub.Administrador.Repositories;
using ControllHub.Administrador.Models;

var builder = WebApplication.CreateBuilder(args);

// ============================================================
// CONTROLLERS
// ============================================================

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ============================================================
// DATABASE
// ============================================================

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

// ============================================================
// SERVICES
// ============================================================

builder.Services.AddScoped<IEmpresaService, EmpresaService>();
builder.Services.AddScoped<IAutenticacaoService, AutenticacaoService>();
builder.Services.AddScoped<JwtHelper>();

builder.Services.AddScoped<IUsuarioService, UsuarioService>();
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();

builder.Services.AddScoped<IPasswordHasher<Usuario>, PasswordHasher<Usuario>>();

// ============================================================
// JWT AUTHENTICATION
// ============================================================

var jwtSettings =
    builder.Configuration.GetSection("JwtSettings");

var secretKey = jwtSettings["SecretKey"];

if (string.IsNullOrWhiteSpace(secretKey))
{
    throw new InvalidOperationException(
        "JwtSettings:SecretKey não foi configurada."
    );
}

var issuer = jwtSettings["Issuer"];
var audience = jwtSettings["Audience"];

builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme =
            JwtBearerDefaults.AuthenticationScheme;

        options.DefaultChallengeScheme =
            JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters =
            new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,

                IssuerSigningKey =
                    new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(secretKey)
                    ),

                ValidateIssuer = true,
                ValidIssuer = issuer,

                ValidateAudience = true,
                ValidAudience = audience,

                ValidateLifetime = true,

                ClockSkew = TimeSpan.Zero
            };
    });

// ============================================================
// AUTHORIZATION
// ============================================================

builder.Services.AddAuthorization();

// ============================================================
// CORS
// ============================================================

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

// ============================================================
// BUILD
// ============================================================

var app = builder.Build();

// ============================================================
// SEED
// ============================================================

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider
        .GetRequiredService<ControllHubContext>();

    await ControllHubSeed.InicializarAsync(
        context,
        builder.Configuration
    );
}

// ============================================================
// SWAGGER
// ============================================================

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ============================================================
// MIDDLEWARE
// ============================================================

app.UseCors("Frontend");

// IMPORTANTE:
// Authentication vem ANTES de Authorization.
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();