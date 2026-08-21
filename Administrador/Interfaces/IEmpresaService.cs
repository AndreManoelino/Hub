using ControllHub.Administrador.DTOs.Empresa;

namespace ControllHub.Administrador.Interfaces;

public interface IEmpresaService
{
    Task<EmpresaResponseDto> CriarEmpresa(CriarEmpresaDto dto);
    Task<EmpresaResponseDto?> BuscarPorId(int id);
    Task<EmpresaResponseDto?> BuscarPorDocumento(string Documento);
    Task<IEnumerable<EmpresaResponseDto>> ObterTodasEmpresas();
    Task<EmpresaResponseDto?> Atualizar(int id, AtualizarEmpresaDto dto);
    Task<bool> DesativarEmpresa(int id);
    Task<bool> AtivarEmpresa(int id);
}
