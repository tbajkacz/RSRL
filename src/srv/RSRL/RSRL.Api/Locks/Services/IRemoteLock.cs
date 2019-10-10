using System.Threading.Tasks;

namespace RSRL.Api.Locks.Services
{
    public interface IRemoteLock
    {
        Task UnlockAsync();

        Task ToggleBlockAsync(bool targetState);
    }
}
