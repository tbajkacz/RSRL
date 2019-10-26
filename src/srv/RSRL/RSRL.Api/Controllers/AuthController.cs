using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RSRL.Api.Auth.Params;
using RSRL.Api.Extensions;
using RSRL.Api.Users.Dto;
using RSRL.Api.Users.Models;
using RSRL.Api.Users.Services;
using RSRL.Api.Utility;
using System.Net;
using System.Threading.Tasks;

namespace RSRL.Api.Controllers
{
    [ApiController]
    [DefaultRoute]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository userSession;
        private readonly IMapper mapper;

        public AuthController(IUserRepository userSession, IMapper mapper)
        {
            this.userSession = userSession;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task Authenticate(AuthParams param)
        {
            var user = await userSession.ValidateCredentialsAsync(param);
            if (user == null)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                return;
            }
            await HttpContext.SignInAsync(user, param.RememberMe);
        }

        [HttpGet]
        [Authorize]
        public async Task Deauthenticate()
        {
            await HttpContext.SignOutAsync();
        }

        [HttpGet]
        public async Task<UserAccountDto> GetCurrentUser()
        {
            if (!HttpContext.User.TryGetId(out int id) ||
                !(await userSession.GetByIdOrDefaultAsync(id) is UserAccount user))
            {
                return null;
            }
            return mapper.Map<UserAccount, UserAccountDto>(user);
        }
    }
}
