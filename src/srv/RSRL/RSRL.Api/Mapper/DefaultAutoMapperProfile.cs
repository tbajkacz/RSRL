using AutoMapper;
using RSRL.Api.Users.Dto;
using RSRL.Api.Users.Models;

namespace RSRL.Api.Mapper
{
    public class DefaultAutoMapperProfile : Profile
    {
        public DefaultAutoMapperProfile()
        {
            CreateMap<UserAccount, UserAccountDto>();
        }
    }
}
