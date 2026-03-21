using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CMS.API.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Transfers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    Slug = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    Domain = table.Column<string>(type: "TEXT", maxLength: 253, nullable: false),
                    LogoUrl = table.Column<string>(type: "TEXT", nullable: true),
                    BrandColorStart = table.Column<string>(type: "TEXT", maxLength: 9, nullable: false),
                    BrandColorEnd = table.Column<string>(type: "TEXT", maxLength: 9, nullable: false),
                    PrimaryColorStart = table.Column<string>(type: "TEXT", maxLength: 9, nullable: false),
                    PrimaryColorEnd = table.Column<string>(type: "TEXT", maxLength: 9, nullable: false),
                    Phone = table.Column<string>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: false),
                    LegalAddress = table.Column<string>(type: "TEXT", nullable: false),
                    TransportType = table.Column<string>(type: "TEXT", nullable: false),
                    INN = table.Column<string>(type: "TEXT", nullable: true),
                    OGRN = table.Column<string>(type: "TEXT", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transfers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    TransferId = table.Column<int>(type: "INTEGER", nullable: false),
                    Slug = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    Title = table.Column<string>(type: "TEXT", maxLength: 300, nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    TitlePage = table.Column<string>(type: "TEXT", maxLength: 300, nullable: false),
                    LogoUrl = table.Column<string>(type: "TEXT", nullable: true),
                    BrandColorStart = table.Column<string>(type: "TEXT", maxLength: 9, nullable: true),
                    BrandColorEnd = table.Column<string>(type: "TEXT", maxLength: 9, nullable: true),
                    PrimaryColorStart = table.Column<string>(type: "TEXT", maxLength: 9, nullable: true),
                    PrimaryColorEnd = table.Column<string>(type: "TEXT", maxLength: 9, nullable: true),
                    IsPublished = table.Column<bool>(type: "INTEGER", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Events_Transfers_TransferId",
                        column: x => x.TransferId,
                        principalTable: "Transfers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Transfers",
                columns: new[] { "Id", "BrandColorEnd", "BrandColorStart", "CreatedAt", "Domain", "Email", "INN", "LegalAddress", "LogoUrl", "Name", "OGRN", "Phone", "PrimaryColorEnd", "PrimaryColorStart", "Slug", "TransportType", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, "#c4171c", "#e31e24", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "events.autobus.ru", "info@avtobus.ru", "7700000001", "г. Москва, ул. Примерная, д. 1", null, "Автобус.ру", "1027700000001", "+7 (800) 555-35-35", "#e31e24", "#e31e24", "avtobusru", "Автобус", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 2, "#1557b0", "#1a73e8", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "events.avtobus1.ru", "info@avtobusru.com", "7700000002", "г. Москва, ул. Другая, д. 2", null, "Avtobus.ru", "1027700000002", "+7 (800) 555-35-36", "#2d9249", "#34a853", "avtobusru-en", "Минивэн", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) }
                });

            migrationBuilder.InsertData(
                table: "Events",
                columns: new[] { "Id", "BrandColorEnd", "BrandColorStart", "CreatedAt", "Description", "IsPublished", "LogoUrl", "PrimaryColorEnd", "PrimaryColorStart", "Slug", "Title", "TitlePage", "TransferId", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, null, null, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Комфортный трансфер на Российскую строительную неделю 2026. Автобус.ру — надёжный перевозчик.", true, null, null, null, "rsn-2026", "Трансфер на РСН 2026 — Автобус.ру", "Трансфер на РСН 2026", 1, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 2, null, null, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Удобный трансфер на выставку Иннопром 2026 в Екатеринбурге.", true, null, null, null, "innoprom-2026", "Трансфер на Иннопром 2026 — Avtobus.ru", "Трансфер на Иннопром 2026", 2, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 3, "#e55d00", "#ff6b00", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Трансфер на международную выставку WorldFood Moscow 2026.", true, null, null, null, "worldfood-2026", "Трансфер на WorldFood 2026 — Автобус.ру", "Трансфер на WorldFood 2026", 1, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Events_Slug",
                table: "Events",
                column: "Slug",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Events_TransferId",
                table: "Events",
                column: "TransferId");

            migrationBuilder.CreateIndex(
                name: "IX_Transfers_Domain",
                table: "Transfers",
                column: "Domain",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transfers_Slug",
                table: "Transfers",
                column: "Slug",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DropTable(
                name: "Transfers");
        }
    }
}
