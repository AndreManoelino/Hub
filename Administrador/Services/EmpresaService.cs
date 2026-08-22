using ControllHub.Administrador.DTOs.Empresa;
using ControllHub.Administrador.Enums;
using ControllHub.Administrador.Interfaces;
using ControllHub.Administrador.Models;
using ControllHub.Data;
using Microsoft.EntityFrameworkCore;

namespace ControllHub.Administrador.Services;

public class EmpresaService : IEmpresaService
{
    private readonly ControllHubContext _context;

    public EmpresaService(ControllHubContext context)
    {
        _context = context;
    }

    public async Task<EmpresaResponseDto> CriarEmpresa(
        CriarEmpresaDto dto)
    {
        var documento = NormalizarDocumento(
            dto.TipoDocumento == TipoDocumento.CPF
                ? dto.CPF
                : dto.CNPJ
        );

        if (string.IsNullOrWhiteSpace(documento))
        {
            throw new ArgumentException(
                "O documento da empresa é obrigatório."
            );
        }

        var documentoJaExiste = await DocumentoExiste(
            documento,
            null
        );

        if (documentoJaExiste)
        {
            throw new InvalidOperationException(
                "Já existe uma empresa cadastrada com este documento."
            );
        }

        var plano = await _context.Planos
            .FirstOrDefaultAsync(x =>
                x.Id == dto.PlanoId &&
                x.Ativo);

        if (plano is null)
        {
            throw new InvalidOperationException(
                "O plano informado não existe ou está inativo."
            );
        }

        var empresa = new Empresa
        {
            NomeFantasia = dto.NomeFantasia.Trim(),
            RazaoSocial = LimparTexto(dto.RazaoSocial),

            TipoDocumento = dto.TipoDocumento,

            CPF = dto.TipoDocumento == TipoDocumento.CPF
                ? documento
                : null,

            CNPJ = dto.TipoDocumento == TipoDocumento.CNPJ
                ? documento
                : null,

            InscricaoEstadual = LimparTexto(
                dto.InscricaoEstadual
            ),

            Email = dto.Email.Trim(),
            Telefone = LimparTexto(dto.Telefone),
            Celular = LimparTexto(dto.Celular),

            CEP = NormalizarCep(dto.CEP),

            Estado = LimparTexto(dto.Estado),
            Cidade = LimparTexto(dto.Cidade),
            Bairro = LimparTexto(dto.Bairro),
            Logradouro = LimparTexto(dto.Logradouro),
            Numero = LimparTexto(dto.Numero),
            Complemento = LimparTexto(dto.Complemento),

            PlanoId = dto.PlanoId,

            Status = StatusEmpresa.Ativa,
            Ativo = true,

            DataCadastro = DateTime.UtcNow
        };

        _context.Empresas.Add(empresa);

        await _context.SaveChangesAsync();

        return MapearEmpresa(empresa);
    }

    public async Task<EmpresaResponseDto?> BuscarPorId(int id)
    {
        var empresa = await _context.Empresas
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id);

        if (empresa is null)
        {
            return null;
        }

