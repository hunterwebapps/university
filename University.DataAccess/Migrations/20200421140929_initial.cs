using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace University.DataAccess.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    FirstName = table.Column<string>(maxLength: 254, nullable: true),
                    LastName = table.Column<string>(maxLength: 254, nullable: true),
                    Email = table.Column<string>(maxLength: 254, nullable: false),
                    PasswordHash = table.Column<string>(fixedLength: true, maxLength: 36, nullable: false),
                    PasswordSalt = table.Column<byte[]>(fixedLength: true, maxLength: 36, nullable: false),
                    Created = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    Role = table.Column<string>(unicode: false, maxLength: 254, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoles", x => new { x.UserId, x.Role });
                    table.ForeignKey(
                        name: "FK_UserRoles_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Created", "Email", "FirstName", "LastName", "PasswordHash", "PasswordSalt" },
                values: new object[] { "51398400-4dc5-4237-931e-494be54aa2bc", new DateTime(2020, 4, 21, 7, 9, 28, 506, DateTimeKind.Local).AddTicks(2083), "dwaynewhunter@gmail.com", "Dwayne", "Hunter", "???7???-%X??h\\?,47???z?o?YS??V?[_", new byte[] { 121, 13, 41, 77, 155, 121, 67, 166, 37, 84, 39, 39, 166, 235, 157, 232, 79, 34, 48, 23, 56, 5, 254, 178, 94, 189, 45, 205, 65, 71, 83, 41, 159, 164, 61, 214 } });

            migrationBuilder.InsertData(
                table: "UserRoles",
                columns: new[] { "UserId", "Role" },
                values: new object[,]
                {
                    { "51398400-4dc5-4237-931e-494be54aa2bc", "Super" },
                    { "51398400-4dc5-4237-931e-494be54aa2bc", "Admin" },
                    { "51398400-4dc5-4237-931e-494be54aa2bc", "Staff" },
                    { "51398400-4dc5-4237-931e-494be54aa2bc", "Teacher" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserRoles");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
