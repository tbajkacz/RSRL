using RSRL.Api.Db.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RSRL.Api.Db.Services
{
    public interface IDataSession<TEntity, TId> where TEntity : Entity<TId>
    {
        IEnumerable<TEntity> Get();

        Task<TEntity> GetByIdAsync(TId id);

        Task<TEntity> GetByIdOrDefaultAsync(TId id);

        Task UpdateAsync(TEntity entity);

        Task DeleteAsync(TId id);
    }
}
