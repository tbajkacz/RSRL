using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RSRL.Api.Auth.Constants;
using RSRL.Api.Auth.Services;
using RSRL.Api.Db.Services;
using RSRL.Api.Users.Models;
using RSRL.Api.Users.Services;
using System.Collections.Generic;
using System.Linq;

namespace RSRL.Api.Extensions
{
    public static class HostExtensions
    {
        public static IHost AddRootUser(this IHost host)
        {
            using var scope = host.Services.CreateScope();
            var userSession = scope.ServiceProvider.GetRequiredService<IUserRepository>();
            var uow = scope.ServiceProvider.GetRequiredService<IUnitOfWork>();
            var hashService = scope.ServiceProvider.GetRequiredService<IHashService>();
            if (userSession.Get().Count() == 0)
            {
                userSession.AddAsync(new UserAccount
                {
                    Name = "root",
                    Surname = "root",
                    Pesel = new Pesel("70033065471"),
                    Login = "root",
                    PasswordHash = hashService.Hash("root"),
                    Roles = new List<string> { Roles.Admin },
                });
                uow.CommitAsync();
            }
            return host;
        }
    }
}
