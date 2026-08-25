
using System.ComponentModel.DataAnnotations;

namespace ControllHub.Administrador.DTOs.Assinatura;

public class CriarAssinaturaDto
{
    [Required]
    public int PlanoId { get; set; }

    [Required]
    public DateTime DataInicio { get; set; }

    [Range(1, 31)]
    public int DiaVencimento { get; set; }

    [Range(0, 100)]
    public decimal PercentualReajusteAnual { get; set; }
}

