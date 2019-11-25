using System;
using System.Linq;
using System.Net;
using System.Net.Sockets;

namespace RSRL.Api.Utility
{
    public static class NetUtils
    {
        //TODO: temp implementation
        public static string GetLocalIPAddress()
        {
            return Dns.GetHostEntry(Dns.GetHostName())
                .AddressList
                .SingleOrDefault(ip => ip.AddressFamily == AddressFamily.InterNetwork && ip.ToString().Split(".")[3] != "1")
                ?.ToString();
        }
    }
}
