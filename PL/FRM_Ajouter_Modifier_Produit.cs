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
    public partial class FRM_Ajouter_Modifier_Produit : Form
    {
        private DbStockContext db;
        private UserControl UserProduit;
        public FRM_Ajouter_Modifier_Produit(UserControl UserProduit)
        {
            InitializeComponent();
            db = new DbStockContext();
            this.UserProduit = UserProduit;

            // Valeur de la combocategorie via base de donnée
            combocategorie.DataSource = db.Categories.ToList();
            // Afficher uniquement que le Nom de la catégorie
            combocategorie.DisplayMember = "Nom_Categorie";
            combocategorie.ValueMember = "ID_Categorie";
        }

        public int IDProduit;




        private void btnquitter_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void txtnomproduit_Enter(object sender, EventArgs e)
        {
            if (txtnomproduit.Text == "Nom du produit")
            {
                txtnomproduit.Text = "";
                txtnomproduit.ForeColor = Color.WhiteSmoke;
            }
        }

        private void txtnomproduit_Leave(object sender, EventArgs e)
        {
            if (txtnomproduit.Text == "")
            {
                txtnomproduit.Text = "Nom du produit";
                txtnomproduit.ForeColor = Color.Silver;
            }
        }

        private void txtquantiteproduit_Enter(object sender, EventArgs e)
        {
            if (txtquantiteproduit.Text == "Quantité")
            {
                txtquantiteproduit.Text = "";
                txtquantiteproduit.ForeColor = Color.WhiteSmoke;
            }
        }

        private void txtquantiteproduit_Leave(object sender, EventArgs e)
        {
            if (txtquantiteproduit.Text == "")
            {
                txtquantiteproduit.Text = "Quantité";
                txtquantiteproduit.ForeColor = Color.Silver;
            }
        }

        private void txtprixproduit_Enter(object sender, EventArgs e)
        {
            if (txtprixproduit.Text == "Prix")
            {
                txtprixproduit.Text = "";
                txtprixproduit.ForeColor = Color.WhiteSmoke;
            }
        }

        private void txtprixproduit_Leave(object sender, EventArgs e)
        {
            if (txtprixproduit.Text == "")
            {
                txtprixproduit.Text = "Prix";
                txtprixproduit.ForeColor = Color.Silver;
            }
        }



        private void txtquantiteproduit_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (e.KeyChar < 48 || e.KeyChar > 57)
            {
                e.Handled = true;
            }
            if (e.KeyChar == 8)
            {
                e.Handled = false;
            }
        }

        private void txtprixproduit_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (e.KeyChar < 48 || e.KeyChar > 57)
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
            if (txtnomproduit.Text == "" || txtnomproduit.Text == "Nom du produit")
            {
                return "Entrer le Nom du produit";
            }
            if (txtquantiteproduit.Text == "" || txtquantiteproduit.Text == "Quantité")
            {
                return "Entrer la Quantité du produit";
            }
            if (txtprixproduit.Text == "" || txtprixproduit.Text == "Prix")
            {
                return "Entrer le Prix du produit";
            }
            if (combocategorie.Text == "")
            {
                return "Entrer la Catégorie du produit";
            }

            return "OK";
        }
        private void btnenregistrer_Click(object sender, EventArgs e)
        {
            if (testobligatoire() == "OK")
            {
                BL.CLS_Produit Produit = new BL.CLS_Produit();
                string nomproduit = txtnomproduit.Text;
                int quantite = int.Parse(txtquantiteproduit.Text);
                string prix = txtprixproduit.Text;
                int idcategorie = Convert.ToInt32(combocategorie.SelectedValue);


                if (labeltitre.Text == "Ajouter Produit")
                {
                    if (Produit.AjouterProduit(nomproduit, quantite, prix, idcategorie))
                    {
                        MessageBox.Show("Produit ajouté avec succès", "Ajout", MessageBoxButtons.OK, MessageBoxIcon.Asterisk);
                        (UserProduit as USER_Liste_Produit).actualiserdatagrid();
                    }
                    else
                    {
                        MessageBox.Show("Produit déjà existant", "Ajout", MessageBoxButtons.OK, MessageBoxIcon.Error);

                    }
                }
                else // labeltitre.Text == Modifier Produit
                {
                    DialogResult choix = MessageBox.Show("Voulez-vous vraiment modifier ce produit", "Modification", MessageBoxButtons.YesNo, MessageBoxIcon.Question);
                    if(choix == DialogResult.Yes)
                    {
                        Produit.ModifierProduit(IDProduit, nomproduit, quantite, prix, idcategorie);
                        MessageBox.Show("Produit modifié avec succès", "Modification", MessageBoxButtons.OK, MessageBoxIcon.Asterisk);
                        (UserProduit as USER_Liste_Produit).actualiserdatagrid();
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
            txtnomproduit.Text = "Nom du produit"; txtnomproduit.ForeColor = Color.Silver;
            txtquantiteproduit.Text = "Quantité"; txtquantiteproduit.ForeColor = Color.Silver;
            txtprixproduit.Text = "Prix"; txtprixproduit.ForeColor = Color.Silver;
            combocategorie.Text = "";
        }
    }
}
