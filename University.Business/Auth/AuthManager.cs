using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using University.DataAccess;
using University.Models.Auth.BindingModels;
using University.Models.Auth.Enums;
using University.Models.Auth.ViewModels;
using University.Models.User.ViewModels;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using UserEntity = University.DataAccess.Entities.User;

namespace University.Business.Auth
{
    public class AuthManager
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly string _jwtSecret;

        public AuthManager(ApplicationDbContext dataContext, IMapper mapper, IConfiguration configuration)
        {
            _dbContext = dataContext;
            _mapper = mapper;
            _jwtSecret = configuration["UniversityJwtSecret"];
        }

        public async Task<AuthenticatedUser> AuthenticateUserAsync(LoginCredentials loginCredentials)
        {
            var user = await _dbContext.Users
                .Include(u => u.UserRoles)
                .SingleOrDefaultAsync(u => u.Email == loginCredentials.Email);

            if (user == null)
            {
                return null;
            }

            var passwordHasher = new PasswordHash(loginCredentials.Password, user.PasswordSalt);

            if (passwordHasher.Hash != user.PasswordHash)
            {
                return null;
            }

            var model = _mapper.Map<User>(user);

            var token = MakeToken(model, loginCredentials.Remember);

            return new AuthenticatedUser()
            {
                User = model,
                Token = token,
            };
        }

        public async Task<User> RegisterUserAsync(RegisterCredentials registerCredentials)
        {
            var issues = await CheckRegisterCredentialsAsync(registerCredentials);
            if (issues.Count > 0)
            {
                throw new Exception($"{nameof(CheckRegisterCredentialsAsync)} Failed");
            }

            var passwordHash = new PasswordHash(registerCredentials.Password);

            var entity = new UserEntity
            {
                Id = Guid.NewGuid().ToString(),
                Email = registerCredentials.Email,
                PasswordHash = passwordHash.Hash,
                PasswordSalt = passwordHash.Salt,
                Created = DateTime.Now,
            };

            await _dbContext.Users.AddAsync(entity);

            await _dbContext.SaveChangesAsync();

            return _mapper.Map<User>(entity);
        }

        public async Task<List<RegisterIssue>> CheckRegisterCredentialsAsync(RegisterCredentials registerCredentials)
        {
            var issues = new List<RegisterIssue>();

            var isEmailExists = await _dbContext.Users.AnyAsync(u => u.Email == registerCredentials.Email);
            if (isEmailExists)
            {
                issues.Add(RegisterIssue.DuplicateEmail);
            }

            if (!IsComplexPassword(registerCredentials.Password))
            {
                issues.Add(RegisterIssue.InvalidPassword);
            }

            return issues;
        }

        public async Task<string> RenewToken(string userId)
        {
            var entity = await _dbContext.Users
                .Include(u => u.UserRoles)
                .SingleAsync(u => u.Id == userId);

            var model = _mapper.Map<User>(entity);

            var token = MakeToken(model, false);

            return token;
        }

        private string MakeToken(User model, bool remember)
        {
            var roleClaims = model.Roles.Select(role => new Claim(ClaimTypes.Role, role.ToString()));

            var allClaims = roleClaims.Concat(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, model.Id),
                new Claim(ClaimTypes.Name, model.Email),
            }).ToArray();

            return EncodeToken(allClaims, remember);
        }

        private string EncodeToken(Claim[] claims, bool rememberMe)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSecret);
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                Expires = rememberMe
                    ? DateTime.UtcNow.AddYears(10)
                    : DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature),
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        private bool IsComplexPassword(string password)
        {
            var hasUpperCase = new Regex("[A-Z]").IsMatch(password) ? 1 : 0;
            var hasLowerCase = new Regex("[a-z]").IsMatch(password) ? 1 : 0;
            var hasNumbers = new Regex("\\d").IsMatch(password) ? 1 : 0;
            var hasNonAlphas = new Regex("\\W").IsMatch(password) ? 1 : 0;

            var isComplex = hasUpperCase + hasLowerCase + hasNumbers + hasNonAlphas >= 3;

            return isComplex && password.Length >= 8;
        }

    }
}
