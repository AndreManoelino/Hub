using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ControllHub.Migrations
{
    /// <inheritdoc />
    public partial class RemoverCpfETipoDocumentoDaEmpresa : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Empresas_CNPJ",
                table: "Empresas");

            migrationBuilder.DropIndex(
                name: "IX_Empresas_CPF",
                table: "Empresas");

            migrationBuilder.DropColumn(
                name: "CPF",
                table: "Empresas");

            migrationBuilder.DropColumn(
                name: "TipoDocumento",
                table: "Empresas");

            migrationBuilder.AlterColumn<string>(
                name: "CNPJ",
                table: "Empresas",
                type: "character varying(14)",
                maxLength: 14,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "character varying(14)",
                oldMaxLength: 14,
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Empresas_CNPJ",
                table: "Empresas",
                column: "CNPJ",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Empresas_CNPJ",
                table: "Empresas");

            migrationBuilder.AlterColumn<string>(
                name: "CNPJ",
                table: "Empresas",
                type: "character varying(14)",
                maxLength: 14,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(14)",
                oldMaxLength: 14);

            migrationBuilder.AddColumn<string>(
                name: "CPF",
                table: "Empresas",
                type: "character varying(11)",
                maxLength: 11,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TipoDocumento",
                table: "Empresas",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Empresas_CNPJ",
                table: "Empresas",
                column: "CNPJ",
                unique: true,
                filter: "\"CNPJ\" IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Empresas_CPF",
                table: "Empresas",
                column: "CPF",
                unique: true,
                filter: "\"CPF\" IS NOT NULL");
        }
    }
}
