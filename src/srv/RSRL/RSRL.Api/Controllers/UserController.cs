using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RSRL.Api.Auth.Constants;
using RSRL.Api.Db.Services;
using RSRL.Api.Users.Dto;
using RSRL.Api.Users.Models;
using RSRL.Api.Users.Params;
using RSRL.Api.Users.Services;
using RSRL.Api.Utility;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSRL.Api.Controllers
{
    [ApiController]
    [DefaultRoute]
    [Authorize(Policy = Policies.Admin)]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository userSession;
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public UserController(IUserRepository userSession, IUnitOfWork uow, IMapper mapper)
        {
            this.userSession = userSession;
            this.uow = uow;
            this.mapper = mapper;
        }

        [HttpGet]
        public IEnumerable<UserAccountDto> GetUsers()
        {
            return userSession.Get()
                .Select(u => mapper.Map<UserAccount, UserAccountDto>(u));
        }

        [HttpPost]
        public async Task Add(UserAccountAddParams param)
        {
            var user = mapper.Map<UserAccountAddParams, UserAccount>(param);

            await userSession.AddAsync(user);
            await uow.CommitAsync();
        }

        [HttpPost]
        public async Task Update(UserAccountUpdateParams param)
        {
            var user = mapper.Map<UserAccountUpdateParams, UserAccount>(param);

            await userSession.UpdateAsync(user);
            await uow.CommitAsync();
        }
        
        [HttpGet]
        public IEnumerable<string> AvailableRoles()
        {
            return Roles.RolesCollection;
        }
    }
}
