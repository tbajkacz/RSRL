using FluentNHibernate.Conventions;
using FluentNHibernate.Conventions.Instances;
using System;

namespace RSRL.Api.Db.Conventions
{
    public class IncrementIdConvention : IIdConvention
    {
        public void Apply(IIdentityInstance instance)
        {
            if (!instance.Type.Name.Contains("string", StringComparison.InvariantCultureIgnoreCase))
            {
                instance.GeneratedBy.Increment();
            }
        }
    }
}
