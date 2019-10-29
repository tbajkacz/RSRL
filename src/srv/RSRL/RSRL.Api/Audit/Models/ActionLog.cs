using RSRL.Api.Db.Models;
using RSRL.Api.Users.Models;
using System;

namespace RSRL.Api.Audit.Models
{
    public class ActionLog : Entity<int>
    {
        public virtual UserAccount Executor { get; set; }

        public virtual string Description { get; set; }

        public virtual string Type { get; set; }

        public virtual DateTime ExecutionDate { get; set; }
    }

    public class ActionLogMap : EntityMap<ActionLog, int>
    {
        public ActionLogMap()
        {
            References(x => x.Executor);
            Map(x => x.Description)
                .Not.Nullable();
            Map(x => x.Type)
                .Not.Nullable();
            Map(x => x.ExecutionDate);
        }
    }
}
