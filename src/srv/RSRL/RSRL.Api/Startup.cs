using AutoMapper;
using AutoWrapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using RSRL.Api.Audit.Services;
using RSRL.Api.Auth.Services;
using RSRL.Api.Extensions;
using RSRL.Api.Locks.Services;
using RSRL.Api.Mapper;
using RSRL.Api.Options;
using System.Reflection;

namespace RSRL.Api
{
    public class Startup
    {
        private readonly IWebHostEnvironment env;

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            this.env = env;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<HashOptions>(Configuration.GetSection("Hash"));

            services.AddControllers();

            services.AddNHibernateSessionFactory(Configuration.GetConnectionString("Db"));

            services.AddSingleton<IHashService, HashService>();

            services.AddTransient<ILockHttpService, LockHttpService>();

            services.AddNHibernateRepositories();

            services.AddCookieAuthentication(env.IsDevelopment() ? CookieSecurePolicy.None : CookieSecurePolicy.Always);
            services.AddAuthorizationWithPolicies();

            services.AddAutoMapper(cfg => cfg.AddProfile<DefaultAutoMapperProfile>(), Assembly.GetAssembly(typeof(Startup)));

            services.AddTransient<IActionLogger, NHibernateActionLogger>();

            services.AddSwaggerGen(cfg =>
            {
                cfg.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "RSRL",
                    Version = "1.0",
                });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "Api");
            });

            app.UseSwagger();

            app.UseApiResponseAndExceptionWrapper(new AutoWrapperOptions
            {
                IsDebug = env.IsDevelopment(),
                ShowStatusCode = true
            });

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
