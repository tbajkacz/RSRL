using System.Collections.Generic;

namespace RSRL.Api.Locks.Params
{
    public class RemoteLockAddParams
    {
        public string Name { get; set; }

        public string Url { get; set; }

        public IList<string> AllowedAccessCardIds { get; set; }
    }
}
