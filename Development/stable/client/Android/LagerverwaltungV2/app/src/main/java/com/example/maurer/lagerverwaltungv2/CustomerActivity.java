package com.example.maurer.lagerverwaltungv2;

import android.content.Context;
import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;

import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

public class CustomerActivity extends AppCompatActivity {

    Intent i;
    ListView lv_Data;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_customer);
        lv_Data = (ListView) findViewById(R.id.lv_Data);
        i = getIntent();
        System.out.println(i.getStringExtra("data"));
        Gson g = new Gson();

        Kunde[] kundenarray = g.fromJson(i.getStringExtra("data"), Kunde[].class);
        ArrayList<Kunde> data = new ArrayList<>(Arrays.asList(kundenarray));

        Kunde k = data.get(0);

        lv_Data.setAdapter(new ArrayAdapter<Kunde>(this, R.layout.support_simple_spinner_dropdown_item, data.toArray(new Kunde[data.size()])));




    }



}
