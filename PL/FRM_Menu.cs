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
    public partial class FRM_Menu : Form
    {
        public FRM_Menu()
        {
            InitializeComponent();
            panelmenu.Size = new Size(67, 501);
            panelparamettre.Visible = false;
        }



        private void btnmenu_Click(object sender, EventArgs e)
        {
            if(panelmenu.Width== 67)
            {
                panelmenu.Size = new Size(218, 501);
            }
            else
            {
                panelmenu.Size = new Size(67, 501);
            }
        }

        private void btnproduit_Click(object sender, EventArgs e)
        {
            panelbutton.Top = btnproduit.Top;
            if (!panelaffiche.Controls.Contains(USER_Liste_Produit.Instance))
            {
                panelaffiche.Controls.Add(USER_Liste_Produit.Instance);
                USER_Liste_Produit.Instance.Dock = DockStyle.Fill;
                USER_Liste_Produit.Instance.BringToFront();
            }
            else
            {
                USER_Liste_Produit.Instance.BringToFront();
            }
        }

        private void btnclient_Click(object sender, EventArgs e)
        {
            panelbutton.Top = btnclient.Top;
            if(!panelaffiche.Controls.Contains(USER_Liste_Client.Instance))
            {
                panelaffiche.Controls.Add(USER_Liste_Client.Instance);
                USER_Liste_Client.Instance.Dock = DockStyle.Fill;
                USER_Liste_Client.Instance.BringToFront();
            }else
            {
                USER_Liste_Client.Instance.BringToFront();
            }
        }

        private void btncategorie_Click(object sender, EventArgs e)
        {
            panelbutton.Top = btncategorie.Top;
            if (!panelaffiche.Controls.Contains(USER_Liste_Categorie.Instance))
            {
                panelaffiche.Controls.Add(USER_Liste_Categorie.Instance);
                USER_Liste_Categorie.Instance.Dock = DockStyle.Fill;
                USER_Liste_Categorie.Instance.BringToFront();
            }
            else
            {
                USER_Liste_Categorie.Instance.BringToFront();
            }
        }

        private void btncommande_Click(object sender, EventArgs e)
        {
            panelbutton.Top = btncommande.Top;
            if (!panelaffiche.Controls.Contains(USER_Liste_Commande.Instance))
            {
                panelaffiche.Controls.Add(USER_Liste_Commande.Instance);
                USER_Liste_Commande.Instance.Dock = DockStyle.Fill;
                USER_Liste_Commande.Instance.BringToFront();
            }
            else
            {
                USER_Liste_Commande.Instance.BringToFront();
            }
        }
        private void button1_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            this.WindowState = FormWindowState.Minimized;
        }

        private void btnparamettre_Click(object sender, EventArgs e)
        {
            panelparamettre.Visible = (panelparamettre.Visible == true)? false:true;
        }

        private void btnconnecter_Click(object sender, EventArgs e)
        {
            FRM_Connexion Connexion = new FRM_Connexion(this);
            Connexion.ShowDialog();
        }

        public void etatform(bool etat)
        {
            btnclient.Enabled = etat;
            btnproduit.Enabled = etat;
            btncategorie.Enabled = etat;
            btncommande.Enabled = etat;
            btndeconnecter.Enabled = etat;
            btnconnecter.Enabled = (etat) ? false : true;
            panelparamettre.Visible = false;
        }

        private void FRM_Menu_Load(object sender, EventArgs e)
        {
            etatform(false);

        }

        private void btndeconnecter_Click(object sender, EventArgs e)
        {
            etatform(false);
            paneltitre.BringToFront();
        }


    }
}
