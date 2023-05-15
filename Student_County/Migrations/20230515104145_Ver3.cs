using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Student_County.Migrations
{
    /// <inheritdoc />
    public partial class Ver3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "College",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedOn", "ModifiedOn" },
                values: new object[] { new DateTime(2023, 5, 15, 10, 41, 45, 324, DateTimeKind.Utc).AddTicks(5017), new DateTime(2023, 5, 15, 10, 41, 45, 324, DateTimeKind.Utc).AddTicks(5018) });

            migrationBuilder.UpdateData(
                table: "University",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedOn", "ModifiedOn" },
                values: new object[] { new DateTime(2023, 5, 15, 10, 41, 45, 324, DateTimeKind.Utc).AddTicks(4993), new DateTime(2023, 5, 15, 10, 41, 45, 324, DateTimeKind.Utc).AddTicks(4995) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "College",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedOn", "ModifiedOn" },
                values: new object[] { new DateTime(2023, 5, 15, 10, 38, 6, 857, DateTimeKind.Utc).AddTicks(4944), new DateTime(2023, 5, 15, 10, 38, 6, 857, DateTimeKind.Utc).AddTicks(4945) });

            migrationBuilder.UpdateData(
                table: "University",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedOn", "ModifiedOn" },
                values: new object[] { new DateTime(2023, 5, 15, 10, 38, 6, 857, DateTimeKind.Utc).AddTicks(4907), new DateTime(2023, 5, 15, 10, 38, 6, 857, DateTimeKind.Utc).AddTicks(4909) });
        }
    }
}
