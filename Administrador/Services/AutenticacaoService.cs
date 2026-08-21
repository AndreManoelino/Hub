using ControllHub.Administrador.DTOs.Autenticacao;
using ControllHub.Administrador.Helpers;
using ControllHub.Administrador.Interfaces;
using ControllHub.Data;
using Microsoft.EntityFrameworkCore;

namespace ControllHub.Administrador.Services;

public class AutenticacaoService : IAutenticacaoService
{
    private readonly ControllHubContext _context;
    private readonly JwtHelper _jwtHelper;

    public AutenticacaoService(
        ControllHubContext context,
        JwtHelper jwtHelper)
    {
        _context = context;
        _jwtHelper = jwtHelper;
    }

    public async Task<LoginResponseDto?> Login(LoginDto dto)
    {
        var login = dto.Login.Trim();

        var usuario = await _context.Usuarios
            .Include(x => x.Empresa)
            .FirstOrDefaultAsync(x =>
                x.CPF == login ||
                x.Email == login);

        if (usuario is null)
            return null;

        if (!usuario.Ativo)
            return null;

        // Administrador do sistema pode não possuir empresa.
        // Usuários vinculados a uma empresa precisam que ela esteja ativa.
        if (usuario.EmpresaId.HasValue)
        {
            if (usuario.Empresa is null)
                return null;

            if (!usuario.Empresa.Ativo)
                return null;
        }

        if (!SenhaHelper.VerificarSenha(dto.Senha, usuario.SenhaHash))
            return null;

        var nomeEmpresa = usuario.Empresa?.NomeFantasia;

        var (token, expiracao) = _jwtHelper.GerarToken(
            usuario,
            nomeEmpresa ?? string.Empty
        );

        return new LoginResponseDto
        {
            Token = token,
            UsuarioId = usuario.Id,
            Nome = usuario.Nome,
            CPF = usuario.CPF,
            Email = usuario.Email,
            Perfil = usuario.Perfil,
            EmpresaId = usuario.EmpresaId,
            NomeEmpresa = nomeEmpresa,
            Expiracao = expiracao
        };
    }
}