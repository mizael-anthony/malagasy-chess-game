using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WindowsForms.BL
{
    class CLS_Produit
    {
        private DbStockContext db = new DbStockContext();
        private Produit produit; // table produit


        public bool AjouterProduit(string NomProduit, int Quantite, string Prix, int IdCategorie)
        {
            produit = new Produit();
            produit.Nom_Produit = NomProduit;
            produit.Quantite_Produit = Quantite;
            produit.Prix_Produit = Prix;
            produit.ID_Categorie = IdCategorie;
            

            // Vérifier si le nom et le prenom existe déjà
            if (db.Produits.SingleOrDefault(S => S.Nom_Produit == NomProduit) == null)
            {
                db.Produits.Add(produit);
                db.SaveChanges();
                return true;

            }
            return false;

        }


        public void ModifierProduit(int ID, string NomProduit, int Quantite, string Prix, int IdCategorie)
        {
            produit = new Produit();
            // Vérifier si l'ID du produit existe déjà
            produit = db.Produits.SingleOrDefault(S => S.ID_Produit == ID);

            if (produit != null) // existe
            {
                produit.Nom_Produit = NomProduit;
                produit.Quantite_Produit = Quantite;
                produit.Prix_Produit = Prix;
                produit.ID_Categorie = IdCategorie;
                db.SaveChanges();

            }
        }

        public void SupprimerProduit(int ID)
        {
            produit = new Produit();
            produit = db.Produits.SingleOrDefault(S => S.ID_Produit == ID);
            if (produit != null)
            {
                db.Produits.Remove(produit);
                db.SaveChanges();
            }
        }

    }
}
