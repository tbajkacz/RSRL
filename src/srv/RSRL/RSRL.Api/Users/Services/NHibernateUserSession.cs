using System.Threading.Tasks;
using NHibernate;
using NHibernate.Linq;
using RSRL.Api.Auth.Params;
using RSRL.Api.Auth.Services;
using RSRL.Api.Db.Services;
using RSRL.Api.Users.Models;

namespace RSRL.Api.Users.Services
{
    public class NHibernateUserSession : NHibernateDataSessionBase<UserAccount, int>, IUserSession
    {
        private readonly IHashService hashService;

        public NHibernateUserSession(ISession session, IHashService hashService)
            : base(session)
        {
            this.hashService = hashService;
        }

        public async Task<UserAccount> ValidateCredentialsAsync(AuthParams param)
        {
            var user = await session.Query<UserAccount>()
                .SingleOrDefaultAsync(u => u.Login == param.Login);

            return user == null ? null : hashService.CompareHashes(param.Password, user.PasswordHash) ? user : null;
        }
    }
}
