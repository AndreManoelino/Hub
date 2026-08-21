using ControllHub.Administrador.DTOs.Autenticacao;

namespace ControllHub.Administrador.Interfaces;

public interface IAutenticacaoService
{
    Task<LoginResponseDto?> Login(LoginDto dto);
}