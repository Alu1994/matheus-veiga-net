using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PerfilCurricular.Controllers
{
    public class AjaxPagesController : Controller
    {
        //
        // GET: /AjaxPages/
        public string getOptionsNivel()
        {
            var optionlist = "<option value='' selected>Selecione</option>";
            using (var nivelContext = new perfilCurricularDAL.perfilCurricularContext())
            {
                var listaNiveis = nivelContext.nivel.ToList();

                foreach (var item in listaNiveis)
                {
                    optionlist += "<option value='" + item.id + "'>" + item.descricao + "</option>";
                }
            }

            return optionlist;
        }
	}
}