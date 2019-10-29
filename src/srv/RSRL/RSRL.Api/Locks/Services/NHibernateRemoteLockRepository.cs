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

        public async Task<RemoteLock> GetBySecretKeyOrDefaultAsync(string key)
        {
            return await session.Query<RemoteLock>()
                .SingleOrDefaultAsync(l => l.SecretKey == key);
        }
    }
}
