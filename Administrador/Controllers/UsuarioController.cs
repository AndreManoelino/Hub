using ControllHub.Administrador.DTOs.Usuario;
using ControllHub.Administrador.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace ControllHub.Administrador.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UsuarioController : ControllerBase
{
    private readonly IUsuarioService _usuarioService;

    public UsuarioController(
        IUsuarioService usuarioService)
    {
        _usuarioService = usuarioService;
    }

    // =========================================================
    // CRIAR USUÁRIO
    // =========================================================

    [HttpPost]
    public async Task<IActionResult> Criar(
        [FromBody] CriarUsuarioDto dto)
    {
        try
        {
            var usuario =
                await _usuarioService.Criar(dto);

            return CreatedAtAction(
                nameof(ObterUsuario),
                new { id = usuario.Id },
                new
                {
                    usuario.Id,
                    usuario.Nome,
                    usuario.CPF,
                    usuario.DataNascimento,
                    usuario.Email,
                    usuario.Perfil,
                    usuario.EmpresaId,
                    usuario.Ativo,
                    usuario.DataCadastro
                }
            );
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new
            {
                mensagem = ex.Message
            });
        }
    }


    // =========================================================
    // OBTER POR ID
    // =========================================================

    [HttpGet("{id:int}")]
    public async Task<IActionResult> ObterUsuario(
        int id)
    {
        var usuario =
            await _usuarioService.ObterUsuario(id);

        if (usuario == null)
        {
            return NotFound(new
            {
                mensagem = "Usuário não encontrado."
            });
        }

        return Ok(new
        {
            usuario.Id,
            usuario.Nome,
            usuario.CPF,
            usuario.DataNascimento,
            usuario.Email,
            usuario.Perfil,
            usuario.EmpresaId,
            Empresa = usuario.Empresa?.NomeFantasia,
            usuario.Ativo,
            usuario.DataCadastro
        });
    }


    // =========================================================
    // OBTER TODOS
    // =========================================================

    [HttpGet]
    public async Task<IActionResult> ObterTodos()
    {
        var usuarios =
            await _usuarioService.ObterTodos();

        return Ok(
            usuarios.Select(usuario => new
            {
                usuario.Id,
                usuario.Nome,
                usuario.CPF,
                usuario.DataNascimento,
                usuario.Email,
                usuario.Perfil,
                usuario.EmpresaId,
                Empresa = usuario.Empresa?.NomeFantasia,
                usuario.Ativo,
                usuario.DataCadastro
            })
        );
    }


    // =========================================================
    // OBTER USUÁRIOS DA EMPRESA
    // =========================================================

    [HttpGet("empresa/{empresaId:int}")]
    public async Task<IActionResult> ObterPorEmpresa(
        int empresaId)
    {
        var usuarios =
            await _usuarioService.ObterPorEmpresa(
                empresaId
            );

        return Ok(
            usuarios.Select(usuario => new
            {
                usuario.Id,
                usuario.Nome,
                usuario.CPF,
                usuario.DataNascimento,
                usuario.Email,
                usuario.Perfil,
                usuario.EmpresaId,
                Empresa = usuario.Empresa?.NomeFantasia,
                usuario.Ativo,
                usuario.DataCadastro
            })
        );
    }


    // =========================================================
    // ATUALIZAR
    // =========================================================

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Atualizar(
        int id,
        [FromBody] AtualizarUsuarioDto dto)
    {
        try
        {
            var usuario =
                await _usuarioService.Atualizar(
                    id,
                    dto
                );

            if (usuario == null)
            {
                return NotFound(new
                {
                    mensagem =
                        "Usuário não encontrado."
                });
            }

            return Ok(new
            {
                usuario.Id,
                usuario.Nome,
                usuario.CPF,
                usuario.DataNascimento,
                usuario.Email,
                usuario.Perfil,
                usuario.EmpresaId,
                usuario.Ativo,
                usuario.DataCadastro
            });
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new
            {
                mensagem = ex.Message
            });
        }
    }


    // =========================================================
    // DESATIVAR
    // =========================================================

    [HttpPatch("{id:int}/desativar")]
    public async Task<IActionResult> Desativar(
        int id)
    {
        var resultado =
            await _usuarioService.Desativar(id);

        if (!resultado)
        {
            return NotFound(new
            {
                mensagem =
                    "Usuário não encontrado."
            });
        }

        return Ok(new
        {
            mensagem =
                "Usuário desativado com sucesso."
        });
    }


    // =========================================================
    // ATIVAR
    // =========================================================

    [HttpPatch("{id:int}/ativar")]
    public async Task<IActionResult> Ativar(
        int id)
    {
        var resultado =
            await _usuarioService.Ativar(id);

        if (!resultado)
        {
            return NotFound(new
            {
                mensagem =
                    "Usuário não encontrado."
            });
        }

        return Ok(new
        {
            mensagem =
                "Usuário ativado com sucesso."
        });
    }
}