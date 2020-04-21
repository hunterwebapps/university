using System;
using System.Collections.Generic;

namespace University.DataAccess.Entities
{
    public class User
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateTime Created { get; set; }
        public List<UserRole> UserRoles { get; set; } = new List<UserRole>();
    }
}
