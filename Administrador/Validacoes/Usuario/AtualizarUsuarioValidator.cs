using FluentValidation;
using ControllHub.Administrador.DTOs.Usuario;

namespace ControllHub.Administrador.Validacoes.Usuario;

public class AtualizarUsuarioValidator : AbstractValidator<AtualizarUsuarioDto>
{
    public AtualizarUsuarioValidator()
    {
        RuleFor(x => x.Nome)
            .NotEmpty()
            .WithMessage("O nome é obrigatório.")
            .MaximumLength(150)
            .WithMessage("O nome deve ter no máximo 150 caracteres.");

        RuleFor(x => x.DataNascimento)
            .NotNull()
            .WithMessage("A data de nascimento é obrigatória.")
            .LessThan(DateTime.Today)
            .WithMessage("A data de nascimento deve ser anterior à data atual.");

        RuleFor(x => x.Email)
            .NotEmpty()
            .WithMessage("O e-mail é obrigatório.")
            .EmailAddress()
            .WithMessage("Informe um e-mail válido.")
            .MaximumLength(150)
            .WithMessage("O e-mail deve ter no máximo 150 caracteres.");
    }
}