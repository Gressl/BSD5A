using Newtonsoft.Json;
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
            resstring = request.getCall("http://10.0.0.101:1234/get?table=Kunde", username, hashedpasswort);
        

            try
            {
                MessageBox.Show(resstring);
                var myar = JsonConvert.DeserializeObject<List<Kunde>>(resstring);
             
                for(int i=0; i < myar.Count;i++)
                 {
                    lbl_Kunde.Items.Add(myar[i]);
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
                txt_ID.Text = Convert.ToString(k.K_ID);
                txt_Name.Text = k.Name;
                txt_Adresse.Text = k.Adresse;
                txt_UID.Text = k.UID;
            }
            catch (Exception ex)
            {

            }
        }

        private void btnAdd_Click(object sender, RoutedEventArgs e)
        {
            KundenAdd kaV = new KundenAdd();
            kaV.Show();
        }

        private void btnUpdate_Click(object sender, RoutedEventArgs e)
        {

        }
    }
}
