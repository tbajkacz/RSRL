using RSRL.Api.Db.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RSRL.Api.Db.Services
{
    public interface IRepository<TEntity, TId> where TEntity : Entity<TId>
    {
        IEnumerable<TEntity> Get();

        TEntity GetByIdOrDefault(TId id);

        Task<TEntity> GetByIdAsync(TId id);

        Task<TEntity> GetByIdOrDefaultAsync(TId id);

        Task AddAsync(TEntity entity);

        Task UpdateAsync(TEntity entity);

        Task DeleteAsync(TId id);
    }
}
