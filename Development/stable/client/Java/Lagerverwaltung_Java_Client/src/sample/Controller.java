package sample;

import controllers.mainmenu_Controller;

import javafx.application.Platform;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.stage.Stage;

import javax.sql.rowset.serial.SQLInputImpl;
import javax.xml.crypto.dsig.Transform;
import java.io.Console;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.Base64;

public class Controller {

    private String currentUsername;
    private String currentPassword;

    @FXML private PasswordField lblPassword;
    @FXML private TextField lblUsername;
    @FXML private Label lblError;

    public void exitWindow(){
        Platform.exit();
    }
    @FXML
    public void login(){

        Parent root;
        lblError.setText("");

        try{
            currentUsername = lblUsername.getText().toString();
            currentPassword = lblPassword.getText().toString();

            String webPage = "http://10.0.0.101:1234/login";

            String authStringEnc = createBasicAuth();

            URL url = new URL(webPage);
            URLConnection urlConnection = url.openConnection();
            urlConnection.setRequestProperty("Authorization", "Basic " + authStringEnc);
            InputStream is = urlConnection.getInputStream();
            InputStreamReader isr = new InputStreamReader(is);

            int numCharsRead;
            char[] charArray = new char[1024];
            StringBuffer sb = new StringBuffer();
            while((numCharsRead = isr.read(charArray))>0){
                sb.append(charArray, 0, numCharsRead);
            }
            String result = sb.toString();

            FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource("../windows/mainmenu.fxml"));
            //root = FXMLLoader.load(getClass().getResource("../windows/mainmenu.fxml"));
            root = (Parent)fxmlLoader.load();
            mainmenu_Controller cont = fxmlLoader.<mainmenu_Controller>getController();
            cont.setAuthString(authStringEnc);

            //kunde, verkauf, lageritem
            Stage stage = new Stage();
            stage.setTitle("Logged in as: " + currentUsername);
            stage.setScene(new Scene(root));
            stage.show();
        }
        catch (IOException e){
            lblError.setText("Login failed");
        }
        catch (Exception e) {
            e.printStackTrace();
        }

    }

    public String encodeSha256(String base) throws Exception {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(base.getBytes("UTF-8"));
            StringBuffer hexString = new StringBuffer();

            for(int i = 0; i < hash.length; i++){
                String hex = Integer.toHexString(0xff & hash[i]);
                if(hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }

            return hexString.toString();
        }
        catch(Exception ex){
            throw new Exception(ex);
        }
    }

    public String createBasicAuth() throws Exception{
        try{
            String authString = currentUsername + ":" + encodeSha256(currentPassword);
            byte[] authEncBytes = Base64.getEncoder().encode(authString.getBytes());
            String authStringEnc = new String(authEncBytes);

            return authStringEnc;
        }
        catch (Exception ex){
            throw new Exception(ex);
        }
    }
}
