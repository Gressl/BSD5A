using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lagerverwaltung
{
    class Kunde
    {
     
        public  int K_ID;
        public String Name;
        public String Adresse;
        public String UID;
        public String table="Kunde";

        public Kunde(int _K_ID,string _name, string _adresse, string _uid)
        {
            K_ID = _K_ID;
            Name = _name;
            Adresse = _adresse;
            UID = _uid;
            
        }

        public string JSONForUpdate()
        {
            string ret = "{";
            string update_data = "";

            update_data += "\"Name\":\"" + Name + "\",";
            update_data += "\"Adresse\":\"" + Adresse + "\",";
            update_data += "\"UID\":\"" + UID + "\"";

            ret += "\"table\":\"" + table +"\",";
            ret += "\"K_ID\":\"" + K_ID + "\",";
            ret += "\"update_data\":{"+update_data+"}";
            ret += "}";
            
            return ret;
        }
        public override string ToString()
        {
            return K_ID + " " + Name;
        }

    }
}
