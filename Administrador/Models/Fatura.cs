
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ControllHub.Administrador.Enums;

namespace ControllHub.Administrador.Models;

public class Fatura
{
    public int Id { get; set; }

    // Empresa responsável pela cobrança
    [Required]
    public int EmpresaId { get; set; }

    public Empresa Empresa { get; set; } = null!;

    // Assinatura que originou esta cobrança
    [Required]
    public int AssinaturaId { get; set; }

    public Assinatura Assinatura { get; set; } = null!;

    // Plano utilizado para gerar esta fatura
    [Required]
    public int PlanoId { get; set; }

    public Plano Plano { get; set; } = null!;

    // Competência da cobrança
    [Required]
    public int AnoCompetencia { get; set; }

    [Required]
    [Range(1, 12)]
    public int MesCompetencia { get; set; }

    // Valor mensal do plano utilizado nesta competência
    [Column(TypeName = "decimal(18,2)")]
    public decimal ValorMensal { get; set; }

    // Valor calculado quando a cobrança for proporcional
    [Column(TypeName = "decimal(18,2)")]
    public decimal ValorProporcional { get; set; }

    // Valor final que deverá ser pago
    [Column(TypeName = "decimal(18,2)")]
    public decimal ValorTotal { get; set; }

    // Data de início do período cobrado
    [Required]
    public DateTime DataInicioPeriodo { get; set; }

    // Data de término do período cobrado
    [Required]
    public DateTime DataFimPeriodo { get; set; }

    // Data de vencimento da fatura
    [Required]
    public DateTime DataVencimento { get; set; }

    // Data em que a fatura foi criada
    public DateTime DataCadastro { get; set; } = DateTime.UtcNow;

    // Data em que a fatura foi paga
    public DateTime? DataPagamento { get; set; }

    // Status atual da fatura
    [Required]
    public StatusFatura Status { get; set; } = StatusFatura.Pendente;

    // Observação interna da cobrança
    [MaxLength(500)]
    public string? Observacao { get; set; }
}

