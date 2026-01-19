using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace VehicleConsole.API.Migrations
{
    /// <inheritdoc />
    public partial class AddVehicleRoutesAndRoutePoints : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VehicleRoutes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VehicleRoutes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RoutePoints",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RouteId = table.Column<int>(type: "integer", nullable: false),
                    Latitude = table.Column<double>(type: "double precision", nullable: false),
                    Longitude = table.Column<double>(type: "double precision", nullable: false),
                    Order = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoutePoints", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RoutePoints_VehicleRoutes_RouteId",
                        column: x => x.RouteId,
                        principalTable: "VehicleRoutes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "VehicleRoutes",
                columns: new[] { "Id", "CreatedAt", "IsActive", "Name" },
                values: new object[] { 1, new DateTime(2026, 1, 19, 0, 0, 0, 0, DateTimeKind.Utc), true, "Ankara City Route" });

            migrationBuilder.InsertData(
                table: "RoutePoints",
                columns: new[] { "Id", "Latitude", "Longitude", "Order", "RouteId" },
                values: new object[,]
                {
                    { 1, 39.933399999999999, 32.859699999999997, 1, 1 },
                    { 2, 39.927199999999999, 32.864400000000003, 2, 1 },
                    { 3, 39.9208, 32.854100000000003, 3, 1 },
                    { 4, 39.914999999999999, 32.840000000000003, 4, 1 },
                    { 5, 39.909999999999997, 32.829999999999998, 5, 1 },
                    { 6, 39.905000000000001, 32.82, 6, 1 },
                    { 7, 39.899999999999999, 32.810000000000002, 7, 1 },
                    { 8, 39.895000000000003, 32.799999999999997, 8, 1 },
                    { 9, 39.890000000000001, 32.789999999999999, 9, 1 },
                    { 10, 39.884999999999998, 32.780000000000001, 10, 1 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_RoutePoints_RouteId",
                table: "RoutePoints",
                column: "RouteId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RoutePoints");

            migrationBuilder.DropTable(
                name: "VehicleRoutes");
        }
    }
}
