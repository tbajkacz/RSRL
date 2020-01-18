using RSRL.Api.AccessCards.Models;
using RSRL.Api.Db.Models;
using System;
using System.Collections.Generic;

namespace RSRL.Api.Locks.Models
{
    public class RemoteLock : Entity<int>
    {
        public virtual string Name { get; set; }

        public virtual string Url { get; set; }

        public virtual string SecretKey { get; set; } = Guid.NewGuid().ToString();

        public virtual IList<AccessCard> AllowedAccessCards { get; set; } = new List<AccessCard>();
    }

    public class RemoteLockMap : EntityMap<RemoteLock, int>
    {
        public RemoteLockMap()
        {
            Map(x => x.Name)
                .Not.Nullable()
                .Unique();
            Map(x => x.Url)
                .Not.Nullable()
                .Unique();
            Map(x => x.SecretKey)
                .Not.Nullable()
                .Unique();
            HasManyToMany(x => x.AllowedAccessCards);
        }
    }
}
