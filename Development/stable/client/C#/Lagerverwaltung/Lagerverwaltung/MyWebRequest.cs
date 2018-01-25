using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Lagerverwaltung
{
    class MyWebRequest
    {
        private WebRequest request;
       

        public String getLoginCall(string url, string username, string password)
        {
            string responseString = "false";

            try
            {
                request = (HttpWebRequest)WebRequest.Create(url);
                string svcCredentials = Convert.ToBase64String(ASCIIEncoding.ASCII.GetBytes(username + ":" + password));
                request.Headers.Add("Authorization", "Basic " + svcCredentials);
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                responseString = new StreamReader(response.GetResponseStream()).ReadToEnd();
            }
            catch (WebException ex)
            {
                return "false";
            }

            return responseString;
        }

        public String getCall(string url, string username, string password)
        {
            string responseString = "false";

            try
            {
                request = (HttpWebRequest)WebRequest.Create(url);
                string svcCredentials = Convert.ToBase64String(ASCIIEncoding.ASCII.GetBytes(username + ":" + password));
                request.Headers.Add("Authorization", "Basic " + svcCredentials);
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                responseString = new StreamReader(response.GetResponseStream()).ReadToEnd();
            }
            catch (WebException ex)
            {
                return ex.Message;
            }

            return responseString;
        }

        public String addData(string url, string username, string password, Object k)
        {
            string responseString = "false";

            try
            {
                request = (HttpWebRequest)WebRequest.Create(url);
                string svcCredentials = Convert.ToBase64String(ASCIIEncoding.ASCII.GetBytes(username + ":" + password));
                request.Headers.Add("Authorization", "Basic " + svcCredentials);
                
                Stream dataStream = request.GetRequestStream();
                //dataStream.Write(k, 0);

                dataStream.Close();
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                responseString = new StreamReader(response.GetResponseStream()).ReadToEnd();
            }
            catch (WebException ex)
            {
                return ex.Message;
            }

            return responseString;
        }

    }
}
