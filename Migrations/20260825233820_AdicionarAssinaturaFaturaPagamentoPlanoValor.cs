 using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ControllHub.Migrations
{
    /// <inheritdoc />
    public partial class AdicionarAssinaturaFaturaPagamentoPlanoValor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlanoValor_Planos_PlanoId",
                table: "PlanoValor");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PlanoValor",
                table: "PlanoValor");

            migrationBuilder.RenameTable(
                name: "PlanoValor",
                newName: "PlanosValores");

            migrationBuilder.RenameIndex(
                name: "IX_PlanoValor_PlanoId",
                table: "PlanosValores",
                newName: "IX_PlanosValores_PlanoId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PlanosValores",
                table: "PlanosValores",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Assinaturas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    empresaId = table.Column<int>(type: "integer", nullable: false),
                    PlanoId = table.Column<int>(type: "integer", nullable: false),
                    ValorMensal = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    DataInicio = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DataFim = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DiaVencimento = table.Column<int>(type: "integer", nullable: false),
                    PercentualReajustAnual = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false),
                    AnoUltimoReajuste = table.Column<int>(type: "integer", nullable: true),
                    Ativa = table.Column<bool>(type: "boolean", nullable: false),
                    DataCancelamnento = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    MotivoCancelamento = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    DataCadastro = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assinaturas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Assinaturas_Empresas_empresaId",
                        column: x => x.empresaId,
                        principalTable: "Empresas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Assinaturas_Planos_PlanoId",
                        column: x => x.PlanoId,
                        principalTable: "Planos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Faturas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmpresaId = table.Column<int>(type: "integer", nullable: false),
                    AssinaturaId = table.Column<int>(type: "integer", nullable: false),
                    PlanoId = table.Column<int>(type: "integer", nullable: false),
                    AnoCompetencia = table.Column<int>(type: "integer", nullable: false),
                    MesCompetencia = table.Column<int>(type: "integer", nullable: false),
                    ValorMensal = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    ValorProporcional = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    ValorTotal = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    DataInicioPeriodo = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DataFimPeriodo = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DataVencimento = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DataCadastro = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DataPagamento = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    Observacao = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Faturas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Faturas_Assinaturas_AssinaturaId",
                        column: x => x.AssinaturaId,
                        principalTable: "Assinaturas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Faturas_Empresas_EmpresaId",
                        column: x => x.EmpresaId,
                        principalTable: "Empresas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Faturas_Planos_PlanoId",
                        column: x => x.PlanoId,
                        principalTable: "Planos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Pagamentos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmpresaId = table.Column<int>(type: "integer", nullable: false),
                    FaturaId = table.Column<int>(type: "integer", nullable: false),
                    ValorPago = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    FormaPagamento = table.Column<int>(type: "integer", nullable: false),
                    IdTransacao = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    CodigoPix = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    QrCodePix = table.Column<string>(type: "text", nullable: true),
                    DataPagamento = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DataCadastro = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Observacao = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pagamentos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Pagamentos_Empresas_EmpresaId",
                        column: x => x.EmpresaId,
                        principalTable: "Empresas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Pagamentos_Faturas_FaturaId",
                        column: x => x.FaturaId,
                        principalTable: "Faturas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Assinaturas_empresaId",
                table: "Assinaturas",
                column: "empresaId");

            migrationBuilder.CreateIndex(
                name: "IX_Assinaturas_PlanoId",
                table: "Assinaturas",
                column: "PlanoId");

            migrationBuilder.CreateIndex(
                name: "IX_Faturas_AssinaturaId",
                table: "Faturas",
                column: "AssinaturaId");

            migrationBuilder.CreateIndex(
                name: "IX_Faturas_EmpresaId",
                table: "Faturas",
                column: "EmpresaId");

            migrationBuilder.CreateIndex(
                name: "IX_Faturas_PlanoId",
                table: "Faturas",
                column: "PlanoId");

            migrationBuilder.CreateIndex(
                name: "IX_Pagamentos_EmpresaId",
                table: "Pagamentos",
                column: "EmpresaId");

            migrationBuilder.CreateIndex(
                name: "IX_Pagamentos_FaturaId",
                table: "Pagamentos",
                column: "FaturaId");

            migrationBuilder.AddForeignKey(
                name: "FK_PlanosValores_Planos_PlanoId",
                table: "PlanosValores",
                column: "PlanoId",
                principalTable: "Planos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlanosValores_Planos_PlanoId",
                table: "PlanosValores");

            migrationBuilder.DropTable(
                name: "Pagamentos");

            migrationBuilder.DropTable(
                name: "Faturas");

            migrationBuilder.DropTable(
                name: "Assinaturas");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PlanosValores",
                table: "PlanosValores");

            migrationBuilder.RenameTable(
                name: "PlanosValores",
                newName: "PlanoValor");

            migrationBuilder.RenameIndex(
                name: "IX_PlanosValores_PlanoId",
                table: "PlanoValor",
                newName: "IX_PlanoValor_PlanoId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PlanoValor",
                table: "PlanoValor",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PlanoValor_Planos_PlanoId",
                table: "PlanoValor",
                column: "PlanoId",
                principalTable: "Planos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
