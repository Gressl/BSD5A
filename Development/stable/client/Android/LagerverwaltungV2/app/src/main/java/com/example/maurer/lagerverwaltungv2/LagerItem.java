package com.example.maurer.lagerverwaltungv2;

/**
 * Created by pupil on 1/25/18.
 */

public class LagerItem {
    public String I_ID;
    public String Name;
    public String Preis;
    public String Menge;

    public LagerItem(String i_ID, String name, String preis, String menge) {
        I_ID = i_ID;
        Name = name;
        Preis = preis;
        Menge = menge;
    }

    @Override
    public String toString(){
        return Name + " " + Preis + " " + Menge;
    }
}


