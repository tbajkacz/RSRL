using AutoMapper;
using RSRL.Api.AccessCards.Models;
using RSRL.Api.AccessCards.Params;
using RSRL.Api.Users.Models;
using RSRL.Api.Users.Services;

namespace RSRL.Api.Mapper.Resolvers
{
    public class AccessCardUpdateOwnerResolver : IValueResolver<AccessCardUpdateParams, AccessCard, UserAccount>
    {
        private readonly IUserRepository userRepository;

        public AccessCardUpdateOwnerResolver(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public UserAccount Resolve(AccessCardUpdateParams source, AccessCard destination, UserAccount destMember, ResolutionContext context)
        {
            return userRepository.GetByIdOrDefault(source.OwnerId);
        }
    }
}
