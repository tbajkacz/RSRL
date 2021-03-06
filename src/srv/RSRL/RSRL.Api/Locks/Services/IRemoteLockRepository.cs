﻿using RSRL.Api.Db.Services;
using RSRL.Api.Locks.Models;
using System.Threading.Tasks;

namespace RSRL.Api.Locks.Services
{
    public interface IRemoteLockRepository : IRepository<RemoteLock, int>
    {
        public Task<RemoteLock> GetBySecretKeyAsync(string key);

        public Task<bool> VerifyAccessCardAllowedAsync(string lockSecret, string cardId);
    }
}
