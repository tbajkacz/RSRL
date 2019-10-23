using RSRL.Api.Auth.Params;
using RSRL.Api.Db.Services;
using RSRL.Api.Users.Models;
using System.Threading.Tasks;

namespace RSRL.Api.Users.Services
{
    public interface IUserRepository : IRepository<UserAccount, int>
    {
        Task<UserAccount> ValidateCredentialsAsync(AuthParams param);
    }
}
