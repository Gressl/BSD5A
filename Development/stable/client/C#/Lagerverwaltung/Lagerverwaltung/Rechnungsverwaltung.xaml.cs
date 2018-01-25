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
    /// Interaktionslogik für Rechnungsverwaltung.xaml
    /// </summary>
    public partial class Rechnungsverwaltung : Window
    {
        MyWebRequest request = new MyWebRequest();
        List<Rechnung> myRechnungen = new List<Rechnung>();
        string username;
        string hashedpasswort;
        string resstring;
        public Rechnungsverwaltung(string user, string pwd)
        {
            InitializeComponent();
            username = user;
            hashedpasswort = pwd;
            resstring = request.getCall("http://10.0.0.101:1234/get?table=Rechnung", username, hashedpasswort);


            try
            {
                var myar = JsonConvert.DeserializeObject<List<Rechnung>>(resstring);

                for (int i = 0; i < myar.Count; i++)
                {
                    listbox_Rechnung.Items.Add(myar[i]);
                }

            }
            catch (Exception)
            {
                MessageBox.Show("Something went wrong");
            }

        }
      

       

        private void listbox_Rechnung_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            try
            {
                Rechnung r = (Rechnung)listbox_Rechnung.SelectedItem;
                txt_ID.Text = Convert.ToString(r.Rechnungsnummer);
                bezahlt.Content = r.Bezahlt;
           
            }
            catch (Exception ex)
            {

            }
        }

        private void btn_Back_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }
    }
}
