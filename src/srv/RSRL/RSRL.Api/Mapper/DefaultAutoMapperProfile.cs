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
            CreateMap<UserAccountUpdateParams, UserAccount>()
                .ForMember(u => u.PasswordHash, mce => mce.MapFrom<UserAccountUpdatePasswordHashResolver>());

            CreateMap<RemoteLockAddParams, RemoteLock>()
                .ForMember(l => l.AllowedAccessCards, mce => mce.MapFrom<RemoteLockAddAllowedAccessCardsResolver>());
            CreateMap<RemoteLockUpdateParams, RemoteLock>()
                .ForMember(l => l.AllowedAccessCards, mce => mce.MapFrom<RemoteLockUpdateAllowedAccessCardsResolver>())
                .ForMember(r => r.SecretKey, mce => mce.MapFrom<RemoteLockUpdateSecretKeyResolver>());
            CreateMap<RemoteLock, RemoteLockDto>();

            CreateMap<AccessCardAddParams, AccessCard>()
                .ForMember(c => c.Owner, mce => mce.MapFrom<AccessCardAddOwnerResolver>());
            CreateMap<AccessCardUpdateParams, AccessCard>()
                .ForMember(c => c.Owner, mce => mce.MapFrom<AccessCardUpdateOwnerResolver>());
            CreateMap<AccessCard, AccessCardDto>();

            CreateMap<ActionLog, ActionLogDto>();
            CreateMap<Pesel, string>()
                .ConvertUsing(p => p.Value);
            CreateMap<string, Pesel>()
                .ConvertUsing(s => new Pesel(s));
        }
    }
}
