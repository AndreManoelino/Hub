using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ControllHub.Administrador.Models;
using Microsoft.IdentityModel.Tokens;

namespace ControllHub.Administrador.Helpers;

public class JwtHelper
{
    private readonly IConfiguration _configuration;

    public JwtHelper(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public (string Token, DateTime Expiracao) GerarToken(
        Usuario usuario,
        string nomeEmpresa)
    {
        var jwtSettings = _configuration.GetSection("JwtSettings");

        var secretKey = jwtSettings["SecretKey"]
            ?? throw new InvalidOperationException(
                "A chave JWT não foi configurada."
            );

        var issuer = jwtSettings["Issuer"];
        var audience = jwtSettings["Audience"];

        var expirationMinutes =
            int.TryParse(jwtSettings["ExpirationMinutes"], out var minutos)
                ? minutos
                : 1440;

        var expiracao = DateTime.UtcNow.AddMinutes(expirationMinutes);

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, usuario.Id.ToString()),
            new(JwtRegisteredClaimNames.UniqueName, usuario.Nome),
            new(JwtRegisteredClaimNames.Email, usuario.Email),
            new("cpf", usuario.CPF),
            new("perfil", usuario.Perfil.ToString()),
            new("perfilId", ((int)usuario.Perfil).ToString()),
            new Claim(
                "empresaId",
                usuario.EmpresaId?.ToString() ?? string.Empty
            ),
            new("empresaNome", nomeEmpresa)
        };

        var chave = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(secretKey)
        );

        var credenciais = new SigningCredentials(
            chave,
            SecurityAlgorithms.HmacSha256
        );

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: expiracao,
            signingCredentials: credenciais
        );

        return (
            new JwtSecurityTokenHandler().WriteToken(token),
            expiracao
        );
    }
}