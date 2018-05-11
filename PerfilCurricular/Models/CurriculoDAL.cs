using PerfilCurricular.Tools;
using perfilCurricularDAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PerfilCurricular.Models
{
    public class CurriculoDAL
    {
        public ObjectReturn<Curriculo> getCurriculo(int? id)
        {
            var ret = new ObjectReturn<Curriculo> { Success = true };

            try
            {
                curriculo curriculoDB = null;
                using (var context = new perfilCurricularContext())
                {
                    if (id != null)
                        curriculoDB = context.curriculo.FirstOrDefault(where => where.id == id);
                    else
                        curriculoDB = context.curriculo.FirstOrDefault();

                    curriculoDB.experiencia = curriculoDB.experiencia.ToList();
                    curriculoDB.projeto = curriculoDB.projeto.ToList();
                    curriculoDB.proficiencia = curriculoDB.proficiencia.ToList();
                    curriculoDB.telefone = curriculoDB.telefone.ToList();
                    curriculoDB.formacao = curriculoDB.formacao.ToList();
                    curriculoDB.interesse = curriculoDB.interesse.ToList();
                    var linguasCurriculo = curriculoDB.lingua.ToList();

                    curriculoDB.lingua = linguasCurriculo.Join(context.nivel, lin => lin.Nivel, nvl => nvl.id, (lin, nvl) => new { ling = lin, nivl = nvl }).Select(res => new lingua
                    {
                        id = res.ling.id,
                        descricao = res.ling.descricao,
                        curriculo1 = res.ling.curriculo1,
                        Nivel = res.ling.Nivel,
                        nivel1 = res.nivl
                    }).ToList();

                    if (curriculoDB == null)
                    {
                        curriculoDB = new curriculo();
                    }
                }

                var curriculo = new PerfilCurricular.Models.Curriculo
                {
                    id = curriculoDB.id,
                    nomeCompleto = curriculoDB.nomeCompleto,
                    email = curriculoDB.email,
                    profissao = curriculoDB.profissao,
                    perfilCarreira = curriculoDB.perfilCarreira,
                    linkedinDisplay = curriculoDB.linkedinDisplay,
                    linkedin = curriculoDB.linkedin,
                    introProjeto = curriculoDB.introProjeto,
                    nomeFoto = curriculoDB.foto
                };

                curriculo.experiencia = getListExperiencia(curriculoDB.experiencia.ToList());

                curriculo.projeto = getListProjeto(curriculoDB.projeto.ToList());

                curriculo.proficiencia = getListProficiencia(curriculoDB.proficiencia.ToList());

                curriculo.telefone = getListTelefone(curriculoDB.telefone.ToList());

                curriculo.formacao = getListFormacao(curriculoDB.formacao.ToList());

                curriculo.lingua = getListLingua(curriculoDB.lingua.ToList());

                curriculo.interesse = getListInteresse(curriculoDB.interesse.ToList());
                ret.Result = curriculo;
            }
            catch (Exception ex)
            {
                ret.Ex = ex;
                ret.Message = ex.Message;
                ret.Success = false;
                ret.Result = new Curriculo();
            }
            return ret;
        }

        #region["GetLists"]

        private List<Experiencia> getListExperiencia(List<experiencia> listaDB)
        {
            var listaExperiencia = listaDB.Select(sel => new PerfilCurricular.Models.Experiencia
            {
                anoFim = sel.anoFim == null ? 9999 : sel.anoFim,
                id = sel.id,
                cargo = sel.cargo,
                anoInicio = sel.anoInicio,
                empresa = sel.empresa,
                localidadeEmpresa = sel.localidadeEmpresa,
                descricao = sel.descricao,
                Curriculo = sel.Curriculo
            }).ToList().OrderByDescending(x => x.anoInicio).ThenByDescending(x => x.anoFim).ToList().Select(sel => new PerfilCurricular.Models.Experiencia
            {
                anoFim = sel.anoFim == 9999 ? null : sel.anoFim,
                id = sel.id,
                cargo = sel.cargo,
                anoInicio = sel.anoInicio,
                empresa = sel.empresa,
                localidadeEmpresa = sel.localidadeEmpresa,
                descricao = sel.descricao,
                Curriculo = sel.Curriculo
            }).ToList();

            return listaExperiencia;
        }

        private List<Projeto> getListProjeto(List<projeto> listaDB)
        {
            var listaProjeto = listaDB.Select(sel => new PerfilCurricular.Models.Projeto
            {
                id = sel.id,
                nomeProjeto = sel.nomeProjeto,
                descricaoProjeto = sel.descricaoProjeto,
                Curriculo = sel.Curriculo
            }).ToList();

            return listaProjeto;
        }

        private List<Proficiencia> getListProficiencia(List<proficiencia> listaDB)
        {
            var listaProficiencia = listaDB.Select(sel => new PerfilCurricular.Models.Proficiencia
            {
                id = sel.id,
                descricao = sel.descricao,
                porcentagem = sel.porcentagem,
                Curriculo = sel.Curriculo
            }).ToList();

            return listaProficiencia;
        }

        private List<Telefone> getListTelefone(List<telefone> listaDB)
        {
            var listaTelefone = listaDB.Select(sel => new PerfilCurricular.Models.Telefone
            {
                id = sel.id,
                numero = sel.numero,
                ddd = sel.ddd,
                Curriculo = sel.Curriculo
            }).ToList();

            return listaTelefone;
        }

        private List<Formacao> getListFormacao(List<formacao> listaDB)
        {
            var listaFormacao = listaDB.Select(sel => new PerfilCurricular.Models.Formacao
            {
                anoFim = sel.anoFim == null ? 9999 : sel.anoFim,
                id = sel.id,
                curso = sel.curso,
                anoInicio = sel.anoInicio,
                instituicaoEnsino = sel.instituicaoEnsino,
                Curriculo = sel.Curriculo,
                graduacao = sel.graduacao
            }).ToList().OrderBy(x => x.anoInicio).ThenBy(x => x.anoFim).ToList().Select(sel => new PerfilCurricular.Models.Formacao
            {
                anoFim = sel.anoFim == 9999 ? null : sel.anoFim,
                id = sel.id,
                curso = sel.curso,
                anoInicio = sel.anoInicio,
                instituicaoEnsino = sel.instituicaoEnsino,
                Curriculo = sel.Curriculo,
                graduacao = sel.graduacao
            }).ToList();

            return listaFormacao;
        }

        private List<Lingua> getListLingua(List<lingua> listaDB)
        {
            listaDB = listaDB.ToList();

            var listaLingua = listaDB.Select(sel => new PerfilCurricular.Models.Lingua
            {
                id = sel.id,
                descricao = sel.descricao,
                nivel = new Nivel { id = sel.nivel1.id, descricao = sel.nivel1.descricao },
                Curriculo = sel.Curriculo
            }).OrderByDescending(ord => ord.nivel.id).ToList();

            return listaLingua;
        }

        private List<Interesse> getListInteresse(List<interesse> listaDB)
        {
            var listaInteresse = listaDB.Select(sel => new PerfilCurricular.Models.Interesse
            {
                id = sel.id,
                descricao = sel.descricao,
                Curriculo = sel.Curriculo
            }).ToList();

            return listaInteresse;
        }

        #endregion

        #region["Exclusão"]
        public ObjectReturn<bool> ExcluirInteresse(Interesse interes)
        {
            var ret = new ObjectReturn<bool> { Success = true };

            try
            {
                using (var context = new perfilCurricularContext())
                {
                    context.interesse.Remove(context.interesse.FirstOrDefault(i => i.Curriculo == interes.Curriculo && i.id == interes.id));
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                ret.Ex = ex;
                ret.Message = ex.Message;
                ret.Success = false;
            }
            return ret;
        }

        public ObjectReturn<bool> ExcluirProficiencia(Proficiencia profic)
        {
            var ret = new ObjectReturn<bool> { Success = true };

            try
            {
                using (var context = new perfilCurricularContext())
                {
                    context.proficiencia.Remove(context.proficiencia.FirstOrDefault(p => p.Curriculo == profic.Curriculo && p.id == profic.id));
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                ret.Ex = ex;
                ret.Message = ex.Message;
                ret.Success = false;
            }
            return ret;
        }

        public ObjectReturn<bool> ExcluirTelefone(Telefone telef)
        {
            var ret = new ObjectReturn<bool> { Success = true };

            try
            {
                using (var context = new perfilCurricularContext())
                {
                    context.telefone.Remove(context.telefone.FirstOrDefault(p => p.Curriculo == telef.Curriculo && p.id == telef.id));
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                ret.Ex = ex;
                ret.Message = ex.Message;
                ret.Success = false;
            }
            return ret;
        }

        public ObjectReturn<bool> ExcluirProjeto(Projeto proje)
        {
            var ret = new ObjectReturn<bool> { Success = true };

            try
            {
                using (var context = new perfilCurricularContext())
                {
                    context.projeto.Remove(context.projeto.FirstOrDefault(p => p.Curriculo == proje.Curriculo && p.id == proje.id));
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                ret.Ex = ex;
                ret.Message = ex.Message;
                ret.Success = false;
            }
            return ret;
        }

        public ObjectReturn<bool> ExcluirLingua(Lingua lingu)
        {
            var ret = new ObjectReturn<bool> { Success = true };

            try
            {
                using (var context = new perfilCurricularContext())
                {
                    context.lingua.Remove(context.lingua.FirstOrDefault(p => p.Curriculo == lingu.Curriculo && p.id == lingu.id));
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                ret.Ex = ex;
                ret.Message = ex.Message;
                ret.Success = false;
            }
            return ret;
        }

        public ObjectReturn<bool> ExcluirFormacao(Formacao forma)
        {
            var ret = new ObjectReturn<bool> { Success = true };

            try
            {
                using (var context = new perfilCurricularContext())
                {
                    context.formacao.Remove(context.formacao.FirstOrDefault(p => p.Curriculo == forma.Curriculo && p.id == forma.id));
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                ret.Ex = ex;
                ret.Message = ex.Message;
                ret.Success = false;
            }
            return ret;
        }

        public ObjectReturn<bool> ExcluirExperiencia(Experiencia exp)
        {
            var ret = new ObjectReturn<bool> { Success = true };

            try
            {
                using (var context = new perfilCurricularContext())
                {
                    context.experiencia.Remove(context.experiencia.FirstOrDefault(p => p.Curriculo == exp.Curriculo && p.id == exp.id));
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                ret.Ex = ex;
                ret.Message = ex.Message;
                ret.Success = false;
            }
            return ret;
        }
        #endregion

        public ObjectReturn<SelectList> ListaVersoes()
        {
            var ret = new ObjectReturn<SelectList> { Success = true };

            try
            {
                using (var db = new perfilCurricularContext())
                {
                    List<Nivel> listaVersoesNaoComandada = db.nivel.ToList().Select(selects => new Nivel
                    {
                        id = selects.id,
                        descricao = selects.descricao
                    }).ToList();

                    listaVersoesNaoComandada.Insert(0, new Nivel { id = 0, descricao = "Selecione" });

                    ret.Result = (new SelectList(listaVersoesNaoComandada, "id", "descricao"));
                }
            }
            catch (Exception ex)
            {
                var listaVersoesNaoComandada = new List<Nivel>();
                listaVersoesNaoComandada.Insert(0, new Nivel { id = 0, descricao = "Selecione" });

                ret.Ex = ex;
                ret.Message = ex.Message;
                ret.Success = false;
                ret.Result = (new SelectList(listaVersoesNaoComandada, "id", "descricao"));
            }
            return ret;
        }

        public ObjectReturn<Curriculo> Salvar(Curriculo cur, string path)
        {
            var ret = new ObjectReturn<Curriculo> { Success = true };

            try
            {
                using (var context = new perfilCurricularContext())
                {
                    curriculo curriculoDB = null;
                    curriculoDB = context.curriculo.FirstOrDefault(where => where.id == cur.id);

                    curriculoDB.nomeCompleto = cur.nomeCompleto;
                    curriculoDB.email = cur.email;
                    curriculoDB.profissao = cur.profissao;
                    curriculoDB.perfilCarreira = cur.perfilCarreira;
                    curriculoDB.linkedinDisplay = cur.linkedinDisplay;
                    curriculoDB.linkedin = cur.linkedin;
                    curriculoDB.introProjeto = cur.introProjeto;
                    if (!String.IsNullOrEmpty(cur.nomeFoto))
                    {
                        curriculoDB.foto = cur.nomeFoto;
                    }
                    
                    if (cur.interesse != null && cur.interesse.Count > 0)
                    {
                        var insercao = cur.interesse.Where(where => where.id == 0);
                        var alteracao = cur.interesse.Where(where => where.id > 0);
                        var ids = alteracao.Select(sel => sel.id).ToList();

                        var itemsInteresseDB = curriculoDB.interesse.Where(where => ids.Contains(where.id) && where.Curriculo == cur.id);
                        foreach (var item in alteracao)
                        {
                            var interesseDB = itemsInteresseDB.FirstOrDefault(where => where.id == item.id);
                            interesseDB.descricao = item.descricao;
                        }

                        foreach (var novoInteresse in insercao)
                        {
                            var novoInteresseDB = new interesse()
                            {
                                descricao = novoInteresse.descricao,
                                Curriculo = cur.id
                            };
                            context.interesse.Add(novoInteresseDB);
                        }
                    }


                    if (cur.proficiencia != null && cur.proficiencia.Count > 0)
                    {
                        var insercaoProficiencia = cur.proficiencia.Where(where => where.id == 0);
                        var alteracaoProficiencia = cur.proficiencia.Where(where => where.id > 0);
                        var idsProficiencia = alteracaoProficiencia.Select(sel => sel.id).ToList();

                        var itemsProficienciaDB = curriculoDB.proficiencia.Where(where => idsProficiencia.Contains(where.id) && where.Curriculo == cur.id);
                        foreach (var item in alteracaoProficiencia)
                        {
                            var ProficienciaDB = itemsProficienciaDB.FirstOrDefault(where => where.id == item.id);
                            if (ProficienciaDB != null)
                            {
                                ProficienciaDB.descricao = item.descricao;
                                ProficienciaDB.porcentagem = item.porcentagem;
                            }
                        }

                        foreach (var novaProficiencia in insercaoProficiencia)
                        {
                            var novaProficienciaDB = new proficiencia()
                            {
                                descricao = novaProficiencia.descricao,
                                porcentagem = novaProficiencia.porcentagem,
                                Curriculo = cur.id
                            };
                            context.proficiencia.Add(novaProficienciaDB);
                        }
                    }


                    if (cur.telefone != null && cur.telefone.Count > 0)
                    {
                        var insercaoTelefone = cur.telefone.Where(where => where.id == 0);
                        var alteracaoTelefone = cur.telefone.Where(where => where.id > 0);
                        var idsTelefone = alteracaoTelefone.Select(sel => sel.id).ToList();

                        var itemsTelefoneDB = curriculoDB.telefone.Where(where => idsTelefone.Contains(where.id) && where.Curriculo == cur.id);
                        foreach (var item in alteracaoTelefone)
                        {
                            var TelefoneDB = itemsTelefoneDB.FirstOrDefault(where => where.id == item.id);
                            if (TelefoneDB != null)
                            {
                                TelefoneDB.ddd = item.ddd;
                                TelefoneDB.numero = item.numero;
                            }
                        }

                        foreach (var novaTelefone in insercaoTelefone)
                        {
                            var novaTelefoneDB = new telefone()
                            {
                                ddd = novaTelefone.ddd,
                                numero = novaTelefone.numero,
                                Curriculo = cur.id
                            };
                            context.telefone.Add(novaTelefoneDB);
                        }
                    }


                    if (cur.projeto != null && cur.projeto.Count > 0)
                    {
                        var insercaoProjeto = cur.projeto.Where(where => where.id == 0);
                        var alteracaoProjeto = cur.projeto.Where(where => where.id > 0);
                        var idsProjeto = alteracaoProjeto.Select(sel => sel.id).ToList();

                        var itemsProjetoDB = curriculoDB.projeto.Where(where => idsProjeto.Contains(where.id) && where.Curriculo == cur.id);
                        foreach (var item in alteracaoProjeto)
                        {
                            var ProjetoDB = itemsProjetoDB.FirstOrDefault(where => where.id == item.id);
                            if (ProjetoDB != null)
                            {
                                ProjetoDB.nomeProjeto = item.nomeProjeto;
                                ProjetoDB.descricaoProjeto = item.descricaoProjeto;
                            }
                        }

                        foreach (var novaProjeto in insercaoProjeto)
                        {
                            var novaProjetoDB = new projeto()
                            {
                                nomeProjeto = novaProjeto.nomeProjeto,
                                descricaoProjeto = novaProjeto.descricaoProjeto,
                                Curriculo = cur.id
                            };
                            context.projeto.Add(novaProjetoDB);
                        }
                    }


                    if (cur.lingua != null && cur.lingua.Count > 0)
                    {
                        var insercaoLingua = cur.lingua.Where(where => where.id == 0);
                        var alteracaoLingua = cur.lingua.Where(where => where.id > 0);
                        var idsLingua = alteracaoLingua.Select(sel => sel.id).ToList();

                        var itemsLinguaDB = curriculoDB.lingua.Where(where => idsLingua.Contains(where.id) && where.Curriculo == cur.id);
                        foreach (var item in alteracaoLingua)
                        {
                            var LinguaDB = itemsLinguaDB.FirstOrDefault(where => where.id == item.id);
                            if (LinguaDB != null)
                            {
                                LinguaDB.descricao = item.descricao;
                                LinguaDB.Nivel = item.nivelId;
                            }
                        }

                        foreach (var novaLingua in insercaoLingua)
                        {
                            var novaLinguaDB = new lingua()
                            {
                                descricao = novaLingua.descricao,
                                Nivel = novaLingua.nivelId,
                                Curriculo = cur.id
                            };
                            context.lingua.Add(novaLinguaDB);
                        }
                    }


                    if (cur.formacao != null && cur.formacao.Count > 0)
                    {
                        var insercaoFormacao = cur.formacao.Where(where => where.id == 0);
                        var alteracaoFormacao = cur.formacao.Where(where => where.id > 0);
                        var idsFormacao = alteracaoFormacao.Select(sel => sel.id).ToList();

                        var itemsFormacaoDB = curriculoDB.formacao.Where(where => idsFormacao.Contains(where.id) && where.Curriculo == cur.id);
                        foreach (var item in alteracaoFormacao)
                        {
                            var FormacaoDB = itemsFormacaoDB.FirstOrDefault(where => where.id == item.id);
                            if (FormacaoDB != null)
                            {
                                FormacaoDB.curso = item.curso;
                                FormacaoDB.instituicaoEnsino = item.instituicaoEnsino;
                                FormacaoDB.anoInicio = item.anoInicio;
                                FormacaoDB.anoFim = item.anoFim;
                                FormacaoDB.graduacao = item.graduacao;
                            }
                        }

                        foreach (var novaFormacao in insercaoFormacao)
                        {
                            var novaFormacaoDB = new formacao()
                            {
                                curso = novaFormacao.curso,
                                instituicaoEnsino = novaFormacao.instituicaoEnsino,
                                anoInicio = novaFormacao.anoInicio,
                                anoFim = novaFormacao.anoFim,
                                graduacao = novaFormacao.graduacao,
                                Curriculo = cur.id
                            };
                            context.formacao.Add(novaFormacaoDB);
                        }
                    }


                    if (cur.experiencia != null && cur.experiencia.Count > 0)
                    {
                        var insercaoExperiencia = cur.experiencia.Where(where => where.id == 0);
                        var alteracaoExperiencia = cur.experiencia.Where(where => where.id > 0);
                        var idsExperiencia = alteracaoExperiencia.Select(sel => sel.id).ToList();

                        var itemsExperienciaDB = curriculoDB.experiencia.Where(where => idsExperiencia.Contains(where.id) && where.Curriculo == cur.id);
                        foreach (var item in alteracaoExperiencia)
                        {
                            var ExperienciaDB = itemsExperienciaDB.FirstOrDefault(where => where.id == item.id);
                            if (ExperienciaDB != null)
                            {
                                ExperienciaDB.cargo = item.cargo;
                                ExperienciaDB.empresa = item.empresa;
                                ExperienciaDB.anoInicio = item.anoInicio;
                                ExperienciaDB.anoFim = item.anoFim;
                                ExperienciaDB.localidadeEmpresa = item.localidadeEmpresa;
                                ExperienciaDB.descricao = item.descricao;
                            }
                        }

                        foreach (var novaExperiencia in insercaoExperiencia)
                        {
                            var novaExperienciaDB = new experiencia()
                            {
                                cargo = novaExperiencia.cargo,
                                empresa = novaExperiencia.empresa,
                                anoInicio = novaExperiencia.anoInicio,
                                anoFim = novaExperiencia.anoFim,
                                localidadeEmpresa = novaExperiencia.localidadeEmpresa,
                                descricao = novaExperiencia.descricao,
                                Curriculo = cur.id
                            };
                            context.experiencia.Add(novaExperienciaDB);
                        }
                    }
                    context.SaveChanges();
                    
                    if(!String.IsNullOrEmpty(cur.nomeFoto))
                    {
                        cur.fotoArray = Convert.FromBase64String(cur.foto);
                        System.IO.File.WriteAllBytes(path, cur.fotoArray);
                    }
                }
                ret.Result = cur;
            }
            catch (Exception ex)
            {
                ret.Ex = ex;
                ret.Message = ex.Message;
                ret.Success = false;
                ret.Result = cur;
            }

            return ret;
        }
    }
}