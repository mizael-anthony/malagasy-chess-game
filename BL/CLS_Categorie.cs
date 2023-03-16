using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WindowsForms.BL
{
    class CLS_Categorie
    {
        private DbStockContext db = new DbStockContext();
        private Categorie categorie; // table categorie


        public bool AjouterCategorie(string NomCategorie)
        {
            categorie = new Categorie();
            categorie.Nom_Categorie = NomCategorie;

            // Vérifier si le nom et le prenom existe déjà
            if (db.Categories.SingleOrDefault(S => S.Nom_Categorie == NomCategorie) == null)
            {
                db.Categories.Add(categorie);
                db.SaveChanges();
                return true;

            }
            return false;

        }

        public void ModifierCategorie(int ID, string NomCategorie)
        {
            categorie = new Categorie();
            // Vérifier si l'ID du categorie existe déjà
            categorie = db.Categories.SingleOrDefault(S => S.ID_Categorie == ID);

            if (categorie != null) // existe
            {
                categorie.Nom_Categorie = NomCategorie;
                db.SaveChanges();

            }
        }

        public void SupprimerProduit(int ID)
        {
            categorie = new Categorie();
            categorie = db.Categories.SingleOrDefault(S => S.ID_Categorie == ID);
            if (categorie != null)
            {
                db.Categories.Remove(categorie);
                db.SaveChanges();
            }
        }
    }
}
