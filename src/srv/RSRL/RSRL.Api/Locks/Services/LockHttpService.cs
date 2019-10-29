using RSRL.Api.Locks.Dto;
using System;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace RSRL.Api.Locks.Services
{
    public sealed class LockHttpService : ILockHttpService, IDisposable
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

            using var content = new StringContent(
                JsonSerializer.Serialize(new ToggleBlockBody { TargetState = targetState }),
                Encoding.UTF8,
                "application/json");

            await httpClient.PostAsync(
                Path.Combine(remoteLock.Url, "toggleBlock"),
                content);
        }

        public async Task UnlockAsync(int lockId)
        {
            var remoteLock = await lockRepository.GetByIdAsync(lockId);

            await httpClient.PostAsync(
                Path.Combine(remoteLock.Url, "unlock"),
                null);
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
