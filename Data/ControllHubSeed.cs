using ControllHub.Administrador.Enums;
using ControllHub.Administrador.Helpers;
using ControllHub.Administrador.Models;
using Microsoft.EntityFrameworkCore;

namespace ControllHub.Data;

public static class ControllHubSeed
{
    public static async Task InicializarAsync(
        ControllHubContext context,
        IConfiguration configuration)
    {
        // Verifica se o AdministradorSistema já existe
        var administradorExistente = await context.Usuarios
            .FirstOrDefaultAsync(x => x.Perfil == PerfilUsuario.AdministradorSistema);

        if (administradorExistente is not null)
            return;

        var configuracao = configuration
            .GetSection("AdministradorInicial");

        var nome = configuracao["Nome"];
        var cpf = configuracao["CPF"];
        var email = configuracao["Email"];
        var senha = configuracao["Senha"];

        if (string.IsNullOrWhiteSpace(nome) ||
            string.IsNullOrWhiteSpace(cpf) ||
            string.IsNullOrWhiteSpace(email) ||
            string.IsNullOrWhiteSpace(senha))
        {
            throw new InvalidOperationException(
                "A configuração do AdministradorInicial está incompleta."
            );
        }

        // Verifica CPF
        var cpfExiste = await context.Usuarios
            .AnyAsync(x => x.CPF == cpf);

        if (cpfExiste)
            return;

        // Verifica e-mail
        var emailExiste = await context.Usuarios
            .AnyAsync(x => x.Email == email);

        if (emailExiste)
            return;

        var administrador = new Usuario
        {
            Nome = nome,
            CPF = cpf,
            Email = email,
            SenhaHash = SenhaHelper.GerarHash(senha),
            Perfil = PerfilUsuario.AdministradorSistema,
            EmpresaId = null,
            Ativo = true,
            DataCadastro = DateTime.Now
        };

        context.Usuarios.Add(administrador);

        await context.SaveChangesAsync();
    }
}