using Microsoft.AspNetCore.Mvc;
using RSRL.Api.Utility;
using System.Net;

namespace RSRL.Api.Controllers
{
    [ApiController]
    [DefaultRoute]
    public class HealthcheckController : ControllerBase
    {
        [HttpGet]
        public void Heartbeat()
        {
            HttpContext.Response.StatusCode = (int)HttpStatusCode.OK;
        }
    }
}
