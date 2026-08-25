
using System.ComponentModel.DataAnnotations;

namespace ControllHub.Administrador.Models;

public class TipoEmpresa
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Nome { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string Codigo { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? Descricao { get; set; }

    public bool Ativo { get; set; } = true;

    public DateTime DataCadastro { get; set; } = DateTime.UtcNow;

    public ICollection<Empresa> Empresas { get; set; } = new List<Empresa>();
}
