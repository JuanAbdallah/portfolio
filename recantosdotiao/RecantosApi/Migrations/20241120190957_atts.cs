using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecantosApi.Migrations
{
    /// <inheritdoc />
    public partial class atts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "CasaId",
                table: "Usuarios",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_Usuarios_CasaId",
                table: "Usuarios",
                column: "CasaId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Usuarios_Casas_CasaId",
                table: "Usuarios",
                column: "CasaId",
                principalTable: "Casas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Usuarios_Casas_CasaId",
                table: "Usuarios");

            migrationBuilder.DropIndex(
                name: "IX_Usuarios_CasaId",
                table: "Usuarios");

            migrationBuilder.DropColumn(
                name: "CasaId",
                table: "Usuarios");
        }
    }
}
