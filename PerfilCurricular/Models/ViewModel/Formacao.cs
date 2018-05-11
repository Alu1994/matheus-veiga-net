using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PerfilCurricular.Models
{
    public class Formacao
    {
        public int id { get; set; }
        public string curso { get; set; }
        public string instituicaoEnsino { get; set; }
        public int anoInicio { get; set; }
        public Nullable<int> anoFim { get; set; }
        public int Curriculo { get; set; }
        public Nullable<bool> graduacao { get; set; }
    }
}