using System.ComponentModel.DataAnnotations;
using ControllHub.Administrador.Enums;

namespace ControllHub.Administrador.Models;

public class Empresa
{
    public int Id { get; set; }

    [Required]
    [MaxLength(150)]
    public string NomeFantasia { get; set; } = string.Empty;

    [MaxLength(200)]
    public string? RazaoSocial { get; set; }

    public TipoDocumento TipoDocumento { get; set; }

    [MaxLength(11)]
    public string? CPF { get; set; }

    [MaxLength(14)]
    public string? CNPJ { get; set; }

    [MaxLength(20)]
    public string? InscricaoEstadual { get; set; }

    [Required]
    [MaxLength(150)]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [MaxLength(20)]
    public string? Telefone { get; set; }

    [MaxLength(20)]
    public string? Celular { get; set; }

    [MaxLength(8)]
    public string? CEP { get; set; }

    [MaxLength(100)]
    public string? Estado { get; set; }

    [MaxLength(100)]
    public string? Cidade { get; set; }

    [MaxLength(100)]
    public string? Bairro { get; set; }

    [MaxLength(200)]
    public string? Logradouro { get; set; }

    [MaxLength(20)]
    public string? Numero { get; set; }

    [MaxLength(100)]
    public string? Complemento { get; set; }

    public int PlanoId { get; set; }

    public Plano Plano { get; set; } = null!;

    public StatusEmpresa Status { get; set; } = StatusEmpresa.Ativa;

    public bool Ativo { get; set; } = true;

    public DateTime DataCadastro { get; set; } = DateTime.Now;

    public DateTime? DataAtualizacao { get; set; }

    public ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}