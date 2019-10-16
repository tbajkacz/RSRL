using System;
using System.Threading.Tasks;

namespace RSRL.Api.Db.Services
{
    public interface IUnitOfWork : IDisposable
    {
        Task CommitAsync();

        Task RollbackAsync();
    }
}
