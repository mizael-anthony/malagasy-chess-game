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
    public partial class USER_Liste_Produit : UserControl
    {

        private static USER_Liste_Produit UserProduit;
        private DbStockContext db;
        public static USER_Liste_Produit Instance
        {
            get
            {
                if (UserProduit == null)
                {
                    UserProduit = new USER_Liste_Produit();
                }
                return UserProduit;
            }
        }
        public USER_Liste_Produit()
        {
            InitializeComponent();
            db = new DbStockContext();
            // Désactiver textbox de recherche
            txtrecherche.Enabled = false;
        }

        public int ligneselect()
        {
            int nombreligneselect = 0;
            for (int i = 0; i < dataproduit.Rows.Count; i++)
            {
                if ((bool)dataproduit.Rows[i].Cells[0].Value == true)
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
                return "Selectionner le Produit Que vous voulez modifier";
            }
            if (ligneselect() > 1)
            {
                return "Selectionner Seulement 1 seul Produit à modifier";
            }
            return "OK";
        }

        public string verifierligneselectsupprimer()
        {
            if (ligneselect() == 0)
            {
                return "Selectionner le Produit que vous voulez supprimer";
            }

            return "OK";
        }


        public void actualiserdatagrid()
        {
            db = new DbStockContext();
            dataproduit.Rows.Clear();

            // Afficher Nom catégorie à partir de idcatégorie
            Categorie categorie = new Categorie();
            foreach (var produit in db.Produits)
            {
                // Vérifier si idcategorie dans produit == idcategorie dans categorie
                categorie = db.Categories.SingleOrDefault(S => S.ID_Categorie == produit.ID_Categorie);
                if(categorie != null)// si existe
                {
                    dataproduit.Rows.Add(
                    false,
                    produit.ID_Produit,
                    produit.Nom_Produit,
                    produit.Quantite_Produit,
                    produit.Prix_Produit,
                    categorie.Nom_Categorie
                    );
                }
                
            }

            // Colorier stock vide
            for (int i = 0; i < dataproduit.Rows.Count; i++)
            {
                if ((int)dataproduit.Rows[i].Cells[3].Value == 0)
                {
                    dataproduit.Rows[i].Cells[3].Style.BackColor = Color.Red;
                }
                else
                {
                    dataproduit.Rows[i].Cells[3].Style.BackColor = Color.LightGreen;

                }
            }



        }

        private void USER_Liste_Produit_Load(object sender, EventArgs e)
        {
            actualiserdatagrid();
        }



        private void txtrecherche_Enter(object sender, EventArgs e)
        {
            if (txtrecherche.Text == "Recherche")
            {
                txtrecherche.Text = "";
                txtrecherche.ForeColor = Color.Black;
            }
        }

        private void btnajouter_Click(object sender, EventArgs e)
        {
            FRM_Ajouter_Modifier_Produit AjouterProduit = new FRM_Ajouter_Modifier_Produit(this);
            AjouterProduit.ShowDialog();
        }

        private void btnmodifier_Click(object sender, EventArgs e)
        {
            FRM_Ajouter_Modifier_Produit ModifierProduit = new FRM_Ajouter_Modifier_Produit(this);

            if(verifierligneselectmodifier() == "OK")
            {
                for(int i = 0; i < dataproduit.Rows.Count; i++)
                {
                    if((bool)dataproduit.Rows[i].Cells[0].Value == true)
                    {
                        ModifierProduit.IDProduit = (int)dataproduit.Rows[i].Cells[1].Value;
                        ModifierProduit.txtnomproduit.Text = dataproduit.Rows[i].Cells[2].Value.ToString();
                        ModifierProduit.txtquantiteproduit.Text = dataproduit.Rows[i].Cells[3].Value.ToString();
                        ModifierProduit.txtprixproduit.Text = dataproduit.Rows[i].Cells[4].Value.ToString();
                        ModifierProduit.combocategorie.Text = dataproduit.Rows[i].Cells[5].Value.ToString();

                    }
                }

                ModifierProduit.labeltitre.Text = "Modifier Produit";
                ModifierProduit.btnactualiser.Visible = false;
                ModifierProduit.ShowDialog();
            }
            else
            {
                MessageBox.Show(verifierligneselectmodifier(), "Modification", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }



        }

        private void btnsupprimer_Click(object sender, EventArgs e)
        {
            BL.CLS_Produit produit = new BL.CLS_Produit();

            if (verifierligneselectsupprimer() == "OK")
            {
                DialogResult choix = MessageBox.Show("Voulez-vous vraimment supprimer", "Suppression", MessageBoxButtons.YesNo, MessageBoxIcon.Question);
                if (choix == DialogResult.Yes)
                {
                    for (int i = 0; i < dataproduit.Rows.Count; i++)
                    {
                        int idproduit = int.Parse(dataproduit.Rows[i].Cells[1].Value.ToString());
                        string nomproduit = dataproduit.Rows[i].Cells[2].Value.ToString();
                        var detailcommandes = db.Details_Commande.Where(S => S.ID_Produit == idproduit).ToList();
                        if ((bool)dataproduit.Rows[i].Cells[0].Value == true)
                        {
                            if(detailcommandes.Count == 0)
                            {
                                MessageBox.Show($"Produit {nomproduit} supprimé avec succès", "Suppression", MessageBoxButtons.OK, MessageBoxIcon.Asterisk);
                                produit.SupprimerProduit(idproduit);

                            }
                            else
                            {
                                MessageBox.Show($"Produit {nomproduit} a été commandé et ne peut pas être supprimé", "Suppression", MessageBoxButtons.OK, MessageBoxIcon.Error);

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
            List<Produit> listerecherche = db.Produits.ToList();
            if (txtrecherche.Text != "") // Pas vide
            {
                switch (comborecherche.Text)
                {
                    case "Nom":
                        listerecherche = listerecherche.Where(
                            S => S.Nom_Produit.IndexOf(txtrecherche.Text, StringComparison.CurrentCultureIgnoreCase) != -1).ToList();
                        break;
                    case "Quantité":
                        listerecherche = listerecherche.Where(
                            S => S.Quantite_Produit.ToString().IndexOf(txtrecherche.Text, StringComparison.CurrentCultureIgnoreCase) != -1).ToList();
                        break;

                    case "Prix":
                        listerecherche = listerecherche.Where(
                            S => S.Prix_Produit.IndexOf(txtrecherche.Text, StringComparison.CurrentCultureIgnoreCase) != -1).ToList();
                        break;

                    case "Catégorie":
                        listerecherche = listerecherche.Where(
                            S => S.Categorie.Nom_Categorie.IndexOf(txtrecherche.Text, StringComparison.CurrentCultureIgnoreCase) != -1).ToList();
                        break;


                }

            }

            // Ajout dans datagrid
            // créer classe mitokana gestion data
            dataproduit.Rows.Clear();
            Categorie categorie = new Categorie();

            foreach (Produit recherche in listerecherche)
            {
                categorie = db.Categories.SingleOrDefault(S => S.ID_Categorie == recherche.ID_Categorie);
                if (categorie != null)// si existe
                {
                    dataproduit.Rows.Add(
                    false,
                    recherche.ID_Produit,
                    recherche.Nom_Produit,
                    recherche.Quantite_Produit,
                    recherche.Prix_Produit,
                    categorie.Nom_Categorie
                    );
                }
            }
            for (int i = 0; i < dataproduit.Rows.Count; i++)
            {
                if ((int)dataproduit.Rows[i].Cells[3].Value == 0)
                {
                    dataproduit.Rows[i].Cells[3].Style.BackColor = Color.Red;
                }
                else
                {
                    dataproduit.Rows[i].Cells[3].Style.BackColor = Color.LightGreen;

                }
            }
        }

        private void btnactualiser_Click(object sender, EventArgs e)
        {
            actualiserdatagrid();

        }
    }
}
