using FluentValidation;
using ControllHub.Administrador.DTOs.Usuario;

namespace ControllHub.Administrador.Validacoes.Usuario;

public class CriarUsuarioValidator : AbstractValidator<CriarUsuarioDto>
{
    public CriarUsuarioValidator()
    {
        RuleFor(x => x.Nome)
            .NotEmpty()
            .WithMessage("O nome é obrigatório.")
            .MaximumLength(150)
            .WithMessage("O nome deve ter no máximo 150 caracteres.");

        RuleFor(x => x.CPF)
            .NotEmpty()
            .WithMessage("O CPF é obrigatório.")
            .Length(11)
            .WithMessage("O CPF deve possuir 11 dígitos.");

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

        RuleFor(x => x.Perfil)
            .IsInEnum()
            .WithMessage("O perfil informado é inválido.");

        RuleFor(x => x.EmpresaId)
            .GreaterThan(0)
            .WithMessage("A empresa é obrigatória.");
    }
}