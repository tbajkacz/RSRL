using RSRL.Api.Db.Services;
using RSRL.Api.Locks.Models;

namespace RSRL.Api.Locks.Services
{
    public interface IRemoteLockRepository : IRepository<RemoteLock, int>
    {
    }
}
