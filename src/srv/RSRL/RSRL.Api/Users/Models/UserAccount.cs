using RSRL.Api.Db.Models;
using System.Collections.Generic;

namespace RSRL.Api.Users.Models
{
    public class UserAccount : Entity<int>
    {
        public virtual string Login { get; set; }

        public virtual string PasswordHash { get; set; }

        public virtual IList<string> Roles { get; set; } = new List<string>();
    }

    public class UserAccountMap : EntityMap<UserAccount, int>
    {
        public UserAccountMap()
        {
            Map(x => x.Login)
                .Not.Nullable()
                .Unique();
            Map(x => x.PasswordHash)
                .Not.Nullable();
            HasMany(x => x.Roles)
                .Table("Roles")
                .Element("Role");
        }
    }
}
