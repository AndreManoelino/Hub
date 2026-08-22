using ControllHub.Administrador.Models;
using Microsoft.EntityFrameworkCore;

namespace ControllHub.Data;

public class ControllHubContext : DbContext
{
    public ControllHubContext(DbContextOptions<ControllHubContext> options)
        : base(options)
    {
    }

    public DbSet<Empresa> Empresas => Set<Empresa>();
    public DbSet<Usuario> Usuarios => Set<Usuario>();
    public DbSet<Plano> Planos => Set<Plano>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // ==========================================
        // EMPRESA
        // ==========================================

        modelBuilder.Entity<Empresa>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.NomeFantasia)
                .HasMaxLength(150)
                .IsRequired();

            entity.Property(e => e.RazaoSocial)
                .HasMaxLength(200);

            entity.Property(e => e.CPF)
                .HasMaxLength(11);

            entity.Property(e => e.CNPJ)
                .HasMaxLength(14);

            entity.Property(e => e.Email)
                .HasMaxLength(150)
                .IsRequired();

            entity.Property(e => e.Telefone)
                .HasMaxLength(20);

            entity.Property(e => e.Celular)
                .HasMaxLength(20);

            entity.Property(e => e.CEP)
                .HasMaxLength(8);

            entity.Property(e => e.Estado)
                .HasMaxLength(100);

            entity.Property(e => e.Cidade)
                .HasMaxLength(100);

            entity.Property(e => e.Bairro)
                .HasMaxLength(100);

            entity.Property(e => e.Logradouro)
                .HasMaxLength(200);

            entity.Property(e => e.Numero)
                .HasMaxLength(20);

            entity.Property(e => e.Complemento)
                .HasMaxLength(100);

            // Empresa pertence a um plano
            entity.HasOne(e => e.Plano)
                .WithMany(p => p.Empresas)
                .HasForeignKey(e => e.PlanoId)
                .OnDelete(DeleteBehavior.Restrict);

            // CPF da empresa é único quando informado
            entity.HasIndex(e => e.CPF)
                .IsUnique()
                .HasFilter("\"CPF\" IS NOT NULL");

            entity.HasIndex(e => e.CNPJ)
                .IsUnique()
                .HasFilter("\"CNPJ\" IS NOT NULL");
        });


        // ==========================================
        // USUARIO
        // ==========================================

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(u => u.Id);

            entity.Property(u => u.Nome)
                .HasMaxLength(150)
                .IsRequired();

            entity.Property(u => u.CPF)
                .HasMaxLength(11)
                .IsRequired();

            entity.Property(u => u.Email)
                .HasMaxLength(150)
                .IsRequired();

            entity.Property(u => u.SenhaHash)
                .IsRequired();

            // CPF único no sistema
            entity.HasIndex(u => u.CPF)
                .IsUnique();

            // E-mail único no sistema
            entity.HasIndex(u => u.Email)
                .IsUnique();

            // ==========================================
            // RELACIONAMENTO COM EMPRESA
            // ==========================================
            //
            // EmpresaId é opcional.
            //
            // AdministradorSistema:
            // EmpresaId = null
            //
            // Proprietário:
            // EmpresaId = ID da empresa
            //
            // Administrador:
            // EmpresaId = ID da empresa
            //
            // Profissional:
            // EmpresaId = ID da empresa
            //
            // Aluno:
            // EmpresaId = ID da empresa
            //

            entity.HasOne(u => u.Empresa)
                .WithMany(e => e.Usuarios)
                .HasForeignKey(u => u.EmpresaId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Restrict);
        });


        // ==========================================
        // PLANO
        // ==========================================

        modelBuilder.Entity<Plano>(entity =>
        {
            entity.HasKey(p => p.Id);

            entity.Property(p => p.Nome)
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(p => p.Descricao)
                .HasMaxLength(500);

            entity.Property(p => p.ValorMensal)
                .HasPrecision(18, 2);

            entity.HasIndex(p => p.Nome)
                .IsUnique();
        });
    }
}