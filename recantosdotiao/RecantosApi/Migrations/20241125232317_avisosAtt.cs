using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecantosApi.Migrations
{
    /// <inheritdoc />
    public partial class avisosAtt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DataExpiracao",
                table: "Avisos",
                newName: "Data");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Data",
                table: "Avisos",
                newName: "DataExpiracao");
        }
    }
}
