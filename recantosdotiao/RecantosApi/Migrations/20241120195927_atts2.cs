using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecantosApi.Migrations
{
    /// <inheritdoc />
    public partial class atts2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "senha",
                table: "Usuarios",
                newName: "Senha");

            migrationBuilder.RenameColumn(
                name: "role",
                table: "Usuarios",
                newName: "Role");

            migrationBuilder.RenameColumn(
                name: "login",
                table: "Usuarios",
                newName: "Login");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Usuarios",
                newName: "Id");

            migrationBuilder.AddColumn<long>(
                name: "UserId",
                table: "Casas",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0L);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Casas");

            migrationBuilder.RenameColumn(
                name: "Senha",
                table: "Usuarios",
                newName: "senha");

            migrationBuilder.RenameColumn(
                name: "Role",
                table: "Usuarios",
                newName: "role");

            migrationBuilder.RenameColumn(
                name: "Login",
                table: "Usuarios",
                newName: "login");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Usuarios",
                newName: "id");
        }
    }
}
