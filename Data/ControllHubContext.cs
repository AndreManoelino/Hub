
using ControllHub.Administrador.Models;
using Microsoft.EntityFrameworkCore;

namespace ControllHub.Data;

public class ControllHubContext : DbContext
{
    public ControllHubContext(DbContextOptions<ControllHubContext> options)
        : base(options)
    {
    }

    // ============================================================
    // DBSETS
    // ============================================================

    public DbSet<Empresa> Empresas => Set<Empresa>();
    public DbSet<Usuario> Usuarios => Set<Usuario>();
    public DbSet<Plano> Planos => Set<Plano>();
    public DbSet<PlanoValor> PlanosValores => Set<PlanoValor>();
    public DbSet<TipoEmpresa> TiposEmpresa => Set<TipoEmpresa>();
    public DbSet<Assinatura> Assinaturas => Set<Assinatura>();
    public DbSet<Fatura> Faturas => Set<Fatura>();
    public DbSet<Pagamento> Pagamentos => Set<Pagamento>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // ========================================================
        // EMPRESA
        // ========================================================

        modelBuilder.Entity<Empresa>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.NomeFantasia)
                .HasMaxLength(150)
                .IsRequired();

            entity.Property(e => e.RazaoSocial)
                .HasMaxLength(200);

            entity.Property(e => e.CNPJ)
                .HasMaxLength(14)
                .IsRequired();

            entity.Property(e => e.InscricaoEstadual)
                .HasMaxLength(20);

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

            entity.Property(e => e.PlanoId)
                .IsRequired();

            entity.Property(e => e.TipoEmpresaId)
                .IsRequired();

            entity.HasOne(e => e.Plano)
                .WithMany(p => p.Empresas)
                .HasForeignKey(e => e.PlanoId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.TipoEmpresa)
                .WithMany(t => t.Empresas)
                .HasForeignKey(e => e.TipoEmpresaId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasIndex(e => e.CNPJ)
                .IsUnique();
        });

        // ========================================================
        // USUARIO
        // ========================================================

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

            entity.HasIndex(u => u.CPF)
                .IsUnique();

            entity.HasIndex(u => u.Email)
                .IsUnique();

            entity.HasOne(u => u.Empresa)
                .WithMany(e => e.Usuarios)
                .HasForeignKey(u => u.EmpresaId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // ========================================================
        // PLANO
        // ========================================================

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

            entity.Property(p => p.LimiteUsuarios);

            entity.Property(p => p.LimiteAlunos);

            entity.Property(p => p.LimiteUnidades);

            entity.HasIndex(p => p.Nome)
                .IsUnique();
        });

        // ========================================================
        // PLANO VALOR
        // ========================================================

        modelBuilder.Entity<PlanoValor>(entity =>
        {
            entity.HasKey(pv => pv.Id);

            entity.Property(pv => pv.ValorMensal)
                .HasPrecision(18, 2);

            entity.Property(pv => pv.PercentualReajuste)
                .HasPrecision(5, 2);

            entity.Property(pv => pv.DataInicioVigencia)
                .IsRequired();

            entity.HasOne(pv => pv.Plano)
                .WithMany(p => p.Valores)
                .HasForeignKey(pv => pv.PlanoId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // ========================================================
        // TIPO EMPRESA
        // ========================================================

        modelBuilder.Entity<TipoEmpresa>(entity =>
        {
            entity.HasKey(t => t.Id);

            entity.Property(t => t.Nome)
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(t => t.Codigo)
                .HasMaxLength(50)
                .IsRequired();

            entity.Property(t => t.Descricao)
                .HasMaxLength(500);

            entity.HasIndex(t => t.Codigo)
                .IsUnique();
        });

        // ========================================================
        // ASSINATURA
        // ========================================================

        modelBuilder.Entity<Assinatura>(entity =>
        {
            entity.HasKey(a => a.Id);

            entity.Property(a => a.ValorMensal)
                .HasPrecision(18, 2);

            entity.Property(a => a.PercentualReajustAnual)
                .HasPrecision(5, 2);

            entity.Property(a => a.MotivoCancelamento)
                .HasMaxLength(500);

            entity.HasOne(a => a.Empresa)
                .WithMany()
                .HasForeignKey(a => a.empresaId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(a => a.Plano)
                .WithMany()
                .HasForeignKey(a => a.PlanoId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // ========================================================
        // FATURA
        // ========================================================

        modelBuilder.Entity<Fatura>(entity =>
        {
            entity.HasKey(f => f.Id);

            entity.Property(f => f.ValorMensal)
                .HasPrecision(18, 2);

            entity.Property(f => f.ValorProporcional)
                .HasPrecision(18, 2);

            entity.Property(f => f.ValorTotal)
                .HasPrecision(18, 2);

            entity.Property(f => f.Observacao)
                .HasMaxLength(500);

            entity.HasOne(f => f.Empresa)
                .WithMany()
                .HasForeignKey(f => f.EmpresaId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(f => f.Assinatura)
                .WithMany()
                .HasForeignKey(f => f.AssinaturaId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(f => f.Plano)
                .WithMany()
                .HasForeignKey(f => f.PlanoId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // ========================================================
        // PAGAMENTO
        // ========================================================

        modelBuilder.Entity<Pagamento>(entity =>
        {
            entity.HasKey(p => p.Id);

            entity.Property(p => p.ValorPago)
                .HasPrecision(18, 2);

            entity.Property(p => p.IdTransacao)
                .HasMaxLength(200);

            entity.Property(p => p.CodigoPix)
                .HasMaxLength(500);

            entity.Property(p => p.Observacao)
                .HasMaxLength(500);

            entity.HasOne(p => p.Empresa)
                .WithMany()
                .HasForeignKey(p => p.EmpresaId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(p => p.Fatura)
                .WithMany()
                .HasForeignKey(p => p.FaturaId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }
}
