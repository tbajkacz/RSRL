using NHibernate;
using RSRL.Api.AccessCards.Models;
using RSRL.Api.Db.Services;

namespace RSRL.Api.AccessCards.Services
{
    public class NHibernateAccessCardRepository : NHibernateRepositoryBase<AccessCard, string>, IAccessCardRepository
    {
        public NHibernateAccessCardRepository(ISession session)
            : base(session)
        {
        }
    }
}
