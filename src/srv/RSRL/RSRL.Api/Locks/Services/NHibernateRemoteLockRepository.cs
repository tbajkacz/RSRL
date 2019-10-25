using NHibernate;
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
    }
}
