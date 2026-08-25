
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ControllHub.Administrador.Models;

public class PlanoValor
{
    public int Id { get; set; }

    // Plano ao qual este valor pertence
    [Required]
    public int PlanoId { get; set; }

    public Plano Plano { get; set; } = null!;

    // Valor mensal vigente neste período
    [Column(TypeName = "decimal(18,2)")]
    public decimal ValorMensal { get; set; }

    // Percentual de reajuste aplicado sobre o valor anterior
    [Column(TypeName = "decimal(5,2)")]
    public decimal PercentualReajuste { get; set; }

    // Início da vigência deste valor
    [Required]
    public DateTime DataInicioVigencia { get; set; }

    // Fim da vigência deste valor
    // Nulo enquanto este for o valor vigente
    public DateTime? DataFimVigencia { get; set; }

    // Indica se este é o valor atualmente vigente
    public bool Ativo { get; set; } = true;

    // Data de criação do registro
    public DateTime DataCadastro { get; set; } = DateTime.UtcNow;
}
