using System;

namespace RSRL.Api.Exceptions
{
    public class InvalidPeselException : Exception
    {
        public InvalidPeselException(string message)
            : base(message)
        {
        }
    }
}
