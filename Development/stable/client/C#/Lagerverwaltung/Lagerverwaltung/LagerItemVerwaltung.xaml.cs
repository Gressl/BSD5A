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
    /// Interaktionslogik für LagerItemVerwaltung.xaml
    /// </summary>
    public partial class LagerItemVerwaltung : Window
    {
            MyWebRequest request = new MyWebRequest();
            List<LagerItem> myLager = new List<LagerItem>();
            string username;
            string hashedpasswort;
            string resstring;
    
        public LagerItemVerwaltung(string user, string pwd)
            {
                InitializeComponent();
                username = user;
                hashedpasswort = pwd;
                resstring = request.getCall("http://10.0.0.101:1234/get?table=LagerItem", username, hashedpasswort);

                try
                {
                    var myar = JsonConvert.DeserializeObject<List<LagerItem>>(resstring);

                    for (int i = 0; i < myar.Count; i++)
                    {
                        listbox_LagerItem.Items.Add(myar[i]);
                    }

                }
                catch (Exception)
                {
                    MessageBox.Show("Something went wrong");
                }

            }

        private void btn_add_Click(object sender, RoutedEventArgs e)
        {
            LagerItemAdd lia = new LagerItemAdd();
            lia.Show();
        }

        private void listbox_LagerItem_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            try
            {
                LagerItem l = (LagerItem)listbox_LagerItem.SelectedItem;
                txt_ID.Text = Convert.ToString(l.id);
                txt_Name.Text = l.Name;
                txt_Preis.Text = l.Preis.ToString();
                txt_Menge.Text = l.Menge.ToString();
            }
            catch (Exception ex)
            {

            }
        }
    }
    
   }

