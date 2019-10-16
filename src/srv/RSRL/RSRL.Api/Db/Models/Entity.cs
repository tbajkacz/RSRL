using FluentNHibernate.Mapping;

namespace RSRL.Api.Db.Models
{
    public class Entity<TId>
    {
        public virtual TId Id { get; set; }
    }

    public class EntityMap<TId> : ClassMap<Entity<TId>>
    {
        public EntityMap()
        {
            Id(x => x.Id);
        }
    }
}
