using ControllHub.Administrador.Models;
using ControllHub.Data;
using Microsoft.EntityFrameworkCore;

namespace ControllHub.Administrador.Repositories;

public class UsuarioRepository :  IUsuarioRepository
{
    private readonly ControllHubContext _contex;
    public UsuarioRepository(ControllHubContext context)
    {
        _contex = context;
    }
    public async Task<Usuario?> ObterUsuario(int id)
    {
        return await _contex.Usuarios
            .Include(u => u.Empresa)
            .ThenInclude(e => e!.Plano)
            .FirstOrDefaultAsync(u => u.Id == id);
    }

    public async Task<Usuario?> ObterPorCpf(string cpf)
    {
        return await _contex.Usuarios
            .Include(u => u.Empresa)
            .FirstOrDefaultAsync(u => u.CPF == cpf);
    }
    public async Task<Usuario?> ObterPorEmail(string email)
    {
        return await _contex.Usuarios
            .Include(u => u.Empresa)
            .FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task<List<Usuario>> ObterTodos()
    {
        return await _contex.Usuarios
            .Include(u => u.Empresa)
            .OrderBy(u => u.Nome)
            .ToListAsync();
    }

    public async Task<List<Usuario>> ObterPorEmpresa(int empresaId)
    {
        return await _contex.Usuarios
            .Include(u => u.Empresa)
            .Where(u => u.EmpresaId == empresaId)
            .OrderBy(u => u.Nome)
            .ToListAsync();
    }

    public async Task Adicionar(Usuario usuario)
    {
        await _contex.Usuarios.AddAsync(usuario);
    }

    public void Atualizar(Usuario usuario)
    {
        _contex.Usuarios.Update(usuario);
    }

    public void Remover(Usuario usuario)
    {
        _contex.Usuarios.Remove(usuario);
    }

    public async Task<bool> ExisteCpf(string cpf)
    {
        return await _contex.Usuarios.AnyAsync(u => u.CPF == cpf);
    }

    public async Task<bool> ExisteEmail(string email)
    {
        return await _contex.Usuarios.AnyAsync( u=> u.Email == email);
    }

    public async Task<int> ContarPorEmpresa(int empresaId)
    {
        return await _contex.Usuarios.CountAsync(u=> u.EmpresaId == empresaId);
    }

    public async Task Salvar()
    {
        await _contex.SaveChangesAsync();
    }
}
