using AutoMapper;
using RSRL.Api.AccessCards.Dto;
using RSRL.Api.AccessCards.Models;
using RSRL.Api.AccessCards.Params;
using RSRL.Api.Audit.Dto;
using RSRL.Api.Audit.Models;
using RSRL.Api.Locks.Dto;
using RSRL.Api.Locks.Models;
using RSRL.Api.Locks.Params;
using RSRL.Api.Mapper.Resolvers;
using RSRL.Api.Users.Dto;
using RSRL.Api.Users.Models;
using RSRL.Api.Users.Params;

namespace RSRL.Api.Mapper
{
    public class DefaultAutoMapperProfile : Profile
    {
        public DefaultAutoMapperProfile()
        {
            CreateMap<UserAccount, UserAccountDto>();
            CreateMap<UserAccountAddParams, UserAccount>()
                .ForMember(u => u.PasswordHash, mce => mce.MapFrom<UserAccountAddPasswordHashResolver>());

            CreateMap<RemoteLockAddParams, RemoteLock>()
                .ForMember(l => l.AllowedAccessCards, mce => mce.MapFrom<RemoteLockAddAllowedAccessCardsResolver>());
            CreateMap<RemoteLock, RemoteLockDto>();

            CreateMap<AccessCardAddParams, AccessCard>()
                .ForMember(c => c.Owner, mce => mce.MapFrom<AccessCardAddOwnerResolver>());
            CreateMap<AccessCard, AccessCardDto>();

            CreateMap<ActionLog, ActionLogDto>();
        }
    }
}
