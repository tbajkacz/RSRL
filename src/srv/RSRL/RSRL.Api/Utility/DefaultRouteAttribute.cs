using Microsoft.AspNetCore.Mvc;

namespace RSRL.Api.Utility
{
    public class DefaultRouteAttribute : RouteAttribute
    {
        public DefaultRouteAttribute()
            : base("api/[controller]/[action]")
        {
        }
    }
}
