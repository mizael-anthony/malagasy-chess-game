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
    public partial class FRM_Produit_Commande : Form
    {
        private Form Detail;
        public FRM_Produit_Commande(Form Detail)
        {
            InitializeComponent();
            this.Detail = Detail;
        }

        private void txtquantite_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (! char.IsDigit(e.KeyChar) && e.KeyChar != 8)
            {
                e.Handled = true;
            }
        }

        private void txtremise_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (!char.IsDigit(e.KeyChar) && e.KeyChar != 8 && txtquantite.Text == "")
            {
                e.Handled = true;
            }

        }

        private void txtquantite_TextChanged(object sender, EventArgs e)
        {
            if(txtquantite.Text != "")
            {
                int stock = int.Parse(labelstock.Text);
                int quantite = int.Parse(txtquantite.Text);
                int prix = int.Parse(labelprix.Text);
                int total = quantite * prix;
                if (quantite > stock)
                {
                    MessageBox.Show($"Il y a seulement que {stock} en Stock", "Stock", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                    txtquantite.Text = "";
                }
                else
                {
                    if (txtremise.Text != "")
                    {

                        int remise = int.Parse(txtremise.Text);
                        total = (total - ((total * remise) / 100));
                    }

                    txttotal.Text = total.ToString();

                }
            }
            else
            {
                txttotal.Text = "";
            }
        }

        private void txtremise_TextChanged(object sender, EventArgs e)
        {
            int quantite = int.Parse(txtquantite.Text);
            int prix = int.Parse(labelprix.Text);
            int total = quantite * prix;
            if (txtremise.Text != "")
            {

                int remise = int.Parse(txtremise.Text);
                total = (total - ((total * remise) / 100));
            }
            txttotal.Text = total.ToString();
        }

        private void btnenregistrer_Click(object sender, EventArgs e)
        {
            if(txttotal.Text == "")
            {
                MessageBox.Show("Entrer la Quantité à commander", "Enregistrement", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            else
            {

                BL.CLS_DetailCommande DetailCommande = new BL.CLS_DetailCommande
                {
                    Id = int.Parse(labelid.Text),
                    Nom = labelnom.Text,
                    Quantite = int.Parse(txtquantite.Text),
                    Prix = labelprix.Text,
                    Remise = (txtremise.Text == "") ? "0":txtremise.Text,
                    Total = txttotal.Text

                };

                if (this.Text == "Vendre Produit")
                {
                    
                    if (BL.CLS_DetailCommande.ListeDetailCommande.SingleOrDefault(S => S.Id == DetailCommande.Id) == null)
                    {

                        BL.CLS_DetailCommande.ListeDetailCommande.Add(DetailCommande);
                        Close();
                    }
                    else
                    {
                        MessageBox.Show("Produit déjà commandé", "Enregistrement", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                    }
                }
                else
                {
                    DialogResult choix = MessageBox.Show("Voulez-vous vraiment modifier produit commandé", "Modification", MessageBoxButtons.YesNo, MessageBoxIcon.Question);
                    if(choix == DialogResult.Yes)
                    {
                        int index = BL.CLS_DetailCommande.ListeDetailCommande.FindIndex(S => S.Id == int.Parse(labelid.Text));
                        BL.CLS_DetailCommande.ListeDetailCommande[index] = DetailCommande;
                        MessageBox.Show("Produit commandé modifié avec succès", "Modification", MessageBoxButtons.OK, MessageBoxIcon.Asterisk);
                        Close();
                    }
                    else
                    {
                        MessageBox.Show("Modification Annulé", "Modification", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                    }
                }

                (Detail as FRM_Detail_Commande).actualiserdetailcommande();
            }
            

        }
    }
}
