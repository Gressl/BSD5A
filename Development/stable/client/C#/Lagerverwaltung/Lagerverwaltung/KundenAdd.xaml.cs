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
    /// Interaktionslogik für KundenAdd.xaml
    /// </summary>
    public partial class KundenAdd : Window
    {
        public KundenAdd()
        {
            InitializeComponent();
        }

        private void btnCancel_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
            //Kundenverwaltung kvV = new Kundenverwaltung();
            //kvV.Show();
        }

        private void btnAdd_Click(object sender, RoutedEventArgs e)
        {

        }
    }
}
