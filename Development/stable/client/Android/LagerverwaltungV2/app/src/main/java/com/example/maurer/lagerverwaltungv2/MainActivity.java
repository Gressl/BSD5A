package com.example.maurer.lagerverwaltungv2;

import android.content.Context;
import android.util.Log;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;

import android.app.DownloadManager;
import android.icu.util.RangeValueIterator;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.loopj.android.http.*;
import cz.msebera.android.httpclient.Header;

import com.loopj.android.http.AsyncHttpClient;

import android.app.Activity;
import android.os.Bundle;

import java.io.IOException;
import java.io.InputStream;

import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import android.util.Log;

import android.widget.Toast;
import android.os.AsyncTask;

import java.io.InputStreamReader;
import java.util.concurrent.ExecutionException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

public class MainActivity extends AppCompatActivity {

    EditText txtUser;
    EditText txtPassword;
    Button btnLogin;
    String baseURL = "http://10.0.0.101";
    String port = "1234";



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        txtUser = (EditText) findViewById(R.id.txtUser);
        txtPassword = (EditText) findViewById(R.id.txtPassword);
        btnLogin = (Button) findViewById(R.id.btnLogin);


        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //Toast.makeText(MainActivity.this, "Toast", Toast.LENGTH_SHORT).show();
                Object[] params = new Object[20];
                params[0] = "/login?";
                params[1] = txtUser.getText();
                params[2] = txtPassword.getText();
                try {
                    if (new RESTConnect(getActivity(), params).execute().get() == false) Toast.makeText(getActivity(), "Invalid Credentials or very wrong Method", Toast.LENGTH_SHORT).show();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } catch (ExecutionException e) {
                    e.printStackTrace();
                }
            }
        });
    }

    public Context getActivity() {
        return this;
    }
}