using ControllHub.Administrador.DTOs.Autenticacao;
using ControllHub.Administrador.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ControllHub.Administrador.Controllers;

[ApiController]
[Route("api/administrador/autenticacao")]
public class AutenticacaoController : ControllerBase
{
    private readonly IAutenticacaoService _autenticacaoService;

    public AutenticacaoController(
        IAutenticacaoService autenticacaoService)
    {
        _autenticacaoService = autenticacaoService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(
        [FromBody] LoginDto dto)
    {
        var resultado = await _autenticacaoService.Login(dto);

        if (resultado is null)
        {
            return Unauthorized(new
            {
                mensagem = "Usuário  ou senha inválidos."
            });
        }

        return Ok(resultado);
    }
}