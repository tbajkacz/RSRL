using AutoMapper;
using RSRL.Api.Auth.Services;
using RSRL.Api.Users.Models;
using RSRL.Api.Users.Params;

namespace RSRL.Api.Mapper.Resolvers
{
    public class UserAccountAddPasswordHashResolver : IValueResolver<UserAccountAddParams, UserAccount, string>
    {
        private readonly IHashService hashService;

        public UserAccountAddPasswordHashResolver(IHashService hashService)
        {
            this.hashService = hashService;
        }

        public string Resolve(UserAccountAddParams source, UserAccount destination, string destMember, ResolutionContext context)
        {
            return hashService.Hash(source.Password);
        }
    }
}
