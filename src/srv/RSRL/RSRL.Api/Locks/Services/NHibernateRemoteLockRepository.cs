using System.Linq;
using System.Threading.Tasks;
using NHibernate;
using NHibernate.Linq;
using RSRL.Api.Db.Services;
using RSRL.Api.Locks.Models;

namespace RSRL.Api.Locks.Services
{
    public class NHibernateRemoteLockRepository : NHibernateRepositoryBase<RemoteLock, int>, IRemoteLockRepository
    {
        public NHibernateRemoteLockRepository(ISession session)
            : base(session)
        {
        }

        public async Task<RemoteLock> GetBySecretKeyAsync(string key)
        {
            return await session.Query<RemoteLock>()
                .SingleAsync(l => l.SecretKey == key);
        }

        public async Task<bool> VerifyAccessCardAllowedAsync(string lockSecret, string cardId)
        {
            var remoteLock = await GetBySecretKeyAsync(lockSecret);
            return remoteLock.AllowedAccessCards.Any(c => c.Id == cardId);
        }
    }
}
