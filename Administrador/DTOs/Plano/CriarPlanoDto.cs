namespace ControllHub.Administrador.DTOs.Plano;

public class CriarPlanoDto
{
    public string Nome { get; set; } = string.Empty;

    public string? Descricao { get; set; }

    public decimal ValorMensal { get; set; }

    public int? LimiteUsuarios { get; set; }

    public int? LimiteAlunos { get; set; }

    public int? LimiteUnidades { get; set; }
}