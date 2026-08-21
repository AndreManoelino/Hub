using ControllHub.Administrador.DTOs.Usuario;
using ControllHub.Administrador.Models;

namespace ControllHub.Administrador.Interfaces;

public interface IUsuarioService
{
    Task<Usuario> Criar (CriarUsuarioDto dto);
    Task<Usuario?> ObterUsuario(int id);
    Task<List<Usuario>> ObterTodos();
    Task<List<Usuario>> ObterPorEmpresa(int empresaId);
    Task<Usuario?> Atualizar(int id, AtualizarUsuarioDto dto);
    Task<bool> Desativar(int id);

    Task<bool> Ativar(int id);
}
