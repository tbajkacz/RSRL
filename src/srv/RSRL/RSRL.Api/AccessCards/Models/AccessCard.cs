using RSRL.Api.Db.Models;
using RSRL.Api.Users.Models;

namespace RSRL.Api.AccessCards.Models
{
    public class AccessCard : Entity<string>
    {
        public virtual UserAccount Owner { get; set; }
    }

    public class AccessCardMap : EntityMap<AccessCard, string>
    {
        public AccessCardMap()
        {
            Id(x => x.Id)
                .GeneratedBy.Assigned();
            References(x => x.Owner);
        }
    }
}
