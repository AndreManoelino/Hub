using ControllHub.Administrador.Enums;

namespace ControllHub.Administrador.DTOs.Autenticacao;

public class LoginResponseDto
{
    public string Token { get; set; } = string.Empty;

    public int UsuarioId { get; set; }

    public string Nome { get; set; } = string.Empty;

    public string CPF { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public PerfilUsuario Perfil { get; set; }

    public int? EmpresaId { get; set; }

    public string? NomeEmpresa { get; set; }

    public DateTime Expiracao { get; set; }
}