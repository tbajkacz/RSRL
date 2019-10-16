using NHibernate;
using RSRL.Api.Db.Models;
using RSRL.Api.Exceptions;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RSRL.Api.Db.Services
{
    public class NHibernateDataSessionBase<TEntity, TId> : IDataSession<TEntity, TId> where TEntity : Entity<TId>
    {
        private readonly ISession session;

        public NHibernateDataSessionBase(ISession session)
        {
            this.session = session;
        }

        public async Task DeleteAsync(TId id)
        {
            await session.DeleteAsync(await session.GetAsync<TEntity>(id));
        }

        public IEnumerable<TEntity> Get()
        {
            return session.Query<TEntity>();
        }

        public async Task<TEntity> GetByIdAsync(TId id)
        {
            return await session.GetAsync<TEntity>(id) ?? throw new EntityNotFoundException(typeof(TEntity), id);
        }

        public async Task<TEntity> GetByIdOrDefaultAsync(TId id)
        {
            return await session.GetAsync<TEntity>(id);
        }

        public async Task UpdateAsync(TEntity entity)
        {
            await session.UpdateAsync(entity);
        }
    }
}
