using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecantosApi.Migrations
{
    /// <inheritdoc />
    public partial class AddCasaAndBlocos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "CasaId",
                table: "Residentes",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Blocos",
                columns: table => new
                {
                    Id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Blocos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Casas",
                columns: table => new
                {
                    Id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Numero = table.Column<int>(type: "INTEGER", nullable: false),
                    BlocoId = table.Column<long>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Casas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Casas_Blocos_BlocoId",
                        column: x => x.BlocoId,
                        principalTable: "Blocos",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Residentes_CasaId",
                table: "Residentes",
                column: "CasaId");

            migrationBuilder.CreateIndex(
                name: "IX_Casas_BlocoId",
                table: "Casas",
                column: "BlocoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Residentes_Casas_CasaId",
                table: "Residentes",
                column: "CasaId",
                principalTable: "Casas",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Residentes_Casas_CasaId",
                table: "Residentes");

            migrationBuilder.DropTable(
                name: "Casas");

            migrationBuilder.DropTable(
                name: "Blocos");

            migrationBuilder.DropIndex(
                name: "IX_Residentes_CasaId",
                table: "Residentes");

            migrationBuilder.DropColumn(
                name: "CasaId",
                table: "Residentes");
        }
    }
}
