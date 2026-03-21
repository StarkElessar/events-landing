using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CMS.API.Migrations
{
    /// <inheritdoc />
    public partial class RenameLogoToTopBottomLogo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LogoUrl",
                table: "Events",
                newName: "TopLogoUrl");

            migrationBuilder.AddColumn<string>(
                name: "BottomLogoUrl",
                table: "Events",
                type: "TEXT",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Events",
                keyColumn: "Id",
                keyValue: 1,
                column: "BottomLogoUrl",
                value: null);

            migrationBuilder.UpdateData(
                table: "Events",
                keyColumn: "Id",
                keyValue: 2,
                column: "BottomLogoUrl",
                value: null);

            migrationBuilder.UpdateData(
                table: "Events",
                keyColumn: "Id",
                keyValue: 3,
                column: "BottomLogoUrl",
                value: null);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BottomLogoUrl",
                table: "Events");

            migrationBuilder.RenameColumn(
                name: "TopLogoUrl",
                table: "Events",
                newName: "LogoUrl");
        }
    }
}
