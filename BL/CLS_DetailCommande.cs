using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WindowsForms.BL
{
    public class CLS_DetailCommande
    {
        public static List<CLS_DetailCommande> ListeDetailCommande = new List<CLS_DetailCommande>();

        public int Id { get; set; }
        public string Nom { get; set; }
        public int Quantite { get; set; }
        public string Prix { get; set; }
        public string Remise { get; set; }
        public string Total { get; set; }
    }
}
