using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RSRL.Api.Audit.Dto;
using RSRL.Api.Audit.Models;
using RSRL.Api.Audit.Params;
using RSRL.Api.Audit.Services;
using RSRL.Api.Db.Services;
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
    public class AuditController : ControllerBase
    {
        private readonly IActionLogger actionLogger;
        private readonly IMapper mapper;
        private readonly IRemoteLockRepository lockRepository;
        private readonly IUnitOfWork uow;

        public AuditController(IActionLogger actionLogger, IMapper mapper,
                               IRemoteLockRepository lockRepository, IUnitOfWork uow)
        {
            this.actionLogger = actionLogger;
            this.mapper = mapper;
            this.lockRepository = lockRepository;
            this.uow = uow;
        }

        [HttpGet]
        public IEnumerable<ActionLogDto> GetLogs()
        {
            return actionLogger.GetLogs()
                .Select(l => mapper.Map<ActionLog, ActionLogDto>(l));
        }

        [HttpGet]
        public ActionTypesDto GetActionTypes()
        {
            var staticTypes = Enum.GetNames(typeof(ActionType));
            var dynamicTypes = actionLogger.GetLogs().Select(l => l.Type);

            return new ActionTypesDto { ActionTypes = dynamicTypes.Concat(staticTypes).Distinct() };
        }

        [HttpPost]
        public async Task ReportUnlock(ReportUnlockParams param)
        {
            var remoteLock = await lockRepository.GetBySecretKeyAsync(param.LockSecretKey);
            await actionLogger.AddActionLogAsync(
                $"Lock \"{remoteLock.Name}\" was unlocked by access card {param.AccessCardId}",
                ActionType.LockAccessCardUnlock,
                param.EventDate);
            await uow.CommitAsync();
        }

        [HttpPost]
        public async Task ReportAccessDenied(ReportAccessDeniedParams param)
        {
            var remoteLock = await lockRepository.GetBySecretKeyAsync(param.LockSecretKey);
            await actionLogger.AddActionLogAsync(
                $"Lock \"{remoteLock.Name}\" has denied unlocking for access card {param.AccessCardId}",
                ActionType.LockAccessCardDenied,
                param.EventDate);
            await uow.CommitAsync();
        }

        [HttpPost]
        public async Task ReportMovement(ReportMovementParams param)
        {
            var remoteLock = await lockRepository.GetBySecretKeyAsync(param.LockSecretKey);
            await actionLogger.AddActionLogAsync(
                $"Lock \"{remoteLock.Name}\" has detected movement",
                ActionType.LockMovement,
                param.EventDate);
            await uow.CommitAsync();
        }
    }
}
