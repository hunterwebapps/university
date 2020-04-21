using System;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using University.DataAccess.Entities;
using University.Models.Auth.Enums;

namespace University.DataAccess
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        { }

        public DbSet<User> Users { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            SeedData(builder);

            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }

        private void SeedData(ModelBuilder builder)
        {
            var userId = Guid.NewGuid().ToString();
            var salt = new byte[36];
            var password = "Garthan@123";

            using (var rng = new RNGCryptoServiceProvider())
            {
                rng.GetBytes(salt);
            }

            using (var deriveBytes = new Rfc2898DeriveBytes(password, salt, 1000))
            {
                var hash = deriveBytes.GetBytes(36);

                password = Encoding.ASCII.GetString(hash);
            }

            builder.Entity<User>().HasData(
                new User()
                {
                    Id = userId,
                    FirstName = "Dwayne",
                    LastName = "Hunter",
                    Email = "dwaynewhunter@gmail.com",
                    PasswordHash = password,
                    PasswordSalt = salt,
                    Created = DateTime.Now,
                });

            builder.Entity<UserRole>().HasData(
                new UserRole()
                {
                    UserId = userId,
                    Role = RoleIdentifier.Super.ToString(),
                },
                new UserRole()
                {
                    UserId = userId,
                    Role = RoleIdentifier.Admin.ToString(),
                },
                new UserRole()
                {
                    UserId = userId,
                    Role = RoleIdentifier.Staff.ToString(),
                },
                new UserRole()
                { 
                    UserId = userId,
                    Role = RoleIdentifier.Teacher.ToString(),
                });
        }
    }
}
