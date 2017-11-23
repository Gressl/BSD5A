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
        List<Kunde> myKunden = new List<Kunde>();
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
                    string[] onecustomer = splitted[i].Split(';');
                    Kunde k = new Kunde(Convert.ToInt32(onecustomer[0]), onecustomer[1], onecustomer[2], onecustomer[3]);
                    myKunden.Add(k);
                    lbl_Kunde.Items.Add(k);
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
                Kunde k = (Kunde)lbl_Kunde.SelectedItem;
                txt_ID.Text = Convert.ToString(k.id);
                txt_Name.Text = k.Name;
                txt_Adresse.Text = k.Adresse;
                txt_UID.Text = k.UID;
            }
            catch (Exception ex)
            {

            }
        }
    }
}
