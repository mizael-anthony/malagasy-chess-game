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
    public partial class FRM_Client_Commande : Form
    {

        private DbStockContext db;
        public FRM_Client_Commande()
        {
            InitializeComponent();
            db = new DbStockContext();
        }

        public void remplirdataclientcommande()
        {
            db = new DbStockContext();
            foreach (var client in db.Clients)
            {
                dataclientcommande.Rows.Add(
                    client.ID_Client,
                    client.Nom_Client,
                    client.Prenom_Client,
                    client.Adresse_Client,
                    client.Telephone_Client,
                    client.Email_Client,
                    client.Pays_Client,
                    client.Ville_Client
                    );
            }

        }

        private void FRM_Client_Commande_Load(object sender, EventArgs e)
        {
            remplirdataclientcommande();
        }

        private void dataclientcommande_CellContentDoubleClick(object sender, DataGridViewCellEventArgs e)
        {
            Close();
        }
    }
}
