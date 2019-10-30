using System;

namespace RSRL.Api.Exceptions
{
    public class RemoteLockNotFoundException : Exception
    {
        public RemoteLockNotFoundException(string secretKey)
            : base($"Remote lock with secret key {secretKey} does not exist")
        {
        }
    }
}
