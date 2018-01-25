using Newtonsoft.Json;
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

        public bool addKunden(Kunde k)
        {

            request = (HttpWebRequest)WebRequest.Create("http://10.0.0.101:1234/add");
            string svcCredentials = Convert.ToBase64String(ASCIIEncoding.ASCII.GetBytes("AT01" + ":" + "addb0f5e7826c857d7376d1bd9bc33c0c544790a2eac96144a8af22b1298c940"));
            request.Headers.Add("Authorization", "Basic " + svcCredentials);
            request.ContentType = "application/json";
            request.Method = "PUT";

            using (var streamWriter = new StreamWriter(request.GetRequestStream()))
            {
                string json = JsonConvert.SerializeObject(k);

                streamWriter.Write(json);
            }
            var httpResponse = (HttpWebResponse)request.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                var responseText = streamReader.ReadToEnd();
                return true;
            }
        }

        public bool addLagerItem(LagerItem k)
        {

            request = (HttpWebRequest)WebRequest.Create("http://10.0.0.101:1234/add");
            string svcCredentials = Convert.ToBase64String(ASCIIEncoding.ASCII.GetBytes("AT01" + ":" + "addb0f5e7826c857d7376d1bd9bc33c0c544790a2eac96144a8af22b1298c940"));
            request.Headers.Add("Authorization", "Basic " + svcCredentials);
            request.ContentType = "application/json";
            request.Method = "PUT";

            using (var streamWriter = new StreamWriter(request.GetRequestStream()))
            {
                string json = JsonConvert.SerializeObject(k);

                streamWriter.Write(json);
            }
            var httpResponse = (HttpWebResponse)request.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                var responseText = streamReader.ReadToEnd();
                return true;
            }
        }
    } 
}
          
        
         