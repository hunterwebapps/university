using AutoMapper;
using University.Models.Auth.Enums;
using System;
using System.Linq;
using UserEntity = University.DataAccess.Entities.User;
using UserViewModel = University.Models.User.ViewModels.User;


namespace University.DataAccess.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            MapEntitiesToViewModels();
            MapBindingModelsToEntities();
        }

        private void MapEntitiesToViewModels()
        {
            CreateMap<UserEntity, UserViewModel>().ConvertUsing((entity, _, context) => CastUserEntityToUserViewModel(entity, context.Mapper));
        }

        private void MapBindingModelsToEntities()
        {

        }

        private UserViewModel CastUserEntityToUserViewModel(UserEntity entity, IRuntimeMapper mapper)
        {
            return new UserViewModel()
            {
                Id = entity.Id,
                DisplayName = $"{entity.FirstName} {entity.LastName}".Trim(),
                Email = entity.Email,
                Roles = entity.UserRoles.Select(ur => (RoleIdentifier)Enum.Parse(typeof(RoleIdentifier), ur.Role)).ToList(),
                Created = entity.Created,
            };
        }
}
}
