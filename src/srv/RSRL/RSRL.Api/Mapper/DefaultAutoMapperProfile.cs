using AutoMapper;
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

            CreateMap<RemoteLockAddParams, RemoteLock>();
            CreateMap<RemoteLock, RemoteLockDto>();
        }
    }
}
