using FluentValidation;
using ControllHub.Administrador.DTOs.Plano;

namespace ControllHub.Administrador.Validacoes.Plano;

public class CriarPlanoValidator : AbstractValidator<CriarPlanoDto>
{
    public CriarPlanoValidator()
    {
        RuleFor(x => x.Nome)
            .NotEmpty()
            .WithMessage("O nome do plano é obrigatório.")
            .MaximumLength(100)
            .WithMessage("O nome do plano deve ter no máximo 100 caracteres.");

        RuleFor(x => x.Descricao)
            .MaximumLength(500)
            .WithMessage("A descrição deve ter no máximo 500 caracteres.");

        RuleFor(x => x.ValorMensal)
            .GreaterThanOrEqualTo(0)
            .WithMessage("O valor mensal não pode ser negativo.");

        RuleFor(x => x.LimiteUsuarios)
            .GreaterThan(0)
            .When(x => x.LimiteUsuarios.HasValue)
            .WithMessage("O limite de usuários deve ser maior que zero.");

        RuleFor(x => x.LimiteAlunos)
            .GreaterThan(0)
            .When(x => x.LimiteAlunos.HasValue)
            .WithMessage("O limite de alunos deve ser maior que zero.");

        RuleFor(x => x.LimiteUnidades)
            .GreaterThan(0)
            .When(x => x.LimiteUnidades.HasValue)
            .WithMessage("O limite de unidades deve ser maior que zero.");
    }
}