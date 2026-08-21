namespace ControllHub.Administrador.DTOs.Usuario;

public class AtualizarUsuarioDto
{
    public string Nome { get; set; } = string.Empty;

    public DateTime? DataNascimento { get; set; }

    public string Email { get; set; } = string.Empty;
}