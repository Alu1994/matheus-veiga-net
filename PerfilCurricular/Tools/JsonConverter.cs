using System;
using System.Collections.Generic;
using System.Web.Script.Serialization;

namespace PerfilCurricular.Tools
{
    public static class JsonConvert<T> where T : class
    {
        public static string Serializer(T obj)
        {
            string objetoJSON = string.Empty;
            try
            {
                if (obj != null)
                {
                    objetoJSON = new JavaScriptSerializer().Serialize(obj);
                }
            }
            catch (Exception ex)
            {
            }
            return objetoJSON;
        }

        public static string Serializer(IList<T> obj)
        {
            string objetoJSON = string.Empty;
            try
            {
                if (obj != null)
                {
                    objetoJSON = new JavaScriptSerializer().Serialize(obj);
                }
            }
            catch (Exception ex)
            {
            }
            return objetoJSON;
        }

        public static IList<T> ListaDeserializer(string json = "[]")
        {
            if (json.Length > 0)
            {
                if (!(json.Substring(0, 1).Equals("[")))
                    json = string.Format("[{0}]", json);
            }

            IList<T> listaObjeto = null;
            try
            {
                listaObjeto = new JavaScriptSerializer().Deserialize<List<T>>(json);
            }
            catch (Exception ex)
            {
            }
            return listaObjeto;
        }
    }
}