using ControllHub.Administrador.DTOs.Empresa;
using FluentValidation;

namespace ControllHub.Administrador.Validacoes.Empresa;

public class CriarEmpresaValidator : AbstractValidator<CriarEmpresaDto>
{
    public CriarEmpresaValidator()
    {
        RuleFor(x => x.NomeFantasia)
            .NotEmpty()
            .WithMessage("O nome fantasia é obrigatório.")
            .MaximumLength(150)
            .WithMessage("O nome fantasia deve possuir no máximo 150 caracteres.");

        RuleFor(x => x.RazaoSocial)
            .MaximumLength(200)
            .WithMessage("A razão social deve possuir no máximo 200 caracteres.");

        RuleFor(x => x.CNPJ)
            .NotEmpty()
            .WithMessage("O CNPJ é obrigatório.")
            .Must(TemCatorzeDigitos)
            .WithMessage("O CNPJ deve possuir 14 dígitos.");

        RuleFor(x => x.InscricaoEstadual)
            .MaximumLength(20)
            .WithMessage("A inscrição estadual deve possuir no máximo 20 caracteres.");

        RuleFor(x => x.Email)
            .NotEmpty()
            .WithMessage("O e-mail é obrigatório.")
            .EmailAddress()
            .WithMessage("Informe um e-mail válido.")
            .MaximumLength(150)
            .WithMessage("O e-mail deve possuir no máximo 150 caracteres.");

        RuleFor(x => x.Telefone)
            .MaximumLength(20)
            .WithMessage("O telefone deve possuir no máximo 20 caracteres.");

        RuleFor(x => x.Celular)
            .MaximumLength(20)
            .WithMessage("O celular deve possuir no máximo 20 caracteres.");

        RuleFor(x => x.CEP)
            .MaximumLength(8)
            .WithMessage("O CEP deve possuir no máximo 8 dígitos.");

        RuleFor(x => x.Estado)
            .MaximumLength(100);

        RuleFor(x => x.Cidade)
            .MaximumLength(100);

        RuleFor(x => x.Bairro)
            .MaximumLength(100);

        RuleFor(x => x.Logradouro)
            .MaximumLength(200);

        RuleFor(x => x.Numero)
            .MaximumLength(20);

        RuleFor(x => x.Complemento)
            .MaximumLength(100);

        RuleFor(x => x.PlanoId)
            .GreaterThan(0)
            .WithMessage("O plano é obrigatório.");
    }

    private static bool TemCatorzeDigitos(string? cnpj)
    {
        if (string.IsNullOrWhiteSpace(cnpj))
        {
            return false;
        }

        var numeros = new string(
            cnpj.Where(char.IsDigit).ToArray()
        );

        return numeros.Length == 14;
    }
}