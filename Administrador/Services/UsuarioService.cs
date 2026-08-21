
using ControllHub.Administrador.DTOs.Usuario;
using ControllHub.Administrador.Interfaces;
using ControllHub.Administrador.Models;
using ControllHub.Administrador.Repositories;
using Microsoft.AspNetCore.Identity;

namespace ControllHub.Administrador.Services;

public class UsuarioService : IUsuarioService
{
    private const string SenhaInicial = "Redefina@01";

    private readonly IUsuarioRepository _repository;
    private readonly IPasswordHasher<Usuario> _passwordHasher;

    public UsuarioService(
        IUsuarioRepository repository,
        IPasswordHasher<Usuario> passwordHasher)
    {
        _repository = repository;
        _passwordHasher = passwordHasher;
    }

    public async Task<Usuario> Criar(CriarUsuarioDto dto)
    {
        var cpf = dto.CPF.Trim();
        var email = dto.Email.Trim().ToLowerInvariant();

        var cpfExiste =
            await _repository.ExisteCpf(cpf);

        if (cpfExiste)
        {
            throw new InvalidOperationException(
                "Já existe um CPF cadastrado igual ao informado."
            );
        }

        var emailExiste =
            await _repository.ExisteEmail(email);

        if (emailExiste)
        {
            throw new InvalidOperationException(
                "Já existe um e-mail cadastrado igual ao informado."
            );
        }

        var usuario = new Usuario
        {
            Nome = dto.Nome.Trim(),
            CPF = cpf,
            DataNascimento = dto.DataNascimento,
            Email = email,
            Perfil = dto.Perfil,
            EmpresaId = dto.EmpresaId,
            Ativo = true,
            DataCadastro = DateTime.Now
        };

        // ========================================================
        // SENHA INICIAL
        // ========================================================
        //
        // A senha nunca é salva em texto puro.
        // O sistema recebe "Redefina@01",
        // gera o hash e salva somente o hash.
        //

        usuario.SenhaHash =
            _passwordHasher.HashPassword(
                usuario,
                SenhaInicial
            );

        await _repository.Adicionar(usuario);
        await _repository.Salvar();

        return usuario;
    }

    public async Task<Usuario?> ObterUsuario(int id)
    {
        return await _repository.ObterUsuario(id);
    }

    public async Task<List<Usuario>> ObterTodos()
    {
        return await _repository.ObterTodos();
    }

    public async Task<List<Usuario>> ObterPorEmpresa(int empresaId)
    {
        return await _repository.ObterPorEmpresa(empresaId);
    }

    public async Task<Usuario?> Atualizar(
        int id,
        AtualizarUsuarioDto dto)
    {
        var usuario =
            await _repository.ObterUsuario(id);

        if (usuario == null)
        {
            return null;
        }

        var email =
            dto.Email.Trim().ToLowerInvariant();

        var outroUsuario =
            await _repository.ObterPorEmail(email);

        if (
            outroUsuario != null &&
            outroUsuario.Id != usuario.Id
        )
        {
            throw new InvalidOperationException(
                "Já existe outro usuário com este e-mail."
            );
        }

        usuario.Nome = dto.Nome.Trim();
        usuario.DataNascimento = dto.DataNascimento;
        usuario.Email = email;

        _repository.Atualizar(usuario);

        await _repository.Salvar();

        return usuario;
    }

    public async Task<bool> Desativar(int id)
    {
        var usuario =
            await _repository.ObterUsuario(id);

        if (usuario == null)
        {
            return false;
        }

        usuario.Ativo = false;

        _repository.Atualizar(usuario);

        await _repository.Salvar();

        return true;
    }

    public async Task<bool> Ativar(int id)
    {
        var usuario =
            await _repository.ObterUsuario(id);

        if (usuario == null)
        {
            return false;
        }

        usuario.Ativo = true;

        _repository.Atualizar(usuario);

        await _repository.Salvar();

        return true;
    }
}

