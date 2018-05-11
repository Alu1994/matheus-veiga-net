using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PerfilCurricular.Models;
using PerfilCurricular.Tools;
using perfilCurricularDAL;

namespace PerfilCurricular.Controllers
{
    public class GridController : Controller
    {
        //
        // GET: /Grid/
        public ActionResult Index()
        {
            var listaCurriculo = new List<Models.Curriculo>();
            using (var objDB = new perfilCurricularContext())
            {
                listaCurriculo = objDB.curriculo.ToList().Select(sel => new Models.Curriculo
                {
                    id = sel.id,
                    nomeCompleto = sel.nomeCompleto,
                    email = sel.email,
                    profissao = sel.profissao,
                    introProjeto = sel.introProjeto,
                    linkedinDisplay = sel.linkedinDisplay,
                    linkedin = sel.linkedin,
                    perfilCarreira = sel.perfilCarreira
                }).ToList();
            }

            listaCurriculo.Add(listaCurriculo[0]);
            listaCurriculo.Add(listaCurriculo[0]);
            listaCurriculo.Add(listaCurriculo[0]);
            listaCurriculo.Add(listaCurriculo[0]);
            listaCurriculo.Add(listaCurriculo[0]);
            listaCurriculo.Add(listaCurriculo[0]);
            listaCurriculo.Add(listaCurriculo[0]);
            listaCurriculo.Add(listaCurriculo[0]);
            listaCurriculo.Add(listaCurriculo[0]);

            return View(listaCurriculo);
        }

        public string GetJsonCurriculo()
        {
            var listaCurriculo = new List<Models.Curriculo>();
            using (var objDB = new perfilCurricularContext())
            {
                listaCurriculo = objDB.curriculo.ToList().Select(sel => new Models.Curriculo
                {
                    id = sel.id,
                    nomeCompleto = "JSON - " + sel.nomeCompleto,
                    email = sel.email,
                    profissao = sel.profissao,
                    introProjeto = sel.introProjeto,
                    linkedinDisplay = sel.linkedinDisplay,
                    linkedin = sel.linkedin,
                    perfilCarreira = sel.perfilCarreira
                }).ToList();
            }

            listaCurriculo.Add(listaCurriculo[0]);
            listaCurriculo.Add(listaCurriculo[0]);
            listaCurriculo.Add(listaCurriculo[0]);
            listaCurriculo.Add(listaCurriculo[0]);
            listaCurriculo.Add(listaCurriculo[0]);
            listaCurriculo.Add(listaCurriculo[0]);
            listaCurriculo.Add(listaCurriculo[0]);
            listaCurriculo.Add(listaCurriculo[0]);
            listaCurriculo.Add(listaCurriculo[0]);

            string json = JsonConvert<List<Curriculo>>.Serializer(listaCurriculo);

            return json;
        }
	}
}