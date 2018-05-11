using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PerfilCurricular.Models
{
    public partial class Proficiencia
    {
        public int id { get; set; }
        public string descricao { get; set; }
        public int porcentagem { get; set; }
        public int Curriculo { get; set; }
    }
}