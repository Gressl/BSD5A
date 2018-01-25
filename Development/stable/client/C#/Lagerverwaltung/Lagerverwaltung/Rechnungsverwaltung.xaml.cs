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
            resstring = request.getCall("http://villach.city:1234/get?table=Rechnung", username, hashedpasswort);


            try
            {
                string[] splitted = resstring.Split('-');

                for (int i = 1; i < splitted.Length; i++)
                {
                    string[] oneRechnung = splitted[i].Split(';');
                    Rechnung r = new Rechnung(Convert.ToInt32(oneRechnung[0]),Convert.ToBoolean(oneRechnung[1]));
                    myRechnungen.Add(r);
                    listbox_Rechnung.Items.Add(r);
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
