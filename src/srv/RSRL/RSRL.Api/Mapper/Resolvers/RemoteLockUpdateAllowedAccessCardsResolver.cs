using AutoMapper;
using RSRL.Api.AccessCards.Models;
using RSRL.Api.AccessCards.Services;
using RSRL.Api.Locks.Models;
using RSRL.Api.Locks.Params;
using System.Collections.Generic;
using System.Linq;

namespace RSRL.Api.Mapper.Resolvers
{
    public class RemoteLockUpdateAllowedAccessCardsResolver : IValueResolver<RemoteLockUpdateParams, RemoteLock, IList<AccessCard>>
    {
        private readonly IAccessCardRepository cardRepository;

        public RemoteLockUpdateAllowedAccessCardsResolver(IAccessCardRepository cardRepository)
        {
            this.cardRepository = cardRepository;
        }

        public IList<AccessCard> Resolve(RemoteLockUpdateParams source, RemoteLock destination, IList<AccessCard> destMember, ResolutionContext context)
        {
            return source.AllowedAccessCardIds
                .Select(id => cardRepository.GetById(id))
                .ToList();
        }
    }
}
