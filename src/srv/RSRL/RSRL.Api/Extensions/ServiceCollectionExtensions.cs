using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using Microsoft.Extensions.DependencyInjection;
using NHibernate.Tool.hbm2ddl;
using RSRL.Api.Db.Conventions;
using RSRL.Api.Db.Services;
using System.Data;

namespace RSRL.Api.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddNHibernateSessionFactory(this IServiceCollection services, string connectionString)
        {
            var fact = Fluently.Configure()
                .Database(SQLiteConfiguration.Standard.UsingFile(connectionString).IsolationLevel(IsolationLevel.ReadCommitted))
                .Mappings(x => x.FluentMappings.AddFromAssemblyOf<Program>().Conventions.Add<IncrementIdConvention>())
                .ExposeConfiguration(x =>
                    new SchemaUpdate(x).Execute(false, true))
                .BuildSessionFactory();
            return services.AddScoped<NHibernate.ISession>(p => fact.OpenSession())
                .AddScoped<IUnitOfWork, NHibernateUnitOfWork>();
        }
    }
}
