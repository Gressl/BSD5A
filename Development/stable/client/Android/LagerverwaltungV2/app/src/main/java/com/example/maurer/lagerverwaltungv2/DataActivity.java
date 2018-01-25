package com.example.maurer.lagerverwaltungv2;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.RelativeLayout;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import org.w3c.dom.Text;

import java.lang.reflect.Array;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Enumeration;

import static android.R.attr.data;

public class DataActivity extends AppCompatActivity {

    RelativeLayout layout;
    Intent i;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_data);
        i = getIntent();
        String whichtable = i.getStringExtra("table");
        System.out.println(i.getStringExtra("data"));
        ArrayList data = null;
        Intent intent = null;

        switch (whichtable){
            case "kunde":
                data = (ArrayList<Kunde>)getData();
                intent = new Intent(this, CustomerActivity.class);
                break;
            case "verkauf":
                data = (ArrayList<Verkauf>)getData();
                //intent = new Intent(this, SalesActivity.class);
                break;
            case "lageritem":
                data = (ArrayList<LagerItem>)getData();
                intent = new Intent(this, InventoryActivity.class);
                break;
            default:
                data = null;
        }
        intent.putExtra("data", i.getStringExtra("data"));
        startActivity(intent);
    }

    public ArrayList<?> getData(){
        Gson g = new Gson();
        i = getIntent();
        String table = i.getStringExtra("table");
        switch(table) {
            case "kunde":

                Kunde[] kundenarray = g.fromJson(i.getStringExtra("data"), Kunde[].class);
                ArrayList<Kunde> kunden = new ArrayList<>(Arrays.asList(kundenarray));
                return kunden;
            case "verkauf":

                Verkauf[] verkaufarray = g.fromJson(i.getStringExtra("data"), Verkauf[].class);
                ArrayList<Verkauf> verkaufe = new ArrayList<>(Arrays.asList(verkaufarray));
                return verkaufe;
            case "lageritem":

                LagerItem[] lageritemarray = g.fromJson(i.getStringExtra("data"), LagerItem[].class);
                ArrayList<LagerItem> lageritems = new ArrayList<>(Arrays.asList(lageritemarray));
                return lageritems;
            default:
                System.out.println("ERROR!");
                return null;
        }
    }
}
