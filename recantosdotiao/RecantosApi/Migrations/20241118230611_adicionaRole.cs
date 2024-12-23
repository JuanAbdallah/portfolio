using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecantosApi.Migrations
{
    /// <inheritdoc />
    public partial class adicionaRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "role",
                table: "Usuarios",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "role",
                table: "Usuarios");
        }
    }
}
