using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WindowsForms.BL
{
    class CLS_Connexion
    {
        // Vérifier la connexion
        public bool ConnexionValide(DbStockContext db, string Nom, string MotDePasse)
        {
            Utilisateur utilisateur = new Utilisateur();
            utilisateur.ID_Utilisateur = Nom;
            utilisateur.MotDePasse_Utilisateur = MotDePasse;

            // Si le Nom et MotDePasse existe dans la base donnée
            if(db.Utilisateurs.SingleOrDefault(S=>S.ID_Utilisateur == Nom && S.MotDePasse_Utilisateur == MotDePasse) != null)
            {
                return true;

            }else
            {
                return false;
            }
        }
    }
}
