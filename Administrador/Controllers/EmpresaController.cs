using ControllHub.Administrador.DTOs.Empresa;
using ControllHub.Administrador.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ControllHub.Administrador.Controllers;

[ApiController]
[Route("api/administrador/empresas")]
public class EmpresaController : ControllerBase
{
    private readonly IEmpresaService _empresaService;

    public EmpresaController(IEmpresaService empresaService)
    {
        _empresaService = empresaService;
    }

    [HttpPost]
    public async Task<ActionResult<EmpresaResponseDto>> Criar(
        [FromBody] CriarEmpresaDto dto)
    {
        try
        {
            var empresa = await _empresaService.CriarEmpresa(dto);

            return CreatedAtAction(
                nameof(BuscarPorId),
                new { id = empresa.Id },
                empresa
            );
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new
            {
                mensagem = ex.Message
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

    [HttpGet("{id:int}")]
    public async Task<ActionResult<EmpresaResponseDto>> BuscarPorId(
        int id)
    {
        var empresa = await _empresaService.BuscarPorId(id);

        if (empresa is null)
        {
            return NotFound(new
            {
                mensagem = "Empresa não encontrada."
            });
        }

        return Ok(empresa);
    }

    [HttpGet("documento/{documento}")]
    public async Task<ActionResult<EmpresaResponseDto>>
        BuscarPorDocumento(string documento)
    {
        var empresa =
            await _empresaService.BuscarPorDocumento(documento);

        if (empresa is null)
        {
            return NotFound(new
            {
                mensagem = "Empresa não encontrada."
            });
        }

        return Ok(empresa);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<EmpresaResponseDto>>>
        ObterTodas()
    {
        var empresas =
            await _empresaService.ObterTodasEmpresas();

        return Ok(empresas);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<EmpresaResponseDto>> Atualizar(
        int id,
        [FromBody] AtualizarEmpresaDto dto)
    {
        try
        {
            var empresa =
                await _empresaService.Atualizar(id, dto);

            if (empresa is null)
            {
                return NotFound(new
                {
                    mensagem = "Empresa não encontrada."
                });
            }

            return Ok(empresa);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new
            {
                mensagem = ex.Message
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

    [HttpPatch("{id:int}/desativar")]
    public async Task<IActionResult> Desativar(int id)
    {
        var resultado =
            await _empresaService.DesativarEmpresa(id);

        if (!resultado)
        {
            return NotFound(new
            {
                mensagem = "Empresa não encontrada."
            });
        }

        return Ok(new
        {
            mensagem = "Empresa desativada com sucesso."
        });
    }

    [HttpPatch("{id:int}/ativar")]
    public async Task<IActionResult> Ativar(int id)
    {
        var resultado =
            await _empresaService.AtivarEmpresa(id);

        if (!resultado)
        {
            return NotFound(new
            {
                mensagem = "Empresa não encontrada."
            });
        }

        return Ok(new
        {
            mensagem = "Empresa ativada com sucesso."
        });
    }
}