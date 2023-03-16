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
    public partial class USER_Liste_Categorie : UserControl
    {
        private static USER_Liste_Categorie UserCategorie;
        private DbStockContext db;
        public static USER_Liste_Categorie Instance
        {
            get
            {
                if (UserCategorie == null)
                {
                    UserCategorie = new USER_Liste_Categorie();
                }
                return UserCategorie;
            }
        }
        public USER_Liste_Categorie()
        {
            InitializeComponent();
            db = new DbStockContext();
        }
        

        public int ligneselect()
        {
            int nombreligneselect = 0;
            for (int i = 0; i < datacategorie.Rows.Count; i++)
            {
                if ((bool)datacategorie.Rows[i].Cells[0].Value == true)
                {
                    nombreligneselect++;
                }
            }

            return nombreligneselect;
        }

        public string verifierligneselectmodifier()
        {

            if (ligneselect() == 0)
            {
                return "Selectionner le Catégorie que vous voulez modifier";
            }
            if (ligneselect() > 1)
            {
                return "Selectionner Seulement 1 seul Catégorie à modifier";
            }
            return "OK";
        }

        public string verifierligneselectsupprimer()
        {
            if (ligneselect() == 0)
            {
                return "Selectionner la Catégorie que vous voulez supprimer";
            }

            return "OK";
        }

        private void txtrecherche_Enter(object sender, EventArgs e)
        {
            if (txtrecherche.Text == "Recherche")
            {
                txtrecherche.Text = "";
                txtrecherche.ForeColor = Color.Black;
            }
        }

        public void actualiserdatagrid()
        {
            db = new DbStockContext();
            datacategorie.Rows.Clear();

            foreach (var categorie in db.Categories)
            {
                datacategorie.Rows.Add(false, categorie.ID_Categorie, categorie.Nom_Categorie);

            }



        }

        private void USER_Liste_Categorie_Load(object sender, EventArgs e)
        {
            actualiserdatagrid();
        }

        private void txtrecherche_TextChanged(object sender, EventArgs e)
        {
            List<Categorie> listerecherche = db.Categories.ToList();
            listerecherche = listerecherche.Where(
                            S => S.Nom_Categorie.IndexOf(txtrecherche.Text, StringComparison.CurrentCultureIgnoreCase) != -1).ToList();
            
            datacategorie.Rows.Clear();

            foreach (Categorie recherche in listerecherche)
            {
                datacategorie.Rows.Add(false, recherche.ID_Categorie, recherche.Nom_Categorie);

            }



        }

        private void btnajouter_Click(object sender, EventArgs e)
        {
            FRM_Ajouter_Modifier_Categorie AjouterCategorie = new FRM_Ajouter_Modifier_Categorie(this);
            AjouterCategorie.ShowDialog();
        }

        private void btnmodifier_Click(object sender, EventArgs e)
        {
            FRM_Ajouter_Modifier_Categorie ModifierCategorie = new FRM_Ajouter_Modifier_Categorie(this);
            if (verifierligneselectmodifier() == "OK")
            {
                for (int i = 0; i < datacategorie.Rows.Count; i++)
                {
                    if ((bool)datacategorie.Rows[i].Cells[0].Value == true)
                    {
                        ModifierCategorie.IDCategorie = (int)datacategorie.Rows[i].Cells[1].Value;
                        ModifierCategorie.txtcategorie.Text = datacategorie.Rows[i].Cells[2].Value.ToString();

                    }
                }

                ModifierCategorie.labeltitre.Text = "Modifier Produit";
                ModifierCategorie.ShowDialog();
            }
            else
            {
                MessageBox.Show(verifierligneselectmodifier(), "Modification", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            
        }

        private void btnsupprimer_Click(object sender, EventArgs e)
        {
            BL.CLS_Categorie categorie = new BL.CLS_Categorie();

            if (verifierligneselectsupprimer() == "OK")
            {
                DialogResult choix = MessageBox.Show("Voulez-vous vraimment supprimer", "Suppression", MessageBoxButtons.YesNo, MessageBoxIcon.Question);
                if (choix == DialogResult.Yes)
                {
                    for (int i = 0; i < datacategorie.Rows.Count; i++)
                    {
                        if ((bool)datacategorie.Rows[i].Cells[0].Value == true)
                        {
                            int idcategorie = int.Parse(datacategorie.Rows[i].Cells[1].Value.ToString());
                            string nomcategorie = datacategorie.Rows[i].Cells[2].Value.ToString();
                            var produits = db.Produits.Where(S => S.ID_Categorie == idcategorie).ToList();
                            if(produits.Count == 0)
                            {
                                MessageBox.Show($"Catégorie {nomcategorie} supprimée avec succès", "Suppression", MessageBoxButtons.OK, MessageBoxIcon.Asterisk);
                                categorie.SupprimerProduit(idcategorie);

                            }
                            else
                            {
                                MessageBox.Show($"Catégorie {nomcategorie} est utilisée dans la liste des produits et ne peut pas être supprimée", "Suppression", MessageBoxButtons.OK, MessageBoxIcon.Error);

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
    }
}
