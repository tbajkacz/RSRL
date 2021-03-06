﻿using RSRL.Api.Locks.Dto;
using System.Threading.Tasks;

namespace RSRL.Api.Locks.Services
{
    public interface ILockHttpService
    {
        Task ToggleBlockAsync(int lockId, bool targetState);

        Task UnlockAsync(int lockId);

        Task<IsBlockedDto> IsBlockedAsync(int lockId);
    }
}
