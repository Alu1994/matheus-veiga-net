using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PerfilCurricular.Models
{
    public class Curriculo
    {
        [Display(Name = "Id")]
        public int id { get; set; }
        
        [Display(Name = "Nome Completo")]
        public string nomeCompleto { get; set; }

        [Display(Name = "E-mail")]
        public string email { get; set; }

        [Display(Name = "Profissão")]
        public string profissao { get; set; }

        [Display(Name = "Perfil Carreira")]
        public string perfilCarreira { get; set; }

        [Display(Name = "Linkedin")]
        public string linkedinDisplay { get; set; }

        [Display(Name = "Link Linkedin")]
        public string linkedin { get; set; }

        [Display(Name = "Intro Projeto")]
        public string introProjeto { get; set; }

        //[Display(Name = "Foto")]
        public string foto { get; set; }

        //[Display(Name = "Foto")]
        public byte[] fotoArray { get; set; }

        //[Display(Name = "Nome Foto")]
        public string nomeFoto { get; set; }

        public List<Experiencia> experiencia { get; set; }
        public List<Projeto> projeto { get; set; }
        public List<Proficiencia> proficiencia { get; set; }
        public List<Telefone> telefone { get; set; }
        public List<Formacao> formacao { get; set; }
        public List<Lingua> lingua { get; set; }
        public List<Interesse> interesse { get; set; }
    }
}