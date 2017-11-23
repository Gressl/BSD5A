using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Lagerverwaltung
{
    /// <summary>
    /// Interaktionslogik für MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        Verwaltung v;
        string username;
        string password;
        MyWebRequest req = new MyWebRequest();
        public MainWindow()
        {
            InitializeComponent();

        }

        private void button_Click(object sender, RoutedEventArgs e)
        {
            username = txt_Mandatar.Text;
            password = CalculateSHA256Hash(txt_pass.Password);

            // MessageBox.Show(username + " " + password);
            string s = req.getLoginCall("http://villach.city:1234/login", username, password);

            if (s == "true")
            {
                v = new Verwaltung(username, password);
                v.Show();
                this.Close();
               
            }
            else {
                MessageBox.Show("Username or Passwort nicht korrekt");
            }
            
        }

        private static string CalculateSHA256Hash(string text)
        {
    
            byte[] hashValue;
            byte[] message = Encoding.UTF8.GetBytes(text);

            SHA256Managed hashString = new SHA256Managed();
            string hex = "";

            hashValue = hashString.ComputeHash(message);
            foreach (byte x in hashValue)
            {
                hex += String.Format("{0:x2}", x);
            }
            return hex;
        }
    }
}
