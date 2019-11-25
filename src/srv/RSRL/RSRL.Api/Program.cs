using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using RSRL.Api.Extensions;

namespace RSRL.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
              CreateHostBuilder(args)
                .Build()
                .AddRootUser()
                .Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.TryUseKestrelWithProvidedIPv4Url(args)
                        .UseStartup<Startup>();
                });
    }
}
