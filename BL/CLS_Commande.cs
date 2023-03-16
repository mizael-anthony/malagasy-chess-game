using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WindowsForms.BL
{
    class CLS_Commande
    {
        private DbStockContext db = new DbStockContext();
        private Commande commande;
        private Details_Commande detailcommande;
        private static int IDCommande;

        public void Ajouter_Commande(DateTime DateCommande, int IdClient, string TotalHT, string TVA, string TotalTTC, string Etat)
        {
            commande = new Commande();
            commande.Date_Commande = DateCommande;
            commande.ID_Client = IdClient;
            commande.Total_HT = TotalHT;
            commande.TVA = TVA;
            commande.Total_TTC = TotalTTC;
            commande.Etat = Etat;
            db.Commandes.Add(commande);
            db.SaveChanges();
            IDCommande = commande.ID_Commande;
        }

        public void Ajouter_Detail_Commande(int IdProduit, string NomProduit, int Quantite, string Prix, string Remise, string Total )
        {
            detailcommande = new Details_Commande();
            detailcommande.ID_Commande = IDCommande;
            detailcommande.ID_Produit = IdProduit;
            detailcommande.Nom_Produit = NomProduit;
            detailcommande.Quantite = Quantite;
            detailcommande.Prix = Prix;
            detailcommande.Remise = Remise;
            detailcommande.Total = Total;
            db.Details_Commande.Add(detailcommande);
            db.SaveChanges();

        }

        public void Modifier_Commande(int IdCommande, DateTime DateCommande, string TotalHT, string TVA, string TotalTTC, string Etat)
        {
            commande = new Commande();
            commande = db.Commandes.SingleOrDefault(S => S.ID_Commande == IdCommande);
            if(commande != null)
            {
                commande.Date_Commande = DateCommande;
                commande.Total_HT = TotalHT;
                commande.TVA = TVA;
                commande.Total_TTC = TotalTTC;
                commande.Etat = Etat;
                db.SaveChanges();
                IDCommande = commande.ID_Commande;
            }

        }

        public void Modifier_Detail_Commande(int IdProduit, string NomProduit, int Quantite, string Prix, string Remise, string Total)
        {
            detailcommande = new Details_Commande();
            var liste = db.Details_Commande.Where(S => S.ID_Commande == CLS_Commande.IDCommande).ToList();
            
            if(liste.Count != 0)
            {
                foreach(var l in liste)
                {
                    l.ID_Produit = IdProduit;
                    l.Nom_Produit = NomProduit;
                    l.Quantite = Quantite;
                    l.Prix = Prix;
                    l.Remise = Remise;
                    l.Total = Total;
                    db.SaveChanges();
                }

            }
        }
    }
}
