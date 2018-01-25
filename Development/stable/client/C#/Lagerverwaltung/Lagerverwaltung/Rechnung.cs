using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lagerverwaltung
{
    class Rechnung
    {
        public int Rechnungsnummer;
        public bool Bezahlt;
   

        public Rechnung(int _id, bool _status)
        {
            Rechnungsnummer = _id;
            Bezahlt = _status;
            
        }

        public override string ToString()
        {
            return Rechnungsnummer + " " + Bezahlt;
        }

    }
}
