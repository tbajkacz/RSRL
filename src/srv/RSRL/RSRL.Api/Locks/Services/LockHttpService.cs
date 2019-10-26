﻿using RSRL.Api.Locks.Dto;
using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace RSRL.Api.Locks.Services
{
    public class LockHttpService : ILockHttpService, IDisposable
    {
        private readonly IRemoteLockRepository lockRepository;
        private readonly HttpClient httpClient;

        public LockHttpService(IRemoteLockRepository lockRepository)
        {
            this.lockRepository = lockRepository;
            httpClient = new HttpClient();
        }

        public async Task ToggleBlockAsync(int lockId, bool targetState)
        {
            var remoteLock = await lockRepository.GetByIdAsync(lockId);

            await httpClient.PostAsync(
                remoteLock.Url,
                new StringContent(JsonSerializer.Serialize(new ToggleBlockBody { TargetState = true })));
        }

        public async Task UnlockAsync(int lockId)
        {
            var remoteLock = await lockRepository.GetByIdAsync(lockId);

            await httpClient.PostAsync(remoteLock.Url, new StringContent(""));
        }

        public void Dispose()
        {
            if (httpClient != null)
            {
                httpClient.Dispose();
            }
        }

    }
}