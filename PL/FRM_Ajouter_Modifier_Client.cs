using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Net.Mail;

namespace WindowsForms.PL
{
    public partial class FRM_Ajouter_Modifier_Client : Form
    {
        private UserControl UserClient;
        public FRM_Ajouter_Modifier_Client(UserControl UserClient)
        {
            InitializeComponent();
            this.UserClient = UserClient;
        }

        public int IDSelect;


        private void btnquitter_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void txtnomclient_Enter(object sender, EventArgs e)
        {
            if (txtnomclient.Text == "Nom")
            {
                txtnomclient.Text = "";
                txtnomclient.ForeColor = Color.WhiteSmoke;
            }
        }

        private void txtnomclient_Leave(object sender, EventArgs e)
        {
            if (txtnomclient.Text == "")
            {
                txtnomclient.Text = "Nom";
                txtnomclient.ForeColor = Color.Silver;
            }
        }

        private void txtprenomclient_Enter(object sender, EventArgs e)
        {
            if (txtprenomclient.Text == "Prénom")
            {
                txtprenomclient.Text = "";
                txtprenomclient.ForeColor = Color.WhiteSmoke;
            }
        }

        private void txtprenomclient_Leave(object sender, EventArgs e)
        {
            if (txtprenomclient.Text == "")
            {
                txtprenomclient.Text = "Prénom";
                txtprenomclient.ForeColor = Color.Silver;
            }
        }

        private void txttelephoneclient_Enter(object sender, EventArgs e)
        {
            if (txttelephoneclient.Text == "Téléphone")
            {
                txttelephoneclient.Text = "";
                txttelephoneclient.ForeColor = Color.WhiteSmoke;
            }
        }

        private void txttelephoneclient_Leave(object sender, EventArgs e)
        {
            if (txttelephoneclient.Text == "")
            {
                txttelephoneclient.Text = "Téléphone";
                txttelephoneclient.ForeColor = Color.Silver;
            }
        }

        private void txtemailclient_Enter(object sender, EventArgs e)
        {
            if (txtemailclient.Text == "Email")
            {
                txtemailclient.Text = "";
                txtemailclient.ForeColor = Color.WhiteSmoke;
            }
        }

        private void txtemailclient_Leave(object sender, EventArgs e)
        {
            if (txtemailclient.Text == "")
            {
                txtemailclient.Text = "Email";
                txtemailclient.ForeColor = Color.Silver;
            }
        }

        private void txtvilleclient_Enter(object sender, EventArgs e)
        {
            if (txtvilleclient.Text == "Ville")
            {
                txtvilleclient.Text = "";
                txtvilleclient.ForeColor = Color.WhiteSmoke;
            }
        }

        private void txtvilleclient_Leave(object sender, EventArgs e)
        {
            if (txtvilleclient.Text == "")
            {
                txtvilleclient.Text = "Ville";
                txtvilleclient.ForeColor = Color.Silver;
            }
        }

        private void txtpaysclient_Enter(object sender, EventArgs e)
        {
            if (txtpaysclient.Text == "Pays")
            {
                txtpaysclient.Text = "";
                txtpaysclient.ForeColor = Color.WhiteSmoke;
            }
        }

        private void txtpaysclient_Leave(object sender, EventArgs e)
        {
            if (txtpaysclient.Text == "")
            {
                txtpaysclient.Text = "Pays";
                txtpaysclient.ForeColor = Color.Silver;
            }
        }

        private void txtadresseclient_Enter(object sender, EventArgs e)
        {
            if (txtadresseclient.Text == "Adresse")
            {
                txtadresseclient.Text = "";
                txtadresseclient.ForeColor = Color.WhiteSmoke;
            }
        }

        private void txtadresseclient_Leave(object sender, EventArgs e)
        {
            if (txtadresseclient.Text == "")
            {
                txtadresseclient.Text = "Adresse";
                txtadresseclient.ForeColor = Color.Silver;
            }
        }

        private void txttelephoneclient_KeyPress(object sender, KeyPressEventArgs e)
        {
            if(e.KeyChar < 48 || e.KeyChar > 57)
            {
                e.Handled = true;
            }
            if (e.KeyChar == 8)
            {
                e.Handled = false;
            }

        }

