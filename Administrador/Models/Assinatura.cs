using System.ComponentModel.DataAnnotations; 
using System.ComponentModel.DataAnnotations.Schema;

namespace ControllHub.Administrador.Models;

public class Assinatura
{
    public int Id{get; set;}
    [Required]
    public int empresaId {get; set;}
    public Empresa Empresa {get; set;} = null!;
    [Required]
    public int PlanoId {get; set;}
    public Plano Plano {get; set;} = null!;
    [Column(TypeName = "decimal(18,2)")]
    public decimal ValorMensal {get; set;}

    public DateTime DataInicio {get; set;}
    public DateTime? DataFim {get; set;}

    [Range(1,31)]
    public int DiaVencimento {get; set;}
    [Column(TypeName ="decimal(5,2)")]
    public decimal PercentualReajustAnual {get; set;}
    public int? AnoUltimoReajuste {get; set;}

    public bool Ativa {get; set;} = true;
    public DateTime? DataCancelamnento {get; set;}
    [MaxLength(500)]
    public string? MotivoCancelamento {get; set;}

    public DateTime DataCadastro {get; set;} = DateTime.UtcNow;

}
