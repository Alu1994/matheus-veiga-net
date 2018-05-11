using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using PerfilCurricular.Models;
using PerfilCurricular.Tools;
using perfilCurricularDAL;

namespace PerfilCurricular.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            if (!Request.IsAuthenticated)
                return Redirect("/Account/Login");

            ViewBag.CanEdit = Alterar();
            var ret = getController(null);
            return View(ret.Result);
        }

        [Authorize(Roles = "Admin")]
        public ActionResult Editar(int id)
        {
            if (!Request.IsAuthenticated)
                return Redirect("/Account/Login");

            var curriculo = new PerfilCurricular.Models.CurriculoDAL();
            var listaVersao = curriculo.ListaVersoes();
            ViewBag.NiveisDisponiveis = listaVersao.Result;

            var ret = getController(id);
            return View(ret.Result);
        }

        public ActionResult MainPartial()
        {
            if (!Request.IsAuthenticated)
                return Redirect("/Account/Login");

            return RedirectToAction("Index");
        }

        public ActionResult SidebarPartial()
        {
            if (!Request.IsAuthenticated)
                return Redirect("/Account/Login");

            return RedirectToAction("Index");
        }

        [HttpPost]
        public JsonResult AlterarCurriculo(List<string> ObjetoJson)
        {
            var cur = JsonConvert<Curriculo>.ListaDeserializer(ObjetoJson[0]);
            var saveCurriculo = new PerfilCurricular.Models.CurriculoDAL();

            var retSave = saveCurriculo.Salvar(cur[0], Server.MapPath(string.Format("/images/{0}", cur[0].nomeFoto)));
            return Json(retSave.Success);
        }

        #region["Exclusão"]
        [HttpPost]
        public bool ExcluirInteresse(Interesse inter)
        {
            var curriculoDados = new PerfilCurricular.Models.CurriculoDAL();
            var retExcluir = curriculoDados.ExcluirInteresse(inter);
            return retExcluir.Success;
        }

        [HttpPost]
        public bool ExcluirProficiencia(Proficiencia profic)
        {
            var curriculoDados = new PerfilCurricular.Models.CurriculoDAL();
            var retExcluir = curriculoDados.ExcluirProficiencia(profic);
            return retExcluir.Success;
        }

        [HttpPost]
        public bool ExcluirTelefone(Telefone telef)
        {
            var curriculoDados = new PerfilCurricular.Models.CurriculoDAL();
            var retExcluir = curriculoDados.ExcluirTelefone(telef);
            return retExcluir.Success;
        }

        [HttpPost]
        public bool ExcluirProjeto(Projeto proje)
        {
            var curriculoDados = new PerfilCurricular.Models.CurriculoDAL();
            var retExcluir = curriculoDados.ExcluirProjeto(proje);
            return retExcluir.Success;
        }

        [HttpPost]
        public bool ExcluirLingua(Lingua lingu)
        {
            var curriculoDados = new PerfilCurricular.Models.CurriculoDAL();
            var retExcluir = curriculoDados.ExcluirLingua(lingu);
            return retExcluir.Success;
        }

        [HttpPost]
        public bool ExcluirFormacao(Formacao forma)
        {
            var curriculoDados = new PerfilCurricular.Models.CurriculoDAL();
            var retExcluir = curriculoDados.ExcluirFormacao(forma);
            return retExcluir.Success;
        }

        [HttpPost]
        public bool ExcluirExperiencia(Experiencia exp)
        {
            var curriculoDados = new PerfilCurricular.Models.CurriculoDAL();
            var retExcluir = curriculoDados.ExcluirExperiencia(exp);
            return retExcluir.Success;
        }
        #endregion

        public bool Alterar()
        {
            HttpCookie authCookie = Request.Cookies[FormsAuthentication.FormsCookieName];
            FormsAuthenticationTicket authTicket;
            try
            {
                authTicket = FormsAuthentication.Decrypt(authCookie.Value);
                string[] roles = authTicket.UserData.Split(';');
                return (roles.ToList().Where(contem => contem.ToUpper() == "ADMIN").Count() > 0);
            }
            catch
            {
                return false;
            }
        }

        private ObjectReturn<Curriculo> getController(int? id)
        {
            var getCurriculo = new PerfilCurricular.Models.CurriculoDAL();
            var retCur = getCurriculo.getCurriculo(id);
            return retCur;
        }
    }
}