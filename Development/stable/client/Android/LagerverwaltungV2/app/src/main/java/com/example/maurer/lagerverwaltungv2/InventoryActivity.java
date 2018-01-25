package com.example.maurer.lagerverwaltungv2;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.Arrays;

public class InventoryActivity extends AppCompatActivity {

    Intent i;
    ListView lv_Data;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_inventory);
        lv_Data = (ListView) findViewById(R.id.lv_Data);
        i = getIntent();
        System.out.println(i.getStringExtra("data"));
        Gson g = new Gson();

        LagerItem[] LagerItemarray = g.fromJson(i.getStringExtra("data"), LagerItem[].class);
        ArrayList<LagerItem> data = new ArrayList<>(Arrays.asList(LagerItemarray));

        LagerItem k = data.get(0);

        lv_Data.setAdapter(new ArrayAdapter<LagerItem>(this, R.layout.support_simple_spinner_dropdown_item, data.toArray(new LagerItem[data.size()])));
    }
}
