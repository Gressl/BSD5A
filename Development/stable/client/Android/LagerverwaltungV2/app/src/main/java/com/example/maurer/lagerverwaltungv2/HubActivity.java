package com.example.maurer.lagerverwaltungv2;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

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



        Toast.makeText(this, "Login....", Toast.LENGTH_SHORT).show();


    }
}
