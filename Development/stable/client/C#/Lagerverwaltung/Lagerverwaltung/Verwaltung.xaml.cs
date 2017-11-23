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
    /// Interaktionslogik für Verwaltung.xaml
    /// </summary>
    public partial class Verwaltung : Window
    {
        string username;
        string hashedpassword;
        Kundenverwaltung k;

        public Verwaltung(string user, string password)
        {
            InitializeComponent();
            username = user;
            hashedpassword = password;

            lbl_user.Content = username;
        }

        private void button_Click(object sender, RoutedEventArgs e)
        {

        }

        private void button_Click_1(object sender, RoutedEventArgs e)
        {
            k = new Kundenverwaltung(username, hashedpassword);
            k.Show();
        }
    }
}
