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
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Lagerverwaltung
{
    /// <summary>
    /// Interaktionslogik für MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            //create the constructor with post type and few data
            MyWebRequest myRequest = new MyWebRequest("http://villach.city:1234/get?table=Kunde", "POST", "a=value1&b=value2&c=value3&d=value4");
            //show the response string on the console screen.
            lbl.Content=(myRequest.GetResponse());
        }
    }
}
