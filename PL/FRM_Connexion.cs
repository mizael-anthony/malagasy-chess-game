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
    public partial class FRM_Connexion : Form
    {
        private DbStockContext db;
        private new Form Menu;
        BL.CLS_Connexion Connexion = new BL.CLS_Connexion();

        public FRM_Connexion(Form Menu)
        {
            InitializeComponent();
            this.Menu = Menu;
            db = new DbStockContext();

        }

        private void btnquitter_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void txtnom_Enter(object sender, EventArgs e)
        {
            if(txtnom.Text == "Nom d'utilisateur")
            {
                txtnom.Text = "";
                txtnom.ForeColor = Color.WhiteSmoke;
            }
        }

        private void txtmotdepasse_Enter(object sender, EventArgs e)
        {
            if (txtmotdepasse.Text == "Mot De Passe")
            {
                txtmotdepasse.PasswordChar = '*';
                txtmotdepasse.Text = "";
                txtmotdepasse.ForeColor = Color.WhiteSmoke;
                txtmotdepasse.UseSystemPasswordChar = false;
            }
        }

        private void txtnom_Leave(object sender, EventArgs e)
        {
            if (txtnom.Text == "")
            {
                txtnom.Text = "Nom d'utilisateur";
                txtnom.ForeColor = Color.Silver;
            }
        }

        private void txtmotdepasse_Leave(object sender, EventArgs e)
        {
            if (txtmotdepasse.Text == "")
            {
                txtmotdepasse.Text = "Mot De Passe";
                txtmotdepasse.UseSystemPasswordChar = true;// désactiver passworchar
                txtmotdepasse.ForeColor = Color.Silver;
            }
        }
        string testobligatoire()
        {
            if(txtnom.Text == "" || txtnom.Text == "Nom d'utilisateur")
            {
                return "Entrez votre Nom";
            }
            if (txtmotdepasse.Text == "" || txtmotdepasse.Text == "Mot De Passe")
            {
                return "Entrez votre Mot De Passe";
            }

            return "OK";
        }

        private void btnseconnecter_Click(object sender, EventArgs e)
        {
            if (testobligatoire() == "OK")
            {
                
                if(Connexion.ConnexionValide(db, txtnom.Text, txtmotdepasse.Text))
                {
                    MessageBox.Show("Connexion réussie", "Connexion", MessageBoxButtons.OK, MessageBoxIcon.Asterisk);
                    (Menu as FRM_Menu).etatform(true);
                    this.Close();

                }else
                {
                    MessageBox.Show("Connexion échoué", "Connexion", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                MessageBox.Show(testobligatoire(), "Obligatoire", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
    }
}
