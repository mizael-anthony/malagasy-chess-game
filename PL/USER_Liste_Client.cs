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
    public partial class USER_Liste_Client : UserControl
    {
        private static USER_Liste_Client UserClient;
        private DbStockContext db;
        public static USER_Liste_Client Instance
        {
            get
            {
                if(UserClient == null)
                {
                    UserClient = new USER_Liste_Client();
                }
                return UserClient;
            }
        }
        public USER_Liste_Client()
        {
            InitializeComponent();
            db = new DbStockContext();
            // Désactiver textbox de recherche
            txtrecherche.Enabled = false;

        }

        private void txtrecherche_Enter(object sender, EventArgs e)
        {
            if (txtrecherche.Text == "Recherche")
            {
                txtrecherche.Text = "";
                txtrecherche.ForeColor = Color.Black;
            }
        }
        // Actualiser datagrid Client
        // créer interface actualiserdatagrid
        public void actualiserdatagrid()
        {
            db = new DbStockContext();
            dataclient.Rows.Clear();
            foreach(var client in db.Clients)
            {
                dataclient.Rows.Add(
                    false,
                    client.ID_Client,
                    client.Nom_Client,
                    client.Prenom_Client,
                    client.Adresse_Client,
                    client.Telephone_Client,
                    client.Email_Client,
                    client.Ville_Client,
                    client.Pays_Client
                    );
            }

        }

        public int ligneselect()
        {
            int nombreligneselect = 0;
            for (int i = 0; i < dataclient.Rows.Count; i++)
            {
                if ((bool)dataclient.Rows[i].Cells[0].Value == true)
                {
                    nombreligneselect++;
                }
            }

            return nombreligneselect;
        }

        public string verifierligneselectmodifier()
        {
            
            if(ligneselect() == 0)
            {
                return "Selectionner le Client que vous voulez modifier";
            }
            if(ligneselect() > 1)
            {
                return "Selectionner Seulement 1 seul Client à modifier";
            }
            return "OK";
        }

        public string verifierligneselectsupprimer()
        {
            if (ligneselect() == 0)
            {
                return "Selectionner le Client que vous voulez supprimer";
            }

            return "OK";
        }

        private void USER_Liste_Client_Load(object sender, EventArgs e)
        {
            // Ajouter des lignes
            actualiserdatagrid();

        }

        private void btnajouter_Click(object sender, EventArgs e)
        {
            // Afficher formulaire ajout client
            FRM_Ajouter_Modifier_Client AjouterClient = new FRM_Ajouter_Modifier_Client(this);
            AjouterClient.ShowDialog();
        }


        
        private void btnmodifier_Click(object sender, EventArgs e)
        {
            FRM_Ajouter_Modifier_Client ModifierClient = new FRM_Ajouter_Modifier_Client(this);

            if(verifierligneselectmodifier() == "OK")
            {
                for(int i = 0; i < dataclient.Rows.Count; i++)
                {
                    if((bool)dataclient.Rows[i].Cells[0].Value == true)
                    {
                        ModifierClient.IDSelect = (int)dataclient.Rows[i].Cells[1].Value;
                        ModifierClient.txtnomclient.Text = dataclient.Rows[i].Cells[2].Value.ToString();
                        ModifierClient.txtprenomclient.Text = dataclient.Rows[i].Cells[3].Value.ToString();
                        ModifierClient.txtadresseclient.Text = dataclient.Rows[i].Cells[4].Value.ToString();
                        ModifierClient.txttelephoneclient.Text = dataclient.Rows[i].Cells[5].Value.ToString();
                        ModifierClient.txtemailclient.Text = dataclient.Rows[i].Cells[6].Value.ToString();
                        ModifierClient.txtvilleclient.Text = dataclient.Rows[i].Cells[7].Value.ToString();
                        ModifierClient.txtpaysclient.Text = dataclient.Rows[i].Cells[8].Value.ToString();
                    }
                }

                ModifierClient.labeltitre.Text = "Modifier Client";
                ModifierClient.btnactualiser.Visible = false;
                ModifierClient.ShowDialog();
            }
            else
            {
                MessageBox.Show(verifierligneselectmodifier(), "Modification", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void btnsupprimer_Click(object sender, EventArgs e)
        {
            BL.CLS_Client client = new BL.CLS_Client();
            
            if(verifierligneselectsupprimer() == "OK")
            {
                DialogResult choix = MessageBox.Show("Voulez-vous vraimment supprimer", "Suppression", MessageBoxButtons.YesNo, MessageBoxIcon.Question);
                if(choix == DialogResult.Yes)
                {
                    for (int i = 0; i < dataclient.Rows.Count; i++)
                    {
                        int idclient = int.Parse(dataclient.Rows[i].Cells[1].Value.ToString());
                        string nomprenom = dataclient.Rows[i].Cells[2].Value.ToString() + " " + dataclient.Rows[i].Cells[3].Value.ToString();
                        var commandes = db.Commandes.Where(S => S.ID_Client == idclient).ToList();
                        if ((bool)dataclient.Rows[i].Cells[0].Value == true)
                        {
                            if(commandes.Count == 0)
                            {
                                MessageBox.Show($"Client {nomprenom} supprimé avec succès", "Suppression", MessageBoxButtons.OK, MessageBoxIcon.Asterisk);
                                client.SupprimerClient(idclient);
                            }
                            else
                            {
                                MessageBox.Show($"Client {nomprenom} a commandé et ne peut être supprimé", "Suppression", MessageBoxButtons.OK, MessageBoxIcon.Error);

                            }
                        }
                    }
                    actualiserdatagrid();
                }
                else
                {
                    MessageBox.Show("Suppression annulée", "Suppression", MessageBoxButtons.OK, MessageBoxIcon.Warning);

                }
            }
            else
            {
                MessageBox.Show(verifierligneselectsupprimer(), "Suppression", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }

        }

        private void comborecherche_SelectedIndexChanged(object sender, EventArgs e)
        {
            // Activer textbox recherche
            txtrecherche.Enabled = true;
            txtrecherche.Text = "";
        }

        private void txtrecherche_TextChanged(object sender, EventArgs e)
        {
            db = new DbStockContext();
            List<Client> listerecherche = db.Clients.ToList();
            if(txtrecherche.Text != "") // Pas vide
            {
                switch (comborecherche.Text)
                {
                    case "Nom":
                        listerecherche = listerecherche.Where(
                            S => S.Nom_Client.IndexOf(txtrecherche.Text, StringComparison.CurrentCultureIgnoreCase) != -1).ToList();
                        break;
                    case "Prénom":
                        listerecherche = listerecherche.Where(
                            S => S.Prenom_Client.IndexOf(txtrecherche.Text, StringComparison.CurrentCultureIgnoreCase) != -1).ToList();
                        break;

                    case "Téléphone":
                        listerecherche = listerecherche.Where(
                            S => S.Telephone_Client.IndexOf(txtrecherche.Text, StringComparison.CurrentCultureIgnoreCase) != -1).ToList();
                        break;

                    case "Ville":
                        listerecherche = listerecherche.Where(
                            S => S.Ville_Client.IndexOf(txtrecherche.Text, StringComparison.CurrentCultureIgnoreCase) != -1).ToList();
                        break;

                    case "Pays":
                        listerecherche = listerecherche.Where(
                            S => S.Pays_Client.IndexOf(txtrecherche.Text, StringComparison.CurrentCultureIgnoreCase) != -1).ToList();
                        break;

                }

            }

            // Ajout dans datagrid
            // créer classe mitokana gestion data
            dataclient.Rows.Clear();
            foreach(Client recherche in listerecherche)
            {
                dataclient.Rows.Add(
                    false,
                    recherche.ID_Client,
                    recherche.Nom_Client,
                    recherche.Prenom_Client,
                    recherche.Adresse_Client,
                    recherche.Telephone_Client,
                    recherche.Email_Client,
                    recherche.Ville_Client,
                    recherche.Pays_Client
                    );
            }
        }
    }
}
