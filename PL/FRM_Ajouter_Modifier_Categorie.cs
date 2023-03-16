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
    public partial class FRM_Ajouter_Modifier_Categorie : Form
    {
        private DbStockContext db;
        private UserControl UserCategorie;
        public FRM_Ajouter_Modifier_Categorie(UserControl UserCategorie)
        {
            InitializeComponent();
            db = new DbStockContext();
            this.UserCategorie = UserCategorie;

        }
        public int IDCategorie;

        private void btnquitter_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void txtcategorie_Enter(object sender, EventArgs e)
        {
            if (txtcategorie.Text == "Catégorie")
            {
                txtcategorie.Text = "";
                txtcategorie.ForeColor = Color.WhiteSmoke;
            }
        }

        string testobligatoire()
        {
            if (txtcategorie.Text == "" || txtcategorie.Text == "Catégorie")
            {
                return "Entrer la Catégorie";
            }
            
            return "OK";
        }

        private void btnenregistrer_Click(object sender, EventArgs e)
        {
            if(testobligatoire() == "OK")
            {
                BL.CLS_Categorie Categorie = new BL.CLS_Categorie();

                if(labeltitre.Text == "Ajouter Catégorie")
                {
                    if (Categorie.AjouterCategorie(txtcategorie.Text))
                    {
                        MessageBox.Show("Catégorie ajouté avec succès", "Ajout", MessageBoxButtons.OK, MessageBoxIcon.Asterisk);
                        (UserCategorie as USER_Liste_Categorie).actualiserdatagrid();
                    }
                    else
                    {
                        MessageBox.Show("Catégorie déjà existant", "Ajout", MessageBoxButtons.OK, MessageBoxIcon.Error);

                    }

                }
                else // labeltitre.Text == "Modifier Catégorie"
                {
                    DialogResult choix = MessageBox.Show("Voulez-vous vraiment modifier ce produit", "Modification", MessageBoxButtons.YesNo, MessageBoxIcon.Question);
                    if (choix == DialogResult.Yes)
                    {
                        Categorie.ModifierCategorie(IDCategorie, txtcategorie.Text);
                        MessageBox.Show("Catégorie modifié avec succès", "Modification", MessageBoxButtons.OK, MessageBoxIcon.Asterisk);
                        (UserCategorie as USER_Liste_Categorie).actualiserdatagrid();
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
    }
}
