using Microsoft.AspNetCore.Hosting;
using RSRL.Api.Utility;
using System;

namespace RSRL.Api.Extensions
{
    public static class WebHostBuilderExtensions
    {
        public static IWebHostBuilder TryUseKestrelWithProvidedIPv4Url(this IWebHostBuilder webBuilder, string[] args)
        {
            if (args.Length > 1 && args[0] == "--p")
            {
                return webBuilder.UseKestrel()
                    .UseUrls($"http://{NetUtils.GetLocalIPAddress()}:{args[1]}");
            }
            else if (args.Length > 1 && args[0] == "--u")
            {
                return webBuilder.UseKestrel()
                    .UseUrls($"http://{args[1]}");
            }
            return webBuilder;
        }
    }
}
