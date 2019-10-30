using System;

namespace RSRL.Api.Audit.Params
{
    public class ReportMovementParams
    {
        public string LockSecretKey { get; set; }

        public DateTime EventDate { get; set; }
    }
}