        string testobligatoire()
        {
            if (txtnomclient.Text == "" || txtnomclient.Text == "Nom")
            {
                return "Entrer le Nom du Client";
            }
            if (txtprenomclient.Text == "" || txtprenomclient.Text == "Prénom")
            {
                return "Entrer le Prénom du Client";
            }
            if (txttelephoneclient.Text == "" || txttelephoneclient.Text == "Téléphone")
            {
                return "Entrer le Numéro Téléphone du Client";
            }
            if (txtemailclient.Text == "" || txtemailclient.Text == "Email")
            {
                return "Entrer l'Adresse Email du Client";
            }
            if (txtvilleclient.Text == "" || txtvilleclient.Text == "Ville")
            {
                return "Entrer la Ville du Client";
            }
            if (txtpaysclient.Text == "" || txtpaysclient.Text == "Pays")
            {
                return "Entrer le Pays du Client";
            }
            if (txtadresseclient.Text == "" || txtadresseclient.Text == "Adresse")
            {
                return "Entrer l'Adresse du Client";
            }

            // Vérifier email valide
            if(txtemailclient.Text != "" || txtemailclient.Text != "Email")
            {
                try
                {
                    new MailAddress(txtemailclient.Text);

                }catch(Exception e)
                {
                    return "Email invalide";
                }

            }

            return "OK";
        }

        private void btnenregistrer_Click(object sender, EventArgs e)
        {
            if(testobligatoire() == "OK")
            {
                BL.CLS_Client Client = new BL.CLS_Client();
                string nom = txtnomclient.Text;
                string prenom = txtprenomclient.Text;
                string adresse = txtadresseclient.Text;
                string telephone = txttelephoneclient.Text;
                string email = txtemailclient.Text;
                string ville = txtvilleclient.Text;
                string pays = txtpaysclient.Text;

                if(labeltitre.Text == "Ajouter Client")
                {
                    if (Client.AjouterClient(nom, prenom, adresse, telephone, email, ville, pays))
                    {
                        MessageBox.Show("Client ajouté avec succès", "Ajout", MessageBoxButtons.OK, MessageBoxIcon.Asterisk);
                        (UserClient as USER_Liste_Client).actualiserdatagrid();
                    }
                    else
                    {
                        MessageBox.Show("Client déjà existant ", "Ajout", MessageBoxButtons.OK, MessageBoxIcon.Error);

                    }
                }
                else // labeltitre.Text == "Modifier Client"
                {
                    DialogResult choix = MessageBox.Show("Voulez-vous vraiment modifier ce client", "Modification", MessageBoxButtons.YesNo, MessageBoxIcon.Question);
                    if(choix == DialogResult.Yes)
                    {
                        
                        Client.ModifierClient(IDSelect, nom, prenom, adresse, telephone, email, ville, pays);
                        MessageBox.Show("Client modifié avec succès", "Modification", MessageBoxButtons.OK, MessageBoxIcon.Asterisk);
                        (UserClient as USER_Liste_Client).actualiserdatagrid();
                        Close();
                    }
                    else
                    {
                        MessageBox.Show("Modification annulée", "Modification", MessageBoxButtons.OK, MessageBoxIcon.Asterisk);
                    }

                }
            }
            else
            {
                MessageBox.Show(testobligatoire(), "Enregistrement", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void btnactualiser_Click(object sender, EventArgs e)
        {
            // Vider les textbox
            txtnomclient.Text = "Nom"; txtnomclient.ForeColor = Color.Silver;
            txtprenomclient.Text = "Prénom"; txtprenomclient.ForeColor = Color.Silver;
            txttelephoneclient.Text = "Téléphone"; txttelephoneclient.ForeColor = Color.Silver;
            txtemailclient.Text = "Email"; txtemailclient.ForeColor = Color.Silver;
            txtvilleclient.Text = "Ville"; txtvilleclient.ForeColor = Color.Silver;
            txtpaysclient.Text = "Pays"; txtpaysclient.ForeColor = Color.Silver;
            txtadresseclient.Text = "Adresse"; txtadresseclient.ForeColor = Color.Silver;

        }
    }
}
