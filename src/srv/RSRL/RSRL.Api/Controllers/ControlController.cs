using Microsoft.AspNetCore.Mvc;
using RSRL.Api.Locks.Params;
using RSRL.Api.Locks.Services;
using RSRL.Api.Utility;
using System.Threading.Tasks;

namespace RSRL.Api.Controllers
{
    [ApiController]
    [DefaultRoute]
    public class ControlController : ControllerBase
    {
        private readonly IRemoteLock remoteLock;

        public ControlController(IRemoteLock remoteLock)
        {
            this.remoteLock = remoteLock;
        }

        [HttpPost]
        public async Task ToggleBlock(ToggleBlockParams param)
        {
            await remoteLock.ToggleBlockAsync(param.TargetState);
        }

        [HttpPost]
        public async Task Unlock()
        {
            await remoteLock.UnlockAsync();
        }
    }
}
