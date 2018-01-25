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
                resstring = request.getCall("http://villach.city:1234/get?table=LagerItem", username, hashedpasswort);


                try
                {
                    string[] splitted = resstring.Split('-');

                    for (int i = 1; i < splitted.Length; i++)
                    {
                        string[] oneLagerItem = splitted[i].Split(';');
                        LagerItem l = new LagerItem(Convert.ToInt32(oneLagerItem[0]), oneLagerItem[1], Convert.ToInt32(oneLagerItem[2]), Convert.ToInt32(oneLagerItem[3]));
                        myLager.Add(l);
                        listbox_LagerItem.Items.Add(l);
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

