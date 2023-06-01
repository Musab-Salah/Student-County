﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Student_County.Migrations
{
    /// <inheritdoc />
    public partial class Fregvda : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "CreatedOnLastMessage",
                table: "Room",
                type: "datetimeoffset",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastMessage",
                table: "Room",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "College",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedOn", "ModifiedOn" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 5, 31, 20, 52, 30, 110, DateTimeKind.Unspecified).AddTicks(5370), new TimeSpan(0, 0, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 5, 31, 20, 52, 30, 110, DateTimeKind.Unspecified).AddTicks(5371), new TimeSpan(0, 0, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "University",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedOn", "ModifiedOn" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 5, 31, 20, 52, 30, 110, DateTimeKind.Unspecified).AddTicks(5338), new TimeSpan(0, 0, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 5, 31, 20, 52, 30, 110, DateTimeKind.Unspecified).AddTicks(5343), new TimeSpan(0, 0, 0, 0, 0)) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedOnLastMessage",
                table: "Room");

            migrationBuilder.DropColumn(
                name: "LastMessage",
                table: "Room");

            migrationBuilder.UpdateData(
                table: "College",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedOn", "ModifiedOn" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 5, 31, 19, 53, 25, 907, DateTimeKind.Unspecified).AddTicks(1578), new TimeSpan(0, 0, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 5, 31, 19, 53, 25, 907, DateTimeKind.Unspecified).AddTicks(1580), new TimeSpan(0, 0, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "University",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedOn", "ModifiedOn" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 5, 31, 19, 53, 25, 907, DateTimeKind.Unspecified).AddTicks(1541), new TimeSpan(0, 0, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 5, 31, 19, 53, 25, 907, DateTimeKind.Unspecified).AddTicks(1547), new TimeSpan(0, 0, 0, 0, 0)) });
        }
    }
}
