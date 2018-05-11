using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PerfilCurricular.Models
{
    public class Lingua
    {
        public int id { get; set; }
        public string descricao { get; set; }
        public int nivelId { get; set; }
        public Nivel nivel { get; set; }
        public int Curriculo { get; set; }
    }
}