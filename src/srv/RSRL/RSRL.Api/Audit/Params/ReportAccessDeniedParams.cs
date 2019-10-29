using System;

namespace RSRL.Api.Audit.Params
{
    public class ReportAccessDeniedParams
    {
        public string LockSecretKey { get; set; }

        public string AccessCardId { get; set; }

        public DateTime EventDate { get; set; }
    }
}
