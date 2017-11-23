using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace Lagerverwaltung
{
    /// <summary>
    /// Interaktionslogik für Kundenverwaltung.xaml
    /// </summary>
    public partial class Kundenverwaltung : Window
    {
        MyWebRequest request = new MyWebRequest();
        string username;
        string hashedpasswort;
        string resstring;
        public Kundenverwaltung(string user, string pwd)
        {
            InitializeComponent();
            username = user;
            hashedpasswort = pwd;
            resstring = request.getCall("http://villach.city:1234/get?table=Kunde", username, hashedpasswort);
        

            try
            {
                string[] splitted = resstring.Split('\n');

                for (int i = 1; i < splitted.Length; i++)
                {
                    string onecustomer = splitted[i].Replace(";", " ");
                    lbl_Kunde.Items.Add(onecustomer);
                }
            }
            catch (Exception)
            {
                MessageBox.Show("Something went wrong");
            }
           
        }

        private void lbl_Kunde_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            try
            {
                string[] splitinfo = lbl_Kunde.SelectedItem.ToString().Split(' ');
                txt_ID.Text = splitinfo[0];
                txt_Name.Text = splitinfo[1];
                txt_Adresse.Text = splitinfo[2];
                txt_UID.Text = splitinfo[3];
            }
            catch (Exception ex)
            {

            }
        }
    }
}
