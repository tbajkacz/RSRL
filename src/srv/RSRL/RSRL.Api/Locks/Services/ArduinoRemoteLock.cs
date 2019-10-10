using System.Threading.Tasks;

namespace RSRL.Api.Locks.Services
{
    public class ArduinoRemoteLock : IRemoteLock
    {
        public async Task ToggleBlockAsync(bool targetState)
        {
            await Task.CompletedTask;
        }

        public async Task UnlockAsync()
        {
            await Task.CompletedTask;
        }
    }
}
