using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RSRL.Api.Audit.Models;
using RSRL.Api.Audit.Services;
using RSRL.Api.Db.Services;
using RSRL.Api.Extensions;
using RSRL.Api.Locks.Dto;
using RSRL.Api.Locks.Models;
using RSRL.Api.Locks.Params;
using RSRL.Api.Locks.Services;
using RSRL.Api.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSRL.Api.Controllers
{
    [ApiController]
    [DefaultRoute]
    public class LocksController : ControllerBase
    {
        private readonly ILockHttpService lockHttpService;
        private readonly IRemoteLockRepository lockRepository;
        private readonly IMapper mapper;
        private readonly IUnitOfWork uow;
        private readonly IActionLogger actionLogger;

        public LocksController(ILockHttpService lockHttpService, IRemoteLockRepository lockRepository,
                               IMapper mapper, IUnitOfWork uow, IActionLogger actionLogger)
        {
            this.lockHttpService = lockHttpService;
            this.lockRepository = lockRepository;
            this.mapper = mapper;
            this.uow = uow;
            this.actionLogger = actionLogger;
        }

        [HttpGet]
        public IEnumerable<RemoteLockDto> GetLocks()
        {
            return lockRepository.Get()
                .Select(l => mapper.Map<RemoteLock, RemoteLockDto>(l));
        }

        [HttpPost]
        public async Task Add(RemoteLockAddParams param)
        {
            var remoteLock = mapper.Map<RemoteLockAddParams, RemoteLock>(param);
            await lockRepository.AddAsync(remoteLock);
            await uow.CommitAsync();
        }

        [HttpPost]
        public async Task Update(RemoteLockUpdateParams param)
        {
            var remoteLock = mapper.Map<RemoteLockUpdateParams, RemoteLock>(param);
            await lockRepository.UpdateAsync(remoteLock);
            await uow.CommitAsync();
        }

        [HttpPost]
        public async Task Unlock(UnlockParams param)
        {
            var remoteLock = await lockRepository.GetByIdAsync(param.LockId);
            await lockHttpService.UnlockAsync(param.LockId);
            await actionLogger.AddActionLogAsync(
                $"Lock \"{remoteLock.Name}\" was unlocked",
                ActionType.LockRemoteUnlock,
                DateTime.Now,
                HttpContext.User.GetId());
            await uow.CommitAsync();
        }

        [HttpPost]
        public async Task ToggleBlock(ToggleBlockParams param)
        {
            var remoteLock = await lockRepository.GetByIdAsync(param.LockId);
            await lockHttpService.ToggleBlockAsync(param.LockId, param.TargetState);
            await actionLogger.AddActionLogAsync(
                $"Lock \"{remoteLock.Name}\" was {(param.TargetState ? "blocked" : "unblocked")}",
                ActionType.LockRemoteToggleBlock,
                DateTime.Now,
                HttpContext.User.GetId());
            await uow.CommitAsync();
        }

        [HttpGet]
        public async Task<VerifyAccessCardAllowedDto> VerifyAccessCardAllowed([FromQuery]VerifyAccessCardAllowedParams param)
        {
            return new VerifyAccessCardAllowedDto
            {
                HasAccess = await lockRepository.VerifyAccessCardAllowedAsync(param.LockSecretKey, param.AccessCardId)
            };
        }
    }
}
