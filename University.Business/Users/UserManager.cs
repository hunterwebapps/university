using AutoMapper;
using Microsoft.EntityFrameworkCore;
using University.DataAccess;
using University.Models.User.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace University.Business.Users
{
    public class UserManager
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public UserManager(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<User> GetUserAsync(string userId)
        {
            var entity = await _dbContext.Users.FindAsync(userId);

            if (entity == null)
            {
                return null;
            }

            return _mapper.Map<User>(entity);
        }

        public async Task<List<User>> GetUsersAsync()
        {
            var entities = await _dbContext.Users.ToListAsync();

            return _mapper.Map<List<User>>(entities);
        }
    }
}
