using RSRL.Api.Audit.Models;
using RSRL.Api.Locks.Params;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RSRL.Api.Audit.Services
{
    public interface IActionLogger
    {
        IEnumerable<ActionLog> GetLogs();

        Task AddActionLogAsync(string description, ActionType actionType, DateTime eventTime, int userId = default);

        Task AddActionLogAsync(string description, string actionType, DateTime eventTime, int userId = default);
    }
}
