using UserViewModel = University.Models.User.ViewModels.User;

namespace University.Models.Auth.ViewModels
{
    public class AuthenticatedUser
    {
        public UserViewModel User { get; set; }
        public string Token { get; set; }
    }
}
