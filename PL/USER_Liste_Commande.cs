using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsForms.PL
{
    public partial class USER_Liste_Commande : UserControl
    {
        private static USER_Liste_Commande UserCommande;
        private DbStockContext db;
        public static USER_Liste_Commande Instance
        {
            get
            {
                if (UserCommande == null)
                {
                    UserCommande = new USER_Liste_Commande();
                }
                return UserCommande;
            }
        }
        public USER_Liste_Commande()
        {
            InitializeComponent();
            db = new DbStockContext();
        }

        public void remplirdatacommande()
        {
            // Mila mi reconnecte am bdd foana au cas ou nisy changement
            db = new DbStockContext();
            datacommande.Rows.Clear();
            Client client = new Client();
            string NomPrenom = "";
            foreach(var commande in db.Commandes)
            {
                client = db.Clients.Single(S => S.ID_Client == commande.ID_Client);
                NomPrenom = $"{client.Nom_Client}  {client.Prenom_Client}";
                datacommande.Rows.Add(
                    commande.ID_Commande,
                    commande.Date_Commande,
                    NomPrenom,
                    commande.Total_HT,
                    commande.TVA,
                    commande.Total_TTC,
                    commande.Etat
                    );
            }
        }

        private void btnajouter_Click(object sender, EventArgs e)
        {
            FRM_Detail_Commande DetailCommande = new FRM_Detail_Commande(this);
            DetailCommande.ShowDialog();
        }

        private void USER_Liste_Commande_Load(object sender, EventArgs e)
        {
            remplirdatacommande();
        }

        private void btnrecherche_Click(object sender, EventArgs e)
        {
            // Recherche entre deux Date
            var listecommande = db.Commandes.ToList();
            if(datacommande.Rows.Count != 0)
            {
                listecommande = listecommande.Where(
                    S => S.Date_Commande.Date >= datedebut.Value && S.Date_Commande.Date <= datefin.Value).ToList();
                
                datacommande.Rows.Clear();
                Client client = new Client();
                string NomPrenom = "";
                foreach (var commande in listecommande)
                {
                    client = db.Clients.Single(S => S.ID_Client == commande.ID_Client);
                    NomPrenom = $"{client.Nom_Client}  {client.Prenom_Client}";
                    datacommande.Rows.Add(
                        commande.ID_Commande,
                        commande.Date_Commande,
                        NomPrenom,
                        commande.Total_HT,
                        commande.TVA,
                        commande.Total_TTC
                       );
                }
            }

        }

        private void btnactualiser_Click(object sender, EventArgs e)
        {
            remplirdatacommande();
        }



        private void txtrecherche_Enter(object sender, EventArgs e)
        {
            if (txtrecherche.Text == "Recherche")
            {
                txtrecherche.Text = "";
                txtrecherche.ForeColor = Color.Black;
            }

        }

        private void txtrecherche_TextChanged(object sender, EventArgs e)
        {
            db = new DbStockContext();
            var listerecherche = db.Commandes.ToList();
            if (txtrecherche.Text != "") // Pas vide
            {
                listerecherche = listerecherche.Where(
                            S => (S.Client.Nom_Client + S.Client.Prenom_Client).IndexOf(txtrecherche.Text, StringComparison.CurrentCultureIgnoreCase) != -1).ToList();

            }

            datacommande.Rows.Clear();
            Client client = new Client();
            string NomPrenom = "";
            foreach (var recherche in listerecherche)
            {
                client = db.Clients.Single(S => S.ID_Client == recherche.ID_Client);
                NomPrenom = $"{client.Nom_Client}  {client.Prenom_Client}";
                datacommande.Rows.Add(
                    recherche.ID_Commande,
                    recherche.Date_Commande,
                    NomPrenom,
                    recherche.Total_HT,
                    recherche.TVA,
                    recherche.Total_TTC,
                    recherche.Etat
                   );
            }



        }

        private void datacommande_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
            FRM_Detail_Commande ModifierDetailCommande = new FRM_Detail_Commande(this);
            Commande commande = new Commande();
            
            if(datacommande.Columns[e.ColumnIndex].Name == "Modifier")
            {
                // Mettre invisible les objets inutiles
                ModifierDetailCommande.btnclient.Visible = false;
                ModifierDetailCommande.supprimermenu.Visible = false;



                int IdCommande = int.Parse(datacommande.CurrentRow.Cells[0].Value.ToString());
                commande = db.Commandes.Single(S => S.ID_Commande == IdCommande);
                ModifierDetailCommande.IDCommande = IdCommande;

                // Information du Client
                ModifierDetailCommande.txtnom.Text = commande.Client.Nom_Client;
                ModifierDetailCommande.txtprenom.Text = commande.Client.Prenom_Client;
                ModifierDetailCommande.txttelephone.Text = commande.Client.Telephone_Client;
                ModifierDetailCommande.txtemail.Text = commande.Client.Email_Client;
                ModifierDetailCommande.txtpays.Text = commande.Client.Pays_Client;
                ModifierDetailCommande.txtville.Text = commande.Client.Ville_Client;
                


                // Datagrid detailcommande
                ModifierDetailCommande.labeltitre.Text = "Modifier Commande";
                ModifierDetailCommande.datedetailcommande.Text = datacommande.CurrentRow.Cells[1].Value.ToString();
                ModifierDetailCommande.txttva.Text = datacommande.CurrentRow.Cells[4].Value.ToString();
                ModifierDetailCommande.txtttc.Text = datacommande.CurrentRow.Cells[5].Value.ToString();
                ModifierDetailCommande.comboetat.Text = datacommande.CurrentRow.Cells[6].Value.ToString();
                // Tsy maintsy atao aty am farany manjary lasa 0
                ModifierDetailCommande.txtht.Text = datacommande.CurrentRow.Cells[3].Value.ToString();


                var detailscommande = db.Details_Commande.Where(S => S.ID_Commande == commande.ID_Commande).ToList();
                foreach(var details in detailscommande)
                {
                    ModifierDetailCommande.datadetailcommande.Rows.Add(
                        details.ID_Produit,
                        details.Nom_Produit,
                        details.Quantite,
                        details.Prix,
                        details.Remise,
                        details.Total
                        );
                    // Ajout dans la liste amzay afaka fafana na ovaina na ampina
                    BL.CLS_DetailCommande.ListeDetailCommande.Add(
                        new BL.CLS_DetailCommande
                        {
                            Id = details.ID_Produit,
                            Nom = details.Nom_Produit,
                            Quantite = details.Quantite,
                            Prix = details.Prix,
                            Remise = details.Remise,
                            Total = details.Total
                        }
                    );
                }


                ModifierDetailCommande.ShowDialog();
            }

        }
    }
}
