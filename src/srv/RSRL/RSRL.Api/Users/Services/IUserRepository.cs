using RSRL.Api.Auth.Params;
using RSRL.Api.Db.Services;
using RSRL.Api.Users.Models;
using RSRL.Api.Users.Params;
using System.Threading.Tasks;

namespace RSRL.Api.Users.Services
{
    public interface IUserRepository : IRepository<UserAccount, int>
    {
        Task<UserAccount> ValidateCredentialsAsync(AuthParams param);

        Task UpdatePasswordAsync(UserUpdatePasswordParams param);
    }
}
