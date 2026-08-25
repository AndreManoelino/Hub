using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ControllHub.Migrations
{
    /// <inheritdoc />
    public partial class AdicionarTipoEmpresa : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TipoEmpresaId",
                table: "Empresas",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "PlanoValor",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PlanoId = table.Column<int>(type: "integer", nullable: false),
                    ValorMensal = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    PercentualReajuste = table.Column<decimal>(type: "numeric(5,2)", nullable: false),
                    DataInicioVigencia = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DataFimVigencia = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Ativo = table.Column<bool>(type: "boolean", nullable: false),
                    DataCadastro = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlanoValor", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlanoValor_Planos_PlanoId",
                        column: x => x.PlanoId,
                        principalTable: "Planos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TiposEmpresa",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nome = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Codigo = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Descricao = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Ativo = table.Column<bool>(type: "boolean", nullable: false),
                    DataCadastro = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TiposEmpresa", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Empresas_TipoEmpresaId",
                table: "Empresas",
                column: "TipoEmpresaId");

            migrationBuilder.CreateIndex(
                name: "IX_PlanoValor_PlanoId",
                table: "PlanoValor",
                column: "PlanoId");

            migrationBuilder.CreateIndex(
                name: "IX_TiposEmpresa_Codigo",
                table: "TiposEmpresa",
                column: "Codigo",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Empresas_TiposEmpresa_TipoEmpresaId",
                table: "Empresas",
                column: "TipoEmpresaId",
                principalTable: "TiposEmpresa",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Empresas_TiposEmpresa_TipoEmpresaId",
                table: "Empresas");

            migrationBuilder.DropTable(
                name: "PlanoValor");

            migrationBuilder.DropTable(
                name: "TiposEmpresa");

            migrationBuilder.DropIndex(
                name: "IX_Empresas_TipoEmpresaId",
                table: "Empresas");

            migrationBuilder.DropColumn(
                name: "TipoEmpresaId",
                table: "Empresas");
        }
    }
}
