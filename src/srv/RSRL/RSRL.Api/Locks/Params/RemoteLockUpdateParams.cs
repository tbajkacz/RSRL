using System.Collections;
using System.Collections.Generic;

namespace RSRL.Api.Locks.Params
{
    public class RemoteLockUpdateParams
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Url { get; set; }

        public IList<string> AllowedAccessCardIds { get; set; }
    }
}
