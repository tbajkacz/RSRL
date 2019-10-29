using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RSRL.Api.Audit.Dto;
using RSRL.Api.Audit.Models;
using RSRL.Api.Audit.Services;
using RSRL.Api.Utility;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RSRL.Api.Controllers
{
    [ApiController]
    [DefaultRoute]
    public class AuditController : ControllerBase
    {
        private readonly IActionLogger actionLogger;
        private readonly IMapper mapper;

        public AuditController(IActionLogger actionLogger, IMapper mapper)
        {
            this.actionLogger = actionLogger;
            this.mapper = mapper;
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
    }
}
