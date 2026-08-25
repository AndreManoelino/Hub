namespace ControllHub.Administrador.DTOs.Empresa;

public class AtualizarEmpresaDto
{
    public string NomeFantasia { get; set; } = string.Empty;

    public string? RazaoSocial { get; set; }

    public string CNPJ { get; set; } = string.Empty;

    public string? InscricaoEstadual { get; set; }

    public string Email { get; set; } = string.Empty;

    public string? Telefone { get; set; }

    public string? Celular { get; set; }

    public string? CEP { get; set; }

    public string? Estado { get; set; }

    public string? Cidade { get; set; }

    public string? Bairro { get; set; }

    public string? Logradouro { get; set; }

    public string? Numero { get; set; }

    public string? Complemento { get; set; }

    public int PlanoId { get; set; }
    public int TipoEmpresaId { get; set; }
}