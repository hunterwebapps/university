using University.Models.Auth.Enums;
using System;
using System.Collections.Generic;

namespace University.Models.User.ViewModels
{
    public class User
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public List<RoleIdentifier> Roles { get; set; }
        public DateTime Created { get; set; }
    }
}
