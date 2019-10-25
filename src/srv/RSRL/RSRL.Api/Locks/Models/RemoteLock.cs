using RSRL.Api.Db.Models;

namespace RSRL.Api.Locks.Models
{
    public class RemoteLock : Entity<int>
    {
        public virtual string Url { get; set; }
    }

    public class RemoteLockMap : EntityMap<RemoteLock, int>
    {
        public RemoteLockMap()
        {
            Map(x => x.Url)
                .Not.Nullable()
                .Unique();
        }
    }
}
