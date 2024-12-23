using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecantosApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Casas_Blocos_BlocoId",
                table: "Casas");

            migrationBuilder.DropForeignKey(
                name: "FK_Residentes_Casas_CasaId",
                table: "Residentes");

            migrationBuilder.DropColumn(
                name: "Genero",
                table: "Residentes");

            migrationBuilder.AlterColumn<long>(
                name: "CasaId",
                table: "Residentes",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Login",
                table: "Residentes",
                type: "TEXT",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Senha",
                table: "Residentes",
                type: "TEXT",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<long>(
                name: "BlocoId",
                table: "Casas",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Casas_Blocos_BlocoId",
                table: "Casas",
                column: "BlocoId",
                principalTable: "Blocos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Residentes_Casas_CasaId",
                table: "Residentes",
                column: "CasaId",
                principalTable: "Casas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Casas_Blocos_BlocoId",
                table: "Casas");

            migrationBuilder.DropForeignKey(
                name: "FK_Residentes_Casas_CasaId",
                table: "Residentes");

            migrationBuilder.DropColumn(
                name: "Login",
                table: "Residentes");

            migrationBuilder.DropColumn(
                name: "Senha",
                table: "Residentes");

            migrationBuilder.AlterColumn<long>(
                name: "CasaId",
                table: "Residentes",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<string>(
                name: "Genero",
                table: "Residentes",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<long>(
                name: "BlocoId",
                table: "Casas",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "INTEGER");

            migrationBuilder.AddForeignKey(
                name: "FK_Casas_Blocos_BlocoId",
                table: "Casas",
                column: "BlocoId",
                principalTable: "Blocos",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Residentes_Casas_CasaId",
                table: "Residentes",
                column: "CasaId",
                principalTable: "Casas",
                principalColumn: "Id");
        }
    }
}
