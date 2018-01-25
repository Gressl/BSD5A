package com.example.maurer.lagerverwaltungv2;

import android.content.Context;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import java.util.concurrent.ExecutionException;

public class HubActivity extends AppCompatActivity {
    String txtUser;
    String txtPassword;

    TextView tv_loggedInAs;
    Button btn_showSales;
    Button btn_showCustomers;
    Button btn_showInventory;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_hub);
        Intent i = getIntent();

        txtUser = i.getStringExtra("Username");
        txtPassword = i.getStringExtra("Password");
        tv_loggedInAs = (TextView) findViewById(R.id.tv_loggedInAs);
        btn_showSales = (Button) findViewById(R.id.btn_showSales);
        btn_showCustomers = (Button) findViewById(R.id.btn_showCustomers);
        btn_showInventory = (Button) findViewById(R.id.btn_ShowInventory);

        tv_loggedInAs.setText(tv_loggedInAs.getText() + txtUser);

        Toast.makeText(this, "Login....", Toast.LENGTH_SHORT).show();


        btn_showSales.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //Toast.makeText(MainActivity.this, "Toast", Toast.LENGTH_SHORT).show();
                Object[] params = new Object[20];
                params[0] = "/get?table=verkauf";
                params[1] = txtUser;
                params[2] = txtPassword;
                try {
                    if (new RESTConnect(getActivity(), params).execute().get() == false) Toast.makeText(getActivity(), "Something went wrong", Toast.LENGTH_SHORT).show();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } catch (ExecutionException e) {
                    e.printStackTrace();
                }
            }
        });

        btn_showCustomers.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //Toast.makeText(MainActivity.this, "Toast", Toast.LENGTH_SHORT).show();
                Object[] params = new Object[20];
                params[0] = "/get?table=Kunde";
                params[1] = txtUser;
                params[2] = txtPassword;
                try {
                    if (new RESTConnect(getActivity(), params).execute().get() == false) Toast.makeText(getActivity(), "Something went wrong", Toast.LENGTH_SHORT).show();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } catch (ExecutionException e) {
                    e.printStackTrace();
                }
            }
        });

        btn_showInventory.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //Toast.makeText(MainActivity.this, "Toast", Toast.LENGTH_SHORT).show();
                Object[] params = new Object[20];
                params[0] = "/get?table=lageritem";
                params[1] = txtUser;
                params[2] = txtPassword;
                try {
                    if (new RESTConnect(getActivity(), params).execute().get() == false) Toast.makeText(getActivity(), "Something went wrong", Toast.LENGTH_SHORT).show();
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
