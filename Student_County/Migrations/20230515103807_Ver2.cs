using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Student_County.Migrations
{
    /// <inheritdoc />
    public partial class Ver2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "College",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedOn", "ModifiedOn" },
                values: new object[] { new DateTime(2023, 4, 27, 18, 38, 27, 714, DateTimeKind.Utc).AddTicks(1695), new DateTime(2023, 4, 27, 18, 38, 27, 714, DateTimeKind.Utc).AddTicks(1696) });

            migrationBuilder.UpdateData(
                table: "University",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedOn", "ModifiedOn" },
                values: new object[] { new DateTime(2023, 4, 27, 18, 38, 27, 714, DateTimeKind.Utc).AddTicks(1668), new DateTime(2023, 4, 27, 18, 38, 27, 714, DateTimeKind.Utc).AddTicks(1669) });
        }
    }
}
