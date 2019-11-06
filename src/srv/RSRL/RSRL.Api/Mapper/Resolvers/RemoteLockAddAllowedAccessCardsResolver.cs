using AutoMapper;
using RSRL.Api.AccessCards.Models;
using RSRL.Api.AccessCards.Services;
using RSRL.Api.Locks.Models;
using RSRL.Api.Locks.Params;
using System.Collections.Generic;
using System.Linq;

namespace RSRL.Api.Mapper.Resolvers
{
    public class RemoteLockAddAllowedAccessCardsResolver : IValueResolver<RemoteLockAddParams, RemoteLock, IList<AccessCard>>
    {
        private readonly IAccessCardRepository cardRepository;

        public RemoteLockAddAllowedAccessCardsResolver(IAccessCardRepository cardRepository)
        {
            this.cardRepository = cardRepository;
        }

        public IList<AccessCard> Resolve(RemoteLockAddParams source, RemoteLock destination, IList<AccessCard> destMember, ResolutionContext context)
        {
            return source.AllowedAccessCardIds
                .Select(id => cardRepository.GetById(id))
                .ToList();
        }
    }
}
