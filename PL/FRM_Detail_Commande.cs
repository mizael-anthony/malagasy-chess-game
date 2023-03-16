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
    public partial class FRM_Detail_Commande : Form
    {

        private UserControl UserDetailCommande;
        private DbStockContext db;

        public FRM_Detail_Commande(UserControl UserDetailCommande)
        {
            InitializeComponent();
            db = new DbStockContext();
            this.UserDetailCommande = UserDetailCommande;
        }

        public int IDClient;
        public int IDCommande;

        // Remplir datagrid de commande par liste
        public void actualiserdetailcommande()
        {
            // Calcul TVA, HT, TTC
            float TotalHT = 0;
            float TotalTTC = 0;
            float TVA = (txttva.Text == "") ? 0:float.Parse(txttva.Text);

            datadetailcommande.Rows.Clear();
            foreach(var detailcommande in BL.CLS_DetailCommande.ListeDetailCommande)
            {
                datadetailcommande.Rows.Add(
                    detailcommande.Id,
                    detailcommande.Nom,
                    detailcommande.Quantite,
                    detailcommande.Prix,
                    detailcommande.Remise,
                    detailcommande.Total
                );

                TotalHT = TotalHT + float.Parse(detailcommande.Total);
            }
            TotalTTC = (TotalHT + ((TotalHT * TVA) / 100));
            txtht.Text = TotalHT.ToString();
            txtttc.Text = TotalTTC.ToString();
        }

        // Remplir datagrid produit commande
        public void remplirdataproduitcommande()
        {
            db = new DbStockContext();
            foreach(var produit in db.Produits)
            {
                dataproduitcommande.Rows.Add(
                    produit.ID_Produit, produit.Nom_Produit, produit.Quantite_Produit, produit.Prix_Produit);
            }
            for (int i = 0; i < dataproduitcommande.Rows.Count; i++)
            {
                if ((int)dataproduitcommande.Rows[i].Cells[2].Value == 0)
                {
                    dataproduitcommande.Rows[i].Cells[2].Style.BackColor = Color.Red;
                }
                else
                {
                    dataproduitcommande.Rows[i].Cells[2].Style.BackColor = Color.LightGreen;

                }

                dataproduitcommande.ClearSelection();
            }
        }
        private void btnquitter_Click(object sender, EventArgs e)
        {
            this.Close();
            // Vider la liste
            BL.CLS_DetailCommande.ListeDetailCommande.Clear();
        }

        private void txtrecherche_Enter(object sender, EventArgs e)
        {
            if (txtrecherche.Text == "Recherche")
            {
                txtrecherche.Text = "";
                txtrecherche.ForeColor = Color.White;
            }
        }

        private void FRM_Detail_Commande_Load(object sender, EventArgs e)
        {
            remplirdataproduitcommande();
        }

        private void txtrecherche_TextChanged(object sender, EventArgs e)
        {
            db = new DbStockContext();

            var listerecherche = db.Produits.ToList();
            listerecherche = listerecherche.Where(S => S.Nom_Produit.IndexOf(txtrecherche.Text, StringComparison.CurrentCultureIgnoreCase) != -1).ToList();

            dataproduitcommande.Rows.Clear();
            foreach(var recherche in listerecherche)
            {
                dataproduitcommande.Rows.Add(recherche.ID_Produit, recherche.Nom_Produit, recherche.Quantite_Produit, recherche.Prix_Produit);
            }

        }

        private void btnclient_Click(object sender, EventArgs e)
        {
            FRM_Client_Commande ClientCommande = new FRM_Client_Commande();
            ClientCommande.ShowDialog();
            // Afficher les informations du client
            IDClient = int.Parse(ClientCommande.dataclientcommande.CurrentRow.Cells[0].Value.ToString());
            txtnom.Text = ClientCommande.dataclientcommande.CurrentRow.Cells[1].Value.ToString();
            txtprenom.Text = ClientCommande.dataclientcommande.CurrentRow.Cells[2].Value.ToString();
            txttelephone.Text = ClientCommande.dataclientcommande.CurrentRow.Cells[4].Value.ToString();
            txtemail.Text = ClientCommande.dataclientcommande.CurrentRow.Cells[5].Value.ToString();
            txtpays.Text = ClientCommande.dataclientcommande.CurrentRow.Cells[6].Value.ToString();
            txtville.Text = ClientCommande.dataclientcommande.CurrentRow.Cells[7].Value.ToString();
        }

        private void dataproduitcommande_CellContentDoubleClick(object sender, DataGridViewCellEventArgs e)
        {
            FRM_Produit_Commande ProduitCommande = new FRM_Produit_Commande(this);
            if ((int)dataproduitcommande.CurrentRow.Cells[2].Value == 0)
            {
                MessageBox.Show("Stock vide", "Stock", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            else
            {
                ProduitCommande.labelid.Text = dataproduitcommande.CurrentRow.Cells[0].Value.ToString();
                ProduitCommande.labelnom.Text = dataproduitcommande.CurrentRow.Cells[1].Value.ToString();
                ProduitCommande.labelstock.Text = dataproduitcommande.CurrentRow.Cells[2].Value.ToString();
                ProduitCommande.labelprix.Text = dataproduitcommande.CurrentRow.Cells[3].Value.ToString();

                ProduitCommande.ShowDialog();

            }
        }

        private void modifierToolStripMenuItem_Click(object sender, EventArgs e)
        {
            FRM_Produit_Commande ModifierProduitCommande = new FRM_Produit_Commande(this);
            Produit produit = new Produit();
            if(datadetailcommande.CurrentRow != null)
            {
                // Tsy maints atao voalohany fa manjary misy exception miainga refa vide le prix
                ModifierProduitCommande.labelprix.Text = datadetailcommande.CurrentRow.Cells[3].Value.ToString();

                ModifierProduitCommande.Text = "Modifier Produit";
                // Importer Stock de produit
                int ID_Produit = int.Parse(datadetailcommande.CurrentRow.Cells[0].Value.ToString());
                produit = db.Produits.Single(S => S.ID_Produit == ID_Produit);
                ModifierProduitCommande.labelstock.Text = produit.Quantite_Produit.ToString();


                ModifierProduitCommande.labelid.Text = datadetailcommande.CurrentRow.Cells[0].Value.ToString();
                ModifierProduitCommande.labelnom.Text = datadetailcommande.CurrentRow.Cells[1].Value.ToString();
                ModifierProduitCommande.txtquantite.Text = datadetailcommande.CurrentRow.Cells[2].Value.ToString();
                ModifierProduitCommande.txtremise.Text = datadetailcommande.CurrentRow.Cells[4].Value.ToString();
                ModifierProduitCommande.txttotal.Text = datadetailcommande.CurrentRow.Cells[5].Value.ToString();

                ModifierProduitCommande.ShowDialog();
            }
        }

        private void supprimerToolStripMenuItem_Click(object sender, EventArgs e)
        {
            if(datadetailcommande.CurrentRow != null)
            {
                DialogResult choix = MessageBox.Show("Voulez vraiment supprimer produit commandé", "Suppression", MessageBoxButtons.YesNo, MessageBoxIcon.Question);
                if(choix == DialogResult.Yes)
                {
                    int idproduit = int.Parse(datadetailcommande.CurrentRow.Cells[0].Value.ToString());
                    int index = BL.CLS_DetailCommande.ListeDetailCommande.FindIndex(S => S.Id == idproduit);
                    BL.CLS_DetailCommande.ListeDetailCommande.RemoveAt(index);
                    MessageBox.Show("Produit commandé supprimé avec succès", "Suppression", MessageBoxButtons.OK, MessageBoxIcon.Asterisk);
                    actualiserdetailcommande();
                }
                else
                {
                    MessageBox.Show("Suppresion Annulé", "Suppression", MessageBoxButtons.OK, MessageBoxIcon.Warning);

                }

            }
        }

        private void txttva_TextChanged(object sender, EventArgs e)
        {
            actualiserdetailcommande();
        }

        private void btnenregistrerdetail_Click(object sender, EventArgs e)
        {

            BL.CLS_Commande Commande = new BL.CLS_Commande();
            if(datadetailcommande.Rows.Count == 0)
            {
                MessageBox.Show("Ajouter au moins un Produit à commander", "Commande", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            else
            {
                // Si Client Vide
                if(txtnom.Text == "")
                {
                    MessageBox.Show("Ajouter un Client", "Commande", MessageBoxButtons.OK, MessageBoxIcon.Error);

                }
                else
                {
                    // TVA par défaut
                    string tva = (txttva.Text == "") ? "0" : txttva.Text;
                    string etat = (comboetat.Text == "") ? "Non Payé" : comboetat.Text;
                    if(labeltitre.Text == "Ajouter Commande")
                    {
                        Commande.Ajouter_Commande(
                        datedetailcommande.Value,
                        IDClient,
                        txtht.Text,
                        tva,
                        txtttc.Text,
                        etat
                        );

                        foreach (var detailcommande in BL.CLS_DetailCommande.ListeDetailCommande)
                        {
                            Commande.Ajouter_Detail_Commande(
                                detailcommande.Id,
                                detailcommande.Nom,
                                detailcommande.Quantite,
                                detailcommande.Prix,
                                detailcommande.Remise,
                                detailcommande.Total
                                );
                        }

                        MessageBox.Show("Commande ajoutée avec succès", "Commande", MessageBoxButtons.OK, MessageBoxIcon.Asterisk);
                    }
                    else
                    {
                        // Si labeltitre == Modifier Commande
                        Commande.Modifier_Commande(
                            IDCommande,
                            datedetailcommande.Value,
                            txtht.Text,
                            tva,
                            txtttc.Text,
                            etat
                            );
                        foreach (var detailcommande in BL.CLS_DetailCommande.ListeDetailCommande)
                        {
                            Commande.Modifier_Detail_Commande(
                                detailcommande.Id,
                                detailcommande.Nom,
                                detailcommande.Quantite,
                                detailcommande.Prix,
                                detailcommande.Remise,
                                detailcommande.Total
                                );
                        }
                        MessageBox.Show("Commande modifié avec succès", "Commande", MessageBoxButtons.OK, MessageBoxIcon.Asterisk);
                    }

                    (UserDetailCommande as USER_Liste_Commande).remplirdatacommande();
                    BL.CLS_DetailCommande.ListeDetailCommande.Clear();
                    Close();

                }
                
            }
        }
    }
}
