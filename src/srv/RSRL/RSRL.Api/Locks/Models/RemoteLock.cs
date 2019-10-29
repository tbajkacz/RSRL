using RSRL.Api.Db.Models;
using System;

namespace RSRL.Api.Locks.Models
{
    public class RemoteLock : Entity<int>
    {
        public virtual string Name { get; set; }

        public virtual string Url { get; set; }

        public virtual string SecretKey { get; set; } = Guid.NewGuid().ToString();
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
        }
    }
}
