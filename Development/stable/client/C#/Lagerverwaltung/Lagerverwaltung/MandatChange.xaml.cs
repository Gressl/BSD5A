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
    /// Interaktionslogik für MandatChange.xaml
    /// </summary>
    public partial class MandatChange : Window
    {
        MyWebRequest request = new MyWebRequest();
        //Mandatar md;
        //string username;
        //string hashedpasswort;
        //string resstring;

        public MandatChange()
        {
            InitializeComponent();

            //username = user;
            //hashedpasswort = pwd;
            //resstring = request.getCall("http://10.0.0.101:1234/get?table=Mandatar", username, hashedpasswort);


        }

        private void btnUp_Click(object sender, RoutedEventArgs e)
        {
            Mandatar m = new Mandatar(txt_FirmName.Text, txt_Adresse.Text);
            request.updateMand(m);
            this.Close();
        }
    }
}
