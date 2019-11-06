using AutoMapper;
using RSRL.Api.Users.Models;
using RSRL.Api.Users.Params;
using RSRL.Api.Users.Services;

namespace RSRL.Api.Mapper.Resolvers
{
    public class UserAccountUpdatePasswordHashResolver : IValueResolver<UserAccountUpdateParams, UserAccount, string>
    {
        private readonly IUserRepository userRepository;

        public UserAccountUpdatePasswordHashResolver(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public string Resolve(UserAccountUpdateParams source, UserAccount destination, string destMember, ResolutionContext context)
        {
            return userRepository.GetById(source.Id).PasswordHash;
        }
    }
}
