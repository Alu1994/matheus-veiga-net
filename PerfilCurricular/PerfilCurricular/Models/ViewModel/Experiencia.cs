using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PerfilCurricular.Models
{
    public class Experiencia
    {
        public int id { get; set; }
        public string cargo { get; set; }
        public int anoInicio { get; set; }
        public Nullable<int> anoFim { get; set; }
        public string empresa { get; set; }
        public string localidadeEmpresa { get; set; }
        public string descricao { get; set; }
        public int Curriculo { get; set; }
    }
}