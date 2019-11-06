using AutoMapper;
using RSRL.Api.AccessCards.Models;
using RSRL.Api.AccessCards.Params;
using RSRL.Api.Users.Models;
using RSRL.Api.Users.Services;

namespace RSRL.Api.Mapper.Resolvers
{
    public class AccessCardAddOwnerResolver : IValueResolver<AccessCardAddParams, AccessCard, UserAccount>
    {
        private readonly IUserRepository userRepository;

        public AccessCardAddOwnerResolver(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public UserAccount Resolve(AccessCardAddParams source, AccessCard destination, UserAccount destMember, ResolutionContext context)
        {
            return userRepository.GetByIdOrDefault(source.OwnerId);
        }
    }
}
