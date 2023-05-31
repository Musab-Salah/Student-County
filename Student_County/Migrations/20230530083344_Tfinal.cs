using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Student_County.Migrations
{
    /// <inheritdoc />
    public partial class Tfinal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "University",
                table: "Book",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "College",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedOn", "ModifiedOn" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 5, 30, 8, 33, 44, 466, DateTimeKind.Unspecified).AddTicks(2925), new TimeSpan(0, 0, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 5, 30, 8, 33, 44, 466, DateTimeKind.Unspecified).AddTicks(2926), new TimeSpan(0, 0, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "University",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedOn", "ModifiedOn" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 5, 30, 8, 33, 44, 466, DateTimeKind.Unspecified).AddTicks(2850), new TimeSpan(0, 0, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 5, 30, 8, 33, 44, 466, DateTimeKind.Unspecified).AddTicks(2854), new TimeSpan(0, 0, 0, 0, 0)) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "University",
                table: "Book");

            migrationBuilder.UpdateData(
                table: "College",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedOn", "ModifiedOn" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 5, 28, 16, 39, 50, 592, DateTimeKind.Unspecified).AddTicks(3263), new TimeSpan(0, 0, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 5, 28, 16, 39, 50, 592, DateTimeKind.Unspecified).AddTicks(3265), new TimeSpan(0, 0, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "University",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedOn", "ModifiedOn" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 5, 28, 16, 39, 50, 592, DateTimeKind.Unspecified).AddTicks(3221), new TimeSpan(0, 0, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 5, 28, 16, 39, 50, 592, DateTimeKind.Unspecified).AddTicks(3225), new TimeSpan(0, 0, 0, 0, 0)) });
        }
    }
}