        return MapearEmpresa(empresa);
    }

    public async Task<EmpresaResponseDto?> BuscarPorDocumento(
        string documento)
    {
        var documentoNormalizado = NormalizarDocumento(documento);

        if (string.IsNullOrWhiteSpace(documentoNormalizado))
        {
            return null;
        }

        var empresa = await _context.Empresas
            .AsNoTracking()
            .FirstOrDefaultAsync(x =>
                x.CPF == documentoNormalizado ||
                x.CNPJ == documentoNormalizado);

        if (empresa is null)
        {
            return null;
        }

        return MapearEmpresa(empresa);
    }

    public async Task<IEnumerable<EmpresaResponseDto>>
        ObterTodasEmpresas()
    {
        var empresas = await _context.Empresas
            .AsNoTracking()
            .OrderBy(x => x.NomeFantasia)
            .ToListAsync();

        return empresas.Select(MapearEmpresa);
    }

    public async Task<EmpresaResponseDto?> Atualizar(
        int id,
        AtualizarEmpresaDto dto)
    {
        var empresa = await _context.Empresas
            .FirstOrDefaultAsync(x => x.Id == id);

        if (empresa is null)
        {
            return null;
        }

        if (!Enum.TryParse<TipoDocumento>(
                dto.TipoDocumento,
                true,
                out var tipoDocumento))
        {
            throw new ArgumentException(
                "O tipo de documento informado é inválido."
            );
        }

        var plano = await _context.Planos
            .FirstOrDefaultAsync(x =>
                x.Id == dto.PlanoId &&
                x.Ativo);

        if (plano is null)
        {
            throw new InvalidOperationException(
                "O plano informado não existe ou está inativo."
            );
        }

        empresa.NomeFantasia = dto.NomeFantasia.Trim();

        empresa.RazaoSocial = LimparTexto(
            dto.RazaoSocial
        );

        empresa.Email = dto.Email.Trim();

        empresa.InscricaoEstadual = LimparTexto(
            dto.InscricaoEstadual
        );

        empresa.Telefone = LimparTexto(
            dto.Telefone
        );

        empresa.Celular = LimparTexto(
            dto.Celular
        );

        empresa.CEP = NormalizarCep(
            dto.CEP
        );

        empresa.Estado = LimparTexto(
            dto.Estado
        );

        empresa.Cidade = LimparTexto(
            dto.Cidade
        );

        empresa.Bairro = LimparTexto(
            dto.Bairro
        );

        empresa.Logradouro = LimparTexto(
            dto.Logradouro
        );

        empresa.Numero = LimparTexto(
            dto.Numero
        );

        empresa.Complemento = LimparTexto(
            dto.Complemento
        );

        empresa.PlanoId = dto.PlanoId;
        empresa.TipoDocumento = tipoDocumento;

        empresa.DataAtualizacao = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return MapearEmpresa(empresa);
    }

    public async Task<bool> DesativarEmpresa(int id)
    {
        var empresa = await _context.Empresas
            .FirstOrDefaultAsync(x => x.Id == id);

        if (empresa is null)
        {
            return false;
        }

        if (!empresa.Ativo)
        {
            return true;
        }

        empresa.Ativo = false;
        empresa.Status = StatusEmpresa.Suspensa;
        empresa.DataAtualizacao = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> AtivarEmpresa(int id)
    {
        var empresa = await _context.Empresas
            .FirstOrDefaultAsync(x => x.Id == id);

        if (empresa is null)
        {
            return false;
        }

        if (empresa.Ativo)
        {
            return true;
        }

        empresa.Ativo = true;
        empresa.Status = StatusEmpresa.Ativa;
        empresa.DataAtualizacao = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return true;
    }

    private async Task<bool> DocumentoExiste(
        string documento,
        int? empresaId)
    {
        return await _context.Empresas
            .AsNoTracking()
            .AnyAsync(x =>
                (x.CPF == documento ||
                 x.CNPJ == documento) &&
                (!empresaId.HasValue ||
                 x.Id != empresaId.Value));
    }

    private static string NormalizarDocumento(
        string? documento)
    {
        if (string.IsNullOrWhiteSpace(documento))
        {
            return string.Empty;
        }

        return new string(
            documento
                .Where(char.IsDigit)
                .ToArray()
        );
    }

    private static string? NormalizarCep(
        string? cep)
    {
        if (string.IsNullOrWhiteSpace(cep))
        {
            return null;
        }

        var resultado = new string(
            cep
                .Where(char.IsDigit)
                .ToArray()
        );

        return string.IsNullOrWhiteSpace(resultado)
            ? null
            : resultado;
    }

    private static string? LimparTexto(
        string? valor)
    {
        if (string.IsNullOrWhiteSpace(valor))
        {
            return null;
        }

        return valor.Trim();
    }

    private static EmpresaResponseDto MapearEmpresa(
        Empresa empresa)
    {
        return new EmpresaResponseDto
        {
            Id = empresa.Id,

            NomeFantasia = empresa.NomeFantasia,
            RazaoSocial = empresa.RazaoSocial,

            TipoDocumento = empresa.TipoDocumento,

            CPF = empresa.CPF,
            CNPJ = empresa.CNPJ,

            InscricaoEstadual =
                empresa.InscricaoEstadual,

            Email = empresa.Email,

            Telefone = empresa.Telefone,
            Celular = empresa.Celular,

            CEP = empresa.CEP,
            Estado = empresa.Estado,
            Cidade = empresa.Cidade,
            Bairro = empresa.Bairro,
            Logradouro = empresa.Logradouro,
            Numero = empresa.Numero,
            Complemento = empresa.Complemento,

            PlanoId = empresa.PlanoId,

            Ativo = empresa.Ativo,

            DataCadastro = empresa.DataCadastro,
            DataAtualizacao = empresa.DataAtualizacao
        };
    }
}