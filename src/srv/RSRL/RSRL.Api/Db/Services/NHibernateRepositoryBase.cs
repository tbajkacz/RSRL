using NHibernate;
using NHibernate.Criterion;
using RSRL.Api.Db.Models;
using RSRL.Api.Exceptions;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RSRL.Api.Db.Services
{
    public class NHibernateRepositoryBase<TEntity, TId> : IRepository<TEntity, TId> 
        where TEntity : Entity<TId>
    {
        protected readonly ISession session;

        public NHibernateRepositoryBase(ISession session)
        {
            this.session = session;
        }

        public virtual async Task AddAsync(TEntity entity)
        {
            await session.SaveAsync(entity);
        }

        public virtual async Task DeleteAsync(TId id)
        {
            await session.DeleteAsync(await session.GetAsync<TEntity>(id));
        }

        public virtual IEnumerable<TEntity> Get()
        {
            return session.Query<TEntity>();
        }

        public virtual TEntity GetById(TId id)
        {
            return session.Get<TEntity>(id) ?? throw new EntityNotFoundException(typeof(TEntity), id);
        }

        public virtual async Task<TEntity> GetByIdAsync(TId id)
        {
            return await session.GetAsync<TEntity>(id) ?? throw new EntityNotFoundException(typeof(TEntity), id);
        }

        public virtual TEntity GetByIdOrDefault(TId id)
        {
            return session.Get<TEntity>(id);
        }

        public virtual async Task<TEntity> GetByIdOrDefaultAsync(TId id)
        {
            return await session.GetAsync<TEntity>(id);
        }

        public virtual async Task UpdateAsync(TEntity entity)
        {
            if (!EntityExists(entity.Id))
            {
                throw new EntityNotFoundException(typeof(TEntity), entity.Id);
            }
            await session.MergeAsync(entity);
        }

        protected virtual bool EntityExists(TId id)
        {
            return session.CreateCriteria<TEntity>()
                .Add(Restrictions.Eq("id", id))
                .SetProjection(Projections.Count("id"))
                .UniqueResult<int>() > 0;
        }
    }
}
