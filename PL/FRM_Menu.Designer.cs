
namespace WindowsForms.PL
{
    partial class FRM_Menu
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.panelmenu = new System.Windows.Forms.Panel();
            this.panelbutton = new System.Windows.Forms.Panel();
            this.btnmenu = new System.Windows.Forms.Button();
            this.btncommande = new System.Windows.Forms.Button();
            this.btncategorie = new System.Windows.Forms.Button();
            this.btnproduit = new System.Windows.Forms.Button();
            this.btnclient = new System.Windows.Forms.Button();
            this.panel2 = new System.Windows.Forms.Panel();
            this.panel3 = new System.Windows.Forms.Panel();
            this.panelparamettre = new System.Windows.Forms.Panel();
            this.btndeconnecter = new System.Windows.Forms.Button();
            this.btnconnecter = new System.Windows.Forms.Button();
            this.panelaffiche = new System.Windows.Forms.Panel();
            this.paneltitre = new System.Windows.Forms.Panel();
            this.pictureBox2 = new System.Windows.Forms.PictureBox();
            this.label2 = new System.Windows.Forms.Label();
            this.label1 = new System.Windows.Forms.Label();
            this.panel6 = new System.Windows.Forms.Panel();
            this.panel5 = new System.Windows.Forms.Panel();
            this.panel4 = new System.Windows.Forms.Panel();
            this.panel1 = new System.Windows.Forms.Panel();
            this.pictureBox1 = new System.Windows.Forms.PictureBox();
            this.btnparamettre = new System.Windows.Forms.Button();
            this.button2 = new System.Windows.Forms.Button();
            this.button1 = new System.Windows.Forms.Button();
            this.panelmenu.SuspendLayout();
            this.panel3.SuspendLayout();
            this.panelparamettre.SuspendLayout();
            this.panelaffiche.SuspendLayout();
            this.paneltitre.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox2)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            this.SuspendLayout();
            // 
            // panelmenu
            // 
            this.panelmenu.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(41)))), ((int)(((byte)(39)))), ((int)(((byte)(40)))));
            this.panelmenu.Controls.Add(this.panelbutton);
            this.panelmenu.Controls.Add(this.btnmenu);
            this.panelmenu.Controls.Add(this.btncommande);
            this.panelmenu.Controls.Add(this.btncategorie);
            this.panelmenu.Controls.Add(this.btnproduit);
            this.panelmenu.Controls.Add(this.btnclient);
            this.panelmenu.Dock = System.Windows.Forms.DockStyle.Left;
            this.panelmenu.Location = new System.Drawing.Point(0, 0);
            this.panelmenu.Name = "panelmenu";
            this.panelmenu.Size = new System.Drawing.Size(67, 534);
            this.panelmenu.TabIndex = 0;
            // 
            // panelbutton
            // 
            this.panelbutton.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(178)))), ((int)(((byte)(8)))), ((int)(((byte)(55)))));
            this.panelbutton.Location = new System.Drawing.Point(3, 110);
            this.panelbutton.Name = "panelbutton";
            this.panelbutton.Size = new System.Drawing.Size(15, 56);
            this.panelbutton.TabIndex = 4;
            // 
            // btnmenu
            // 
            this.btnmenu.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.btnmenu.FlatAppearance.BorderSize = 0;
            this.btnmenu.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnmenu.Image = global::WindowsForms.Properties.Resources.Menu_32;
            this.btnmenu.Location = new System.Drawing.Point(5, 3);
            this.btnmenu.Name = "btnmenu";
            this.btnmenu.Size = new System.Drawing.Size(59, 48);
            this.btnmenu.TabIndex = 4;
            this.btnmenu.UseVisualStyleBackColor = true;
            this.btnmenu.Click += new System.EventHandler(this.btnmenu_Click);
            // 
            // btncommande
            // 
            this.btncommande.FlatAppearance.BorderSize = 0;
            this.btncommande.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(178)))), ((int)(((byte)(8)))), ((int)(((byte)(55)))));
            this.btncommande.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btncommande.Font = new System.Drawing.Font("Century Gothic", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btncommande.ForeColor = System.Drawing.SystemColors.ButtonHighlight;
            this.btncommande.Image = global::WindowsForms.Properties.Resources.shopping_icon;
            this.btncommande.ImageAlign = System.Drawing.ContentAlignment.MiddleLeft;
            this.btncommande.Location = new System.Drawing.Point(12, 455);
            this.btncommande.Name = "btncommande";
            this.btncommande.Size = new System.Drawing.Size(206, 56);
            this.btncommande.TabIndex = 7;
            this.btncommande.Text = "     Commande";
            this.btncommande.UseVisualStyleBackColor = true;
            this.btncommande.Click += new System.EventHandler(this.btncommande_Click);
            // 
            // btncategorie
            // 
            this.btncategorie.FlatAppearance.BorderSize = 0;
            this.btncategorie.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(178)))), ((int)(((byte)(8)))), ((int)(((byte)(55)))));
            this.btncategorie.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btncategorie.Font = new System.Drawing.Font("Century Gothic", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btncategorie.ForeColor = System.Drawing.SystemColors.ButtonHighlight;
            this.btncategorie.Image = global::WindowsForms.Properties.Resources.Categorie;
            this.btncategorie.ImageAlign = System.Drawing.ContentAlignment.MiddleLeft;
            this.btncategorie.Location = new System.Drawing.Point(12, 343);
            this.btncategorie.Name = "btncategorie";
            this.btncategorie.Size = new System.Drawing.Size(206, 56);
            this.btncategorie.TabIndex = 6;
            this.btncategorie.Text = "   Catégorie";
            this.btncategorie.UseVisualStyleBackColor = true;
            this.btncategorie.Click += new System.EventHandler(this.btncategorie_Click);
            // 
            // btnproduit
            // 
            this.btnproduit.FlatAppearance.BorderSize = 0;
            this.btnproduit.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(178)))), ((int)(((byte)(8)))), ((int)(((byte)(55)))));
            this.btnproduit.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnproduit.Font = new System.Drawing.Font("Century Gothic", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnproduit.ForeColor = System.Drawing.SystemColors.ButtonHighlight;
            this.btnproduit.Image = global::WindowsForms.Properties.Resources.shop_cart_add_icon;
            this.btnproduit.ImageAlign = System.Drawing.ContentAlignment.MiddleLeft;
            this.btnproduit.Location = new System.Drawing.Point(12, 215);
            this.btnproduit.Name = "btnproduit";
            this.btnproduit.Size = new System.Drawing.Size(206, 56);
            this.btnproduit.TabIndex = 5;
            this.btnproduit.Text = "Produit";
            this.btnproduit.UseVisualStyleBackColor = true;
            this.btnproduit.Click += new System.EventHandler(this.btnproduit_Click);
            // 
            // btnclient
            // 
            this.btnclient.FlatAppearance.BorderSize = 0;
            this.btnclient.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(178)))), ((int)(((byte)(8)))), ((int)(((byte)(55)))));
            this.btnclient.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnclient.Font = new System.Drawing.Font("Century Gothic", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnclient.ForeColor = System.Drawing.SystemColors.ButtonHighlight;
            this.btnclient.Image = global::WindowsForms.Properties.Resources.Office_Client_Male_Light_icon;
            this.btnclient.ImageAlign = System.Drawing.ContentAlignment.MiddleLeft;
            this.btnclient.Location = new System.Drawing.Point(12, 110);
            this.btnclient.Name = "btnclient";
            this.btnclient.Size = new System.Drawing.Size(206, 56);
            this.btnclient.TabIndex = 4;
            this.btnclient.Text = "Client";
            this.btnclient.UseVisualStyleBackColor = true;
            this.btnclient.Click += new System.EventHandler(this.btnclient_Click);
            // 
            // panel2
            // 
            this.panel2.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(178)))), ((int)(((byte)(8)))), ((int)(((byte)(55)))));
            this.panel2.Dock = System.Windows.Forms.DockStyle.Top;
            this.panel2.Location = new System.Drawing.Point(67, 0);
            this.panel2.Name = "panel2";
            this.panel2.Size = new System.Drawing.Size(1161, 18);
            this.panel2.TabIndex = 1;
            // 
            // panel3
            // 
            this.panel3.Controls.Add(this.panelparamettre);
            this.panel3.Controls.Add(this.panelaffiche);
            this.panel3.Controls.Add(this.btnparamettre);
            this.panel3.Controls.Add(this.button2);
            this.panel3.Controls.Add(this.button1);
            this.panel3.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel3.Location = new System.Drawing.Point(67, 18);
            this.panel3.Name = "panel3";
            this.panel3.Size = new System.Drawing.Size(1161, 516);
            this.panel3.TabIndex = 2;
            // 
            // panelparamettre
            // 
            this.panelparamettre.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(41)))), ((int)(((byte)(39)))), ((int)(((byte)(40)))));
            this.panelparamettre.Controls.Add(this.btndeconnecter);
            this.panelparamettre.Controls.Add(this.btnconnecter);
            this.panelparamettre.Location = new System.Drawing.Point(40, 0);
            this.panelparamettre.Name = "panelparamettre";
            this.panelparamettre.Size = new System.Drawing.Size(159, 91);
            this.panelparamettre.TabIndex = 8;
            // 
            // btndeconnecter
            // 
            this.btndeconnecter.FlatAppearance.BorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(178)))), ((int)(((byte)(8)))), ((int)(((byte)(55)))));
            this.btndeconnecter.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btndeconnecter.Font = new System.Drawing.Font("Century Gothic", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btndeconnecter.ForeColor = System.Drawing.SystemColors.ButtonHighlight;
            this.btndeconnecter.Location = new System.Drawing.Point(3, 50);
            this.btndeconnecter.Name = "btndeconnecter";
            this.btndeconnecter.Size = new System.Drawing.Size(152, 36);
            this.btndeconnecter.TabIndex = 1;
            this.btndeconnecter.Text = "Déconnecter";
            this.btndeconnecter.UseVisualStyleBackColor = true;
            this.btndeconnecter.Click += new System.EventHandler(this.btndeconnecter_Click);
            // 
            // btnconnecter
            // 
            this.btnconnecter.FlatAppearance.BorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(178)))), ((int)(((byte)(8)))), ((int)(((byte)(55)))));
            this.btnconnecter.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnconnecter.Font = new System.Drawing.Font("Century Gothic", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnconnecter.ForeColor = System.Drawing.SystemColors.ButtonHighlight;
            this.btnconnecter.Location = new System.Drawing.Point(3, 3);
            this.btnconnecter.Name = "btnconnecter";
            this.btnconnecter.Size = new System.Drawing.Size(152, 41);
            this.btnconnecter.TabIndex = 0;
            this.btnconnecter.Text = "Connecter";
            this.btnconnecter.UseVisualStyleBackColor = true;
            this.btnconnecter.Click += new System.EventHandler(this.btnconnecter_Click);
            // 
            // panelaffiche
            // 
            this.panelaffiche.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.panelaffiche.BackColor = System.Drawing.Color.Silver;
            this.panelaffiche.Controls.Add(this.paneltitre);
            this.panelaffiche.Location = new System.Drawing.Point(0, 51);
            this.panelaffiche.Name = "panelaffiche";
            this.panelaffiche.Size = new System.Drawing.Size(1161, 462);
            this.panelaffiche.TabIndex = 10;
            // 
            // paneltitre
            // 
            this.paneltitre.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(40)))), ((int)(((byte)(38)))), ((int)(((byte)(41)))));
            this.paneltitre.Controls.Add(this.pictureBox2);
            this.paneltitre.Controls.Add(this.label2);
            this.paneltitre.Controls.Add(this.label1);
            this.paneltitre.Controls.Add(this.panel6);
            this.paneltitre.Controls.Add(this.panel5);
            this.paneltitre.Controls.Add(this.panel4);
            this.paneltitre.Controls.Add(this.panel1);
            this.paneltitre.Controls.Add(this.pictureBox1);
            this.paneltitre.Dock = System.Windows.Forms.DockStyle.Fill;
            this.paneltitre.Location = new System.Drawing.Point(0, 0);
            this.paneltitre.Name = "paneltitre";
            this.paneltitre.Size = new System.Drawing.Size(1161, 462);
            this.paneltitre.TabIndex = 4;
            // 
            // pictureBox2
            // 
            this.pictureBox2.Image = global::WindowsForms.Properties.Resources.customer_service_icon;
            this.pictureBox2.Location = new System.Drawing.Point(522, 23);
            this.pictureBox2.Name = "pictureBox2";
            this.pictureBox2.Size = new System.Drawing.Size(46, 50);
            this.pictureBox2.TabIndex = 18;
            this.pictureBox2.TabStop = false;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.label2.Font = new System.Drawing.Font("Microsoft Sans Serif", 27.75F, ((System.Drawing.FontStyle)((System.Drawing.FontStyle.Bold | System.Drawing.FontStyle.Italic))), System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label2.ForeColor = System.Drawing.SystemColors.Control;
            this.label2.Location = new System.Drawing.Point(561, 31);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(173, 42);
            this.label2.TabIndex = 17;
            this.label2.Text = "Manager";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.label1.Font = new System.Drawing.Font("Microsoft Sans Serif", 27.75F, ((System.Drawing.FontStyle)((System.Drawing.FontStyle.Bold | System.Drawing.FontStyle.Italic))), System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(178)))), ((int)(((byte)(8)))), ((int)(((byte)(55)))));
            this.label1.Location = new System.Drawing.Point(373, 31);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(152, 42);
            this.label1.TabIndex = 16;
            this.label1.Text = "STOCK";
            // 
            // panel6
            // 
            this.panel6.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(178)))), ((int)(((byte)(8)))), ((int)(((byte)(55)))));
            this.panel6.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.panel6.Location = new System.Drawing.Point(5, 457);
            this.panel6.Name = "panel6";
            this.panel6.Size = new System.Drawing.Size(1151, 5);
            this.panel6.TabIndex = 15;
            // 
            // panel5
            // 
            this.panel5.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(178)))), ((int)(((byte)(8)))), ((int)(((byte)(55)))));
            this.panel5.Dock = System.Windows.Forms.DockStyle.Left;
            this.panel5.Location = new System.Drawing.Point(0, 5);
            this.panel5.Name = "panel5";
            this.panel5.Size = new System.Drawing.Size(5, 457);
            this.panel5.TabIndex = 14;
            // 
            // panel4
            // 
            this.panel4.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(178)))), ((int)(((byte)(8)))), ((int)(((byte)(55)))));
            this.panel4.Dock = System.Windows.Forms.DockStyle.Top;
            this.panel4.Location = new System.Drawing.Point(0, 0);
            this.panel4.Name = "panel4";
            this.panel4.Size = new System.Drawing.Size(1156, 5);
            this.panel4.TabIndex = 13;
            // 
            // panel1
            // 
            this.panel1.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(178)))), ((int)(((byte)(8)))), ((int)(((byte)(55)))));
            this.panel1.Dock = System.Windows.Forms.DockStyle.Right;
            this.panel1.Location = new System.Drawing.Point(1156, 0);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(5, 462);
            this.panel1.TabIndex = 12;
            // 
            // pictureBox1
            // 
            this.pictureBox1.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(40)))), ((int)(((byte)(38)))), ((int)(((byte)(41)))));
            this.pictureBox1.Image = global::WindowsForms.Properties.Resources.logiciel_de_gestion_de_stock;
            this.pictureBox1.Location = new System.Drawing.Point(325, 85);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(458, 299);
            this.pictureBox1.TabIndex = 4;
            this.pictureBox1.TabStop = false;
            // 
            // btnparamettre
            // 
            this.btnparamettre.FlatAppearance.BorderSize = 0;
            this.btnparamettre.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnparamettre.Image = global::WindowsForms.Properties.Resources.Settings_32;
            this.btnparamettre.Location = new System.Drawing.Point(0, 0);
            this.btnparamettre.Name = "btnparamettre";
            this.btnparamettre.Size = new System.Drawing.Size(36, 28);
            this.btnparamettre.TabIndex = 9;
            this.btnparamettre.UseVisualStyleBackColor = true;
            this.btnparamettre.Click += new System.EventHandler(this.btnparamettre_Click);
            // 
            // button2
            // 
            this.button2.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.button2.FlatAppearance.BorderSize = 0;
            this.button2.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.button2.Image = global::WindowsForms.Properties.Resources.Subtract_32;
            this.button2.Location = new System.Drawing.Point(1089, 3);
            this.button2.Name = "button2";
            this.button2.Size = new System.Drawing.Size(33, 28);
            this.button2.TabIndex = 7;
            this.button2.UseVisualStyleBackColor = true;
            this.button2.Click += new System.EventHandler(this.button2_Click);
            // 
            // button1
            // 
            this.button1.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.button1.FlatAppearance.BorderSize = 0;
            this.button1.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.button1.Image = global::WindowsForms.Properties.Resources.Shutdown_32;
            this.button1.Location = new System.Drawing.Point(1120, 3);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(33, 28);
            this.button1.TabIndex = 6;
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // FRM_Menu
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1228, 534);
            this.Controls.Add(this.panel3);
            this.Controls.Add(this.panel2);
            this.Controls.Add(this.panelmenu);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "FRM_Menu";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Menu";
            this.Load += new System.EventHandler(this.FRM_Menu_Load);
            this.panelmenu.ResumeLayout(false);
            this.panel3.ResumeLayout(false);
            this.panelparamettre.ResumeLayout(false);
            this.panelaffiche.ResumeLayout(false);
            this.paneltitre.ResumeLayout(false);
            this.paneltitre.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox2)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel panelmenu;
        private System.Windows.Forms.Panel panel2;
        private System.Windows.Forms.Button btnclient;
        private System.Windows.Forms.Button btncommande;
        private System.Windows.Forms.Button btncategorie;
        private System.Windows.Forms.Button btnproduit;
        private System.Windows.Forms.Button btnmenu;
        private System.Windows.Forms.Panel panelbutton;
        private System.Windows.Forms.Panel panel3;
        private System.Windows.Forms.Button btnparamettre;
        private System.Windows.Forms.Panel panelparamettre;
        private System.Windows.Forms.Button btndeconnecter;
        private System.Windows.Forms.Button btnconnecter;
        private System.Windows.Forms.Button button2;
        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.Panel panelaffiche;
        private System.Windows.Forms.Panel paneltitre;
        private System.Windows.Forms.Panel panel6;
        private System.Windows.Forms.Panel panel5;
        private System.Windows.Forms.Panel panel4;
        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.PictureBox pictureBox1;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.PictureBox pictureBox2;
    }
}