using ControllHub.Administrador.Enums;

namespace ControllHub.Administrador.DTOs.Usuario;

public class CriarUsuarioDto
{
    public string Nome { get; set; } = string.Empty;

    public string CPF { get; set; } = string.Empty;

    public DateTime? DataNascimento { get; set; }

    public string Email { get; set; } = string.Empty;

    public string Senha { get; set; } = string.Empty;

    public PerfilUsuario Perfil { get; set; }

    public int EmpresaId { get; set; }
}