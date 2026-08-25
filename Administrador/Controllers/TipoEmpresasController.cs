using ControllHub.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ControllHub.Administrador.Controllers;

[ApiController]
[Route("api/administrador/tipos-empresa")]
public class TiposEmpresaController : ControllerBase
{
    private readonly ControllHubContext _context;

    public TiposEmpresaController(ControllHubContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Listar()
    {
        var tipos = await _context.TiposEmpresa
            .AsNoTracking()
            .Where(x => x.Ativo)
            .OrderBy(x => x.Nome)
            .Select(x => new
            {
                id = x.Id,
                nome = x.Nome,
                codigo = x.Codigo,
                descricao = x.Descricao,
                ativo = x.Ativo
            })
            .ToListAsync();

        return Ok(tipos);
    }
}