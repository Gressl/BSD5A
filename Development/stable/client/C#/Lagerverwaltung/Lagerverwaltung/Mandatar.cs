using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lagerverwaltung
{
    class Mandatar
    {
      
        public String FirmenName;
        public String Adresse;
       
      

        public String table = "Mandatar";

        public Mandatar(string _name, string _adresse)
        {
            //M_ID = _M_ID;
            FirmenName = _name;
            Adresse = _adresse;
          
           

        }

        public string JSONForUpdate()
        {
            string ret = "{";
            string update_data = "";

            update_data += "\"FirmenName\":\"" + FirmenName + "\",";
            update_data += "\"Adresse\":\"" + Adresse + "\"";
          
            ret += "\"table\":\"" + table + "\",";
            ret += "\"update_data\":{" + update_data + "}";
            ret += "}";

            return ret;
        }
        public override string ToString()
        {
            return FirmenName;
        }

    }
}

