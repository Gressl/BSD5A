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
    /// Interaktionslogik für LagerItemAdd.xaml
    /// </summary>
    public partial class LagerItemAdd : Window
    {
        public LagerItemAdd()
        {
            InitializeComponent();
        }

        private void btn_add_Click(object sender, RoutedEventArgs e)
        {
            LagerItem k = new LagerItem(Int32.Parse(txt_ID.Text), txt_Name.Text,Int32.Parse(txt_Preis.Text), Int32.Parse(txt_Menge.Text));
        }

        private void btn_back_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }
    }
}
