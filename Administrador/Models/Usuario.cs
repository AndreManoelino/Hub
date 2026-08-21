using System.ComponentModel.DataAnnotations;
using ControllHub.Administrador.Enums;

namespace ControllHub.Administrador.Models;

public class Usuario
{
    public int Id { get; set; }

    [Required]
    [MaxLength(150)]
    public string Nome { get; set; } = string.Empty;

    [Required]
    [MaxLength(11)]
    public string CPF { get; set; } = string.Empty;

    public DateTime? DataNascimento { get; set; }

    [Required]
    [MaxLength(150)]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string SenhaHash { get; set; } = string.Empty;

    public PerfilUsuario Perfil { get; set; }

    public int? EmpresaId { get; set; }

    public Empresa? Empresa { get; set; }

    public bool Ativo { get; set; } = true;

    public DateTime DataCadastro { get; set; } = DateTime.Now;
}