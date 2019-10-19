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
        private readonly IUserSession userSession;
        private readonly IMapper mapper;

        public AuthController(IUserSession userSession, IMapper mapper)
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
        [Authorize]
        public async Task<UserAccountDto> GetCurrentUser()
        {
            return mapper.Map<UserAccount, UserAccountDto>(await userSession.GetByIdAsync(HttpContext.User.GetId()));
        }
    }
}
