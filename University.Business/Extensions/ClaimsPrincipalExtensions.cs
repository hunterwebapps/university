using System.Linq;
using System.Security.Claims;

namespace University.Business.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static string GetUserId(this ClaimsPrincipal claimsPrincipal)
        {
            return claimsPrincipal.Claims.Single(c => c.Type == ClaimTypes.NameIdentifier).Value;
        }
    }
}
