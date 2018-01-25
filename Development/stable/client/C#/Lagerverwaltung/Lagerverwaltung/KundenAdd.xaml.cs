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
        MyWebRequest request = new MyWebRequest();
        public KundenAdd()
        {
            InitializeComponent();
        }

        private void btnCancel_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        
        }

        private void btnAdd_Click(object sender, RoutedEventArgs e)
        {
            Kunde k = new Kunde(Int32.Parse(txt_ID.Text), txt_Name.Text, txt_Adresse.Text, txt_UID.Text);
            
            request.addKunden(k);
        }
    }
}
