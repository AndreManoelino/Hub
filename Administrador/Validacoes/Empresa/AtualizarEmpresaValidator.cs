using FluentValidation;
using ControllHub.Administrador.DTOs.Empresa;

namespace ControllHub.Administrador.Validacoes.Empresa;

public class AtualizarEmpresaValidator : AbstractValidator<AtualizarEmpresaDto>
{
    public AtualizarEmpresaValidator()
    {
        RuleFor(x => x.NomeFantasia)
            .NotEmpty()
            .WithMessage("O nome fantasia é obrigatório.")
            .MaximumLength(150)
            .WithMessage("O nome fantasia deve ter no máximo 150 caracteres.");

        RuleFor(x => x.RazaoSocial)
            .MaximumLength(200)
            .WithMessage("A razão social deve ter no máximo 200 caracteres.");

        RuleFor(x => x.Email)
            .NotEmpty()
            .WithMessage("O e-mail é obrigatório.")
            .EmailAddress()
            .WithMessage("Informe um e-mail válido.")
            .MaximumLength(150)
            .WithMessage("O e-mail deve ter no máximo 150 caracteres.");

        RuleFor(x => x.InscricaoEstadual)
            .MaximumLength(20)
            .WithMessage("A inscrição estadual deve ter no máximo 20 caracteres.");

        RuleFor(x => x.Telefone)
            .MaximumLength(20)
            .WithMessage("O telefone deve ter no máximo 20 caracteres.");

        RuleFor(x => x.Celular)
            .MaximumLength(20)
            .WithMessage("O celular deve ter no máximo 20 caracteres.");

        RuleFor(x => x.CEP)
            .Length(8)
            .When(x => !string.IsNullOrWhiteSpace(x.CEP))
            .WithMessage("O CEP deve possuir 8 dígitos.");

        RuleFor(x => x.Estado)
            .MaximumLength(100)
            .WithMessage("O estado deve ter no máximo 100 caracteres.");

        RuleFor(x => x.Cidade)
            .MaximumLength(100)
            .WithMessage("A cidade deve ter no máximo 100 caracteres.");

        RuleFor(x => x.Bairro)
            .MaximumLength(100)
            .WithMessage("O bairro deve ter no máximo 100 caracteres.");

        RuleFor(x => x.Logradouro)
            .MaximumLength(200)
            .WithMessage("O logradouro deve ter no máximo 200 caracteres.");

        RuleFor(x => x.Numero)
            .MaximumLength(20)
            .WithMessage("O número deve ter no máximo 20 caracteres.");

        RuleFor(x => x.Complemento)
            .MaximumLength(100)
            .WithMessage("O complemento deve ter no máximo 100 caracteres.");

        RuleFor(x => x.PlanoId)
            .GreaterThan(0)
            .WithMessage("O plano é obrigatório.");

        RuleFor(x => x.TipoDocumento)
            .NotEmpty()
            .WithMessage("O tipo de documento é obrigatório.")
            .Must(tipo =>
                tipo.Equals("CPF", StringComparison.OrdinalIgnoreCase) ||
                tipo.Equals("CNPJ", StringComparison.OrdinalIgnoreCase))
            .WithMessage("O tipo de documento deve ser CPF ou CNPJ.");
    }
}