package controllers;
import classes.*;
import com.google.gson.*;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.JsonPrimitive;
import javafx.application.Platform;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;
import netscape.javascript.JSObject;

import java.awt.*;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class mainmenu_Controller {
    private String auth;

    @FXML private Label lblError;

    public void setAuthString(String authString){
        this.auth = authString;
    }

    public void exit(){
        Platform.exit();
    }
    public void openKunde(){
        openTable("kunde");
    }
    public void openLager(){
        openTable("lageritem");
    }
    public void openVerkauf(){
        openTable("verkauf");
    }
    public void openTable(String id){
        try {
            String webPage = "http://10.0.0.101:1234/get?table=" + id;

            String authStringEnc = this.auth;

            URL url = new URL(webPage);
            URLConnection urlConnection = url.openConnection();
            urlConnection.setRequestProperty("Authorization", "Basic " + authStringEnc);
            InputStream is = urlConnection.getInputStream();
            InputStreamReader isr = new InputStreamReader(is);

            int numCharsRead;
            char[] charArray = new char[1024];

            StringBuffer sb = new StringBuffer();
            while ((numCharsRead = isr.read(charArray)) > 0) {
                sb.append(charArray, 0, numCharsRead);
            }

            String result = sb.toString();

            Gson gson = new Gson();
            //List resultList = null;
            Object[] results = null;

            if(id.equals("kunde")) {
                //Kunde[] k
                results = gson.fromJson(result, Kunde[].class);
                //resultList = Arrays.asList(k);
            }
            else if(id.equals("lageritem")){
                //Lageritem[] l
                results = gson.fromJson(result, Lageritem[].class);
                //resultList = Arrays.asList(l);
            }
            else if(id.equals("verkauf")){
                //Verkauf[] v
                results = gson.fromJson(result, Verkauf[].class);
                //resultList = Arrays.asList(v);
            }
            FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource("../windows/dataTable.fxml"));
            Parent root = (Parent) fxmlLoader.load();
            dataTable_Controller cont = fxmlLoader.<dataTable_Controller>getController();
            cont.setResultList(results);
            cont.setTitle(id);
            cont.setData();

            Stage stage = new Stage();
            stage.setTitle(id);
            stage.setScene(new Scene(root));
            stage.show();
        }
        catch(IOException ex){
            lblError.setText("Connection lost");
            ex.printStackTrace();
        }
        catch(Exception ex){
            ex.printStackTrace();
        }
    }
}
