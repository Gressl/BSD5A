using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lagerverwaltung
{
    class Kunde
    {
     
        public  int id;
        public String Name;
        public String Adresse;
        public String UID;
        public String Table="Kunde";

        public Kunde(int _id,string _name, string _adresse, string _uid)
        {
            id = _id;
            Name = _name;
            Adresse = _adresse;
            UID = _uid;
            
        }
       

        public override string ToString()
        {
            return id + " " + Name;
        }

    }
}
