using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PerfilCurricular.Models
{
    public class Projeto
    {
        public int id { get; set; }
        public string nomeProjeto { get; set; }
        public string descricaoProjeto { get; set; }
        public int Curriculo { get; set; }
    }
}