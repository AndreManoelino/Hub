using System.ComponentModel.DataAnnotations;

namespace ControllHub.Administrador.Models;

public class Plano
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Nome { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? Descricao { get; set; }

    public decimal ValorMensal { get; set; }

    public int? LimiteUsuarios { get; set; }

    public int? LimiteAlunos { get; set; }

    public int? LimiteUnidades { get; set; }

    public bool Ativo { get; set; } = true;

    public DateTime DataCadastro { get; set; } = DateTime.Now;

    public ICollection<Empresa> Empresas { get; set; } = new List<Empresa>();
}