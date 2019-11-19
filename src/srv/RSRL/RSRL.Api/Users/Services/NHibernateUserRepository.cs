using System.Threading.Tasks;
using NHibernate;
using NHibernate.Linq;
using RSRL.Api.Auth.Params;
using RSRL.Api.Auth.Services;
using RSRL.Api.Db.Services;
using RSRL.Api.Users.Models;
using RSRL.Api.Users.Params;

namespace RSRL.Api.Users.Services
{
    public class NHibernateUserRepository : NHibernateRepositoryBase<UserAccount, int>, IUserRepository
    {
        private readonly IHashService hashService;

        public NHibernateUserRepository(ISession session, IHashService hashService)
            : base(session)
        {
            this.hashService = hashService;
        }

        public async Task UpdatePasswordAsync(UserUpdatePasswordParams param)
        {
            var user = await GetByIdAsync(param.Id);
            user.PasswordHash = hashService.Hash(param.Password);
            await UpdateAsync(user);
        }

        public async Task<UserAccount> ValidateCredentialsAsync(AuthParams param)
        {
            var user = await session.Query<UserAccount>()
                .SingleOrDefaultAsync(u => u.Login == param.Login);

            return user == null ? null : hashService.CompareHashes(param.Password, user.PasswordHash) ? user : null;
        }
    }
}
