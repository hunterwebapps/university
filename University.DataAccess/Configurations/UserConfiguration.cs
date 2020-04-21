using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using University.DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace University.DataAccess.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder
                .Property(u => u.FirstName)
                .HasMaxLength(254);

            builder
                .Property(u => u.LastName)
                .HasMaxLength(254);

            builder
                .Property(u => u.Email)
                .HasMaxLength(254)
                .IsRequired();

            builder
                .Property(u => u.PasswordHash)
                .HasMaxLength(36)
                .IsFixedLength()
                .IsRequired();

            builder
                .Property(u => u.PasswordSalt)
                .HasMaxLength(36)
                .IsFixedLength()
                .IsRequired();
        }
    }
}
