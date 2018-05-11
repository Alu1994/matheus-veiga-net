using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(PerfilCurricular.Startup))]
namespace PerfilCurricular
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
