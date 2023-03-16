using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WindowsForms.BL
{
    class CLS_Client
    {
        private DbStockContext db = new DbStockContext();
        private Client client; // table client


        public bool AjouterClient(string Nom, string Prenom, string Adresse, string Telephone, string Email, string Ville, string Pays)
        {
            client = new Client();
            client.Nom_Client = Nom;
            client.Prenom_Client = Prenom;
            client.Adresse_Client = Adresse;
            client.Telephone_Client = Telephone;
            client.Email_Client = Email;
            client.Ville_Client = Ville;
            client.Pays_Client = Pays;

            // Vérifier si le nom et le prenom existe déjà
            if (db.Clients.SingleOrDefault(S => S.Nom_Client == Nom && S.Prenom_Client == Prenom) == null)
            {
                db.Clients.Add(client);
                db.SaveChanges();
                return true;

            }
            return false;

        }

        public void ModifierClient(int ID, string Nom, string Prenom, string Adresse, string Telephone, string Email, string Ville, string Pays)
        {
            client = new Client();
            // Vérifier si l'ID du client existe déjà
            client = db.Clients.SingleOrDefault(S => S.ID_Client == ID);

            if(client != null) // existe
            {
                client.Nom_Client = Nom;
                client.Prenom_Client = Prenom;
                client.Adresse_Client = Adresse;
                client.Telephone_Client = Telephone;
                client.Email_Client = Email;
                client.Ville_Client = Ville;
                client.Pays_Client = Pays;
                db.SaveChanges();

            }
        }

        public void SupprimerClient(int ID)
        {
            client = new Client();
            client = db.Clients.SingleOrDefault(S => S.ID_Client == ID);
            if(client != null)
            {
                db.Clients.Remove(client);
                db.SaveChanges();
            }
        }

    }
}
