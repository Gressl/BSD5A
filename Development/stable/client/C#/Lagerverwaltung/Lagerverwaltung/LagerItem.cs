using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lagerverwaltung
{
    class LagerItem
    {
        public int id;
        public String Name;
        public int Preis;
        public int Menge;
        public String table = "LagerItem";

        public LagerItem(int _id, string _name, int _preis, int _menge)
        {
            id = _id;
            Name = _name;
            Preis = _preis;
            Menge = _menge;
        }

        public override string ToString()
        {
            return id + " " + Name +" " + Preis + " "+ Menge;
        }

    }
}
