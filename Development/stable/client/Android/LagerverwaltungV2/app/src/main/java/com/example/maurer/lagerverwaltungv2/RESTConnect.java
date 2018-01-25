package com.example.maurer.lagerverwaltungv2;

import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.util.Log;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.loopj.android.http.Base64;
import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.security.MessageDigest;

import static com.example.maurer.lagerverwaltungv2.R.id.home;
import static java.lang.System.in;

/**
 * Created by pupil on 1/25/18.
 */

public class RESTConnect extends AsyncTask<Void,Void, Boolean> {

    String txtUser;
    String txtPassword;
    Button btnLogin;
    String baseURL = "http://10.0.0.101";
    String port = "1234";
    boolean result = false;
    Context ctx;
    Object[] parameters;

    URL url;
    HttpURLConnection conn = null;

    public RESTConnect(Context ctx, Object[] params){

        this.ctx = ctx;
        this.parameters = params;
    }

    @Override
    protected Boolean doInBackground(Void... objects) {
        String route = (String)parameters[0].toString().split("\\?")[0];
        System.out.println(route);
        switch (route){
            case "/login":
                System.out.println("2");
                return (boolean) doLogin(parameters);
            case "/get":
                System.out.println("3");
                return (boolean) doGet(parameters);
            default:
                System.out.println("4");
                Toast.makeText(ctx, "Invalid Option", Toast.LENGTH_SHORT).show();
                return false;
        }
    }

    private Object doGet(Object[] objects) {
        try{
            txtUser = (String) objects[1].toString();
            txtPassword = (String) objects[2].toString();
            url = new URL(baseURL + ":" + port + objects[0]);
            conn = (HttpURLConnection) url.openConnection();

            String basicAuth = "Basic " + createBasicAuth(txtUser, txtPassword);
            conn.setRequestProperty ("Authorization", basicAuth);

            conn.setRequestMethod("GET");
            conn.connect();

            InputStream in;
            if(conn.getResponseCode() == 200) {
                in = new BufferedInputStream(conn.getInputStream());
                String data = readStream(in);
                Intent i = new Intent(ctx, DataActivity.class);
                i.putExtra("data", data);
                ctx.startActivity(i);
            }
        }
        catch(Exception ex){
            result = false;
        }
        finally{
            conn.disconnect();
        }
        return result;
    }



    private Object doLogin(Object[] objects){
        try{
            txtUser = (String) objects[1].toString();
            txtPassword = (String) objects[2].toString();
            url = new URL(baseURL + ":" + port + "/login");
            conn = (HttpURLConnection) url.openConnection();

            String basicAuth = "Basic " + createBasicAuth(txtUser, txtPassword);
            conn.setRequestProperty ("Authorization", basicAuth);


            conn.setRequestMethod("GET");
            conn.connect();
            InputStream in;
            System.out.println(txtUser + " " + txtPassword + " " + conn.getResponseCode());
            if(conn.getResponseCode() == 200) {

                in = new BufferedInputStream(conn.getInputStream());
                result = true;
                Intent i = new Intent(ctx, HubActivity.class);
                i.putExtra("Username", txtUser);
                i.putExtra("Password", txtPassword);
                ctx.startActivity(i);
            }
            else{
                in = new BufferedInputStream(conn.getErrorStream());
                result = false;
            }
            System.out.println(readStream(in));
            return result;
        }
        catch (FileNotFoundException fex){
            try {
                System.out.println(conn.getResponseCode());
            } catch (IOException e) {
                e.printStackTrace();
            }
            return false;
        }
        catch (Exception ex){
            ex.printStackTrace();
            return false;
        }
        finally {
            conn.disconnect();
        }
    }



    private String readStream(InputStream is) {
        try {
            ByteArrayOutputStream bo = new ByteArrayOutputStream();
            int i = is.read();
            while(i != -1) {
                bo.write(i);
                i = is.read();
            }
            return bo.toString();
        } catch (IOException e) {
            return "";
        }
    }


    public String createBasicAuth(String user, String pass) throws Exception{
        try{
            String authString = user + ":" + encodeSha256(pass);
            byte[] authEncBytes = Base64.encode(authString.getBytes(), Base64.NO_WRAP);
            String authStringEnc = new String(authEncBytes);

            return authStringEnc;
        }
        catch (Exception ex){
            throw new Exception(ex);
        }
    }


    public String encodeSha256(String base) throws Exception {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(base.getBytes("UTF-8"));
            StringBuffer hexString = new StringBuffer();

            for (int i = 0; i < hash.length; i++) {
                String hex = Integer.toHexString(0xff & hash[i]);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }

            return hexString.toString();
        } catch (Exception ex) {
            throw new Exception(ex);
        }
    }




}
