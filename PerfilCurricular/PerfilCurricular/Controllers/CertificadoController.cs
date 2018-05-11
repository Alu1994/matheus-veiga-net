using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PerfilCurricular.Controllers
{
    public class CertificadoController : Controller
    {
        //
        // GET: /Certificado/
        public ActionResult Index()
        {
            if (!Request.IsAuthenticated)
                return Redirect("/Account/Login");
            return View();
        }
	}
}