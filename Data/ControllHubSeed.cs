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
        Console.WriteLine("[SEED] Iniciando...");

        // ==========================================
        // VERIFICA SE JÁ EXISTE ADMINISTRADOR SISTEMA
        // ==========================================

        Console.WriteLine("[SEED] Verificando AdministradorSistema...");

        var administradorExistente = await context.Usuarios
            .AsNoTracking()
            .FirstOrDefaultAsync(
                x => x.Perfil == PerfilUsuario.AdministradorSistema
            );

        if (administradorExistente is not null)
        {
            Console.WriteLine("[SEED] AdministradorSistema já existe.");
            return;
        }

        Console.WriteLine("[SEED] AdministradorSistema não encontrado.");

        // ==========================================
        // CONFIGURAÇÃO
        // ==========================================

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

        Console.WriteLine("[SEED] Configuração do administrador encontrada.");

        // ==========================================
        // VERIFICA CPF
        // ==========================================

        Console.WriteLine("[SEED] Verificando CPF...");

        var cpfExiste = await context.Usuarios
            .AsNoTracking()
            .AnyAsync(x => x.CPF == cpf);

        if (cpfExiste)
        {
            Console.WriteLine("[SEED] CPF já cadastrado.");
            return;
        }

        // ==========================================
        // VERIFICA EMAIL
        // ==========================================

        Console.WriteLine("[SEED] Verificando e-mail...");

        var emailExiste = await context.Usuarios
            .AsNoTracking()
            .AnyAsync(x => x.Email == email);

        if (emailExiste)
        {
            Console.WriteLine("[SEED] E-mail já cadastrado.");
            return;
        }

        // ==========================================
        // CRIA ADMINISTRADOR
        // ==========================================

        Console.WriteLine("[SEED] Criando AdministradorSistema...");

        var administrador = new Usuario
        {
            Nome = nome,
            CPF = cpf,
            Email = email,
            SenhaHash = SenhaHelper.GerarHash(senha),
            Perfil = PerfilUsuario.AdministradorSistema,
            EmpresaId = null,
            Ativo = true,
            DataCadastro = DateTime.UtcNow
        };

        context.Usuarios.Add(administrador);

        await context.SaveChangesAsync();

        Console.WriteLine("[SEED] AdministradorSistema criado com sucesso.");
    }
}