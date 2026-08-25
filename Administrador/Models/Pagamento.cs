
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ControllHub.Administrador.Enums;

namespace ControllHub.Administrador.Models;

public class Pagamento
{
    public int Id { get; set; }

    // Empresa que realizou o pagamento
    [Required]
    public int EmpresaId { get; set; }

    public Empresa Empresa { get; set; } = null!;

    // Fatura relacionada ao pagamento
    [Required]
    public int FaturaId { get; set; }

    public Fatura Fatura { get; set; } = null!;

    // Valor efetivamente recebido
    [Column(TypeName = "decimal(18,2)")]
    public decimal ValorPago { get; set; }

    // Forma utilizada para realizar o pagamento
    [Required]
    public FormaPagamento FormaPagamento { get; set; }

    // Identificador da transação no provedor de pagamento
    [MaxLength(200)]
    public string? IdTransacao { get; set; }

    // Código utilizado para o pagamento PIX
    [MaxLength(500)]
    public string? CodigoPix { get; set; }

    // QR Code PIX em formato de imagem/base64, caso seja armazenado
    public string? QrCodePix { get; set; }

    // Data em que o pagamento foi realizado
    public DateTime? DataPagamento { get; set; }

    // Data de criação do registro
    public DateTime DataCadastro { get; set; } = DateTime.UtcNow;

    // Observação relacionada ao pagamento
    [MaxLength(500)]
    public string? Observacao { get; set; }
    [Required]
    public StatusPagamento Status { get; set; } = StatusPagamento.Pendente;
}

