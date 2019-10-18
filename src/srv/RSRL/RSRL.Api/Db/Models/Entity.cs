﻿using FluentNHibernate.Mapping;

namespace RSRL.Api.Db.Models
{
    public class Entity<TId>
    {
        public virtual TId Id { get; set; }
    }

    public class EntityMap<TEntity, TId> : ClassMap<TEntity> where TEntity : Entity<TId>
    {
        public EntityMap()
        {
            Id(x => x.Id);
        }
    }
}
