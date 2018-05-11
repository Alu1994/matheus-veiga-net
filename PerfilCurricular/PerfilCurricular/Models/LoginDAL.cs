using perfilCurricularDAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PerfilCurricular.Models
{
    public class LoginDAL
    {
        public LoginViewModel IsValidUser(LoginViewModel login)
        {
            try
            {
                using (var context = new perfilCurricularContext())
                {
                    var loginId = context.login.FirstOrDefault(where => where.usuario == login.UserName && where.senha == login.Password);
                    if (context.login.Where(where => where.usuario == login.UserName && where.senha == login.Password).Count() > 0)
                    {
                        login.isValid = true;
                        login.Id = loginId.id;
                        login.Alteracao = loginId.alteracao;
                    }                        
                }
            }
            catch(Exception ex)
            {

            }

            return login;
        }
    }
}