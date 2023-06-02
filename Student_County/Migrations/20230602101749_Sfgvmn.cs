using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Student_County.Migrations
{
    /// <inheritdoc />
    public partial class Sfgvmn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Condition",
                table: "Tools",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "College",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedOn", "ModifiedOn" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 6, 2, 10, 17, 49, 175, DateTimeKind.Unspecified).AddTicks(2006), new TimeSpan(0, 0, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 6, 2, 10, 17, 49, 175, DateTimeKind.Unspecified).AddTicks(2007), new TimeSpan(0, 0, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "University",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedOn", "ModifiedOn" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 6, 2, 10, 17, 49, 175, DateTimeKind.Unspecified).AddTicks(1972), new TimeSpan(0, 0, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 6, 2, 10, 17, 49, 175, DateTimeKind.Unspecified).AddTicks(1977), new TimeSpan(0, 0, 0, 0, 0)) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Condition",
                table: "Tools");

            migrationBuilder.UpdateData(
                table: "College",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedOn", "ModifiedOn" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 6, 1, 16, 30, 47, 442, DateTimeKind.Unspecified).AddTicks(2334), new TimeSpan(0, 0, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 6, 1, 16, 30, 47, 442, DateTimeKind.Unspecified).AddTicks(2336), new TimeSpan(0, 0, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "University",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedOn", "ModifiedOn" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 6, 1, 16, 30, 47, 442, DateTimeKind.Unspecified).AddTicks(2291), new TimeSpan(0, 0, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 6, 1, 16, 30, 47, 442, DateTimeKind.Unspecified).AddTicks(2295), new TimeSpan(0, 0, 0, 0, 0)) });
        }
    }
}
