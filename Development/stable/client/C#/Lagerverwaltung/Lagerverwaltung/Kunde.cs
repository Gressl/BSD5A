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



        public override string ToString()
        {
            return K_ID + " " + Name;
        }

    }
}
