using FluentValidation;
using ControllHub.Administrador.DTOs.Empresa;

namespace ControllHub.Administrador.Validacoes.Empresa;

public class CriarEmpresaValidator : AbstractValidator<CriarEmpresaDto>
{
    public CriarEmpresaValidator()
    {
        RuleFor(x => x.NomeFantasia)
            .NotEmpty()
            .WithMessage("O nome fantasia é obrigatório.")
            .MaximumLength(150)
            .WithMessage("O nome fantasia deve ter no máximo 150 caracteres.");

        RuleFor(x => x.RazaoSocial)
            .MaximumLength(200)
            .WithMessage("A razão social deve ter no máximo 200 caracteres.");

        RuleFor(x => x.TipoDocumento)
            .IsInEnum()
            .WithMessage("O tipo de documento informado é inválido.");

        RuleFor(x => x.Email)
            .NotEmpty()
            .WithMessage("O e-mail é obrigatório.")
            .EmailAddress()
            .WithMessage("Informe um e-mail válido.")
            .MaximumLength(150)
            .WithMessage("O e-mail deve ter no máximo 150 caracteres.");

        RuleFor(x => x.CPF)
            .Length(11)
            .When(x => !string.IsNullOrWhiteSpace(x.CPF))
            .WithMessage("O CPF deve possuir 11 dígitos.");

        RuleFor(x => x.CNPJ)
            .Length(14)
            .When(x => !string.IsNullOrWhiteSpace(x.CNPJ))
            .WithMessage("O CNPJ deve possuir 14 dígitos.");

        RuleFor(x => x)
            .Must(x =>
                (x.TipoDocumento == Enums.TipoDocumento.CPF &&
                 !string.IsNullOrWhiteSpace(x.CPF) &&
                 string.IsNullOrWhiteSpace(x.CNPJ))
                ||
                (x.TipoDocumento == Enums.TipoDocumento.CNPJ &&
                 !string.IsNullOrWhiteSpace(x.CNPJ) &&
                 string.IsNullOrWhiteSpace(x.CPF)))
            .WithMessage("Informe somente o documento correspondente ao tipo selecionado.");

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
    }
}