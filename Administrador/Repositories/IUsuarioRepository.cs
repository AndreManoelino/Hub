using ControllHub.Administrador.Models;

namespace ControllHub.Administrador.Repositories;

public interface IUsuarioRepository
{
    Task<Usuario?> ObterUsuario(int id);
    Task<Usuario?> ObterPorCpf(string cpf);
    Task<Usuario?> ObterPorEmail(string email);
    Task<List<Usuario>> ObterTodos();
    Task<List<Usuario>> ObterPorEmpresa(int empresaId);
    Task Adicionar(Usuario usuario);
    void Atualizar(Usuario usuario);
    void Remover (Usuario usuario);
    Task<bool> ExisteCpf(string cpf);

    Task<bool> ExisteEmail(string email);
    Task<int> ContarPorEmpresa(int empresaId);
    Task Salvar();

}
