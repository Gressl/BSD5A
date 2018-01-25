package com.example.maurer.lagerverwaltungv2;

/**
 * Created by pupil on 1/25/18.
 */

public class Verkauf {
    public String S_ID;
    public String Datum;
    public String KundenID;
    public String KundenName;
    public String I_ID;
    public String ItemMenge;
    public String AktuellerPreis;
    public String KumulierterPreis;


    @Override
    public String toString(){
        return I_ID + " " + ItemMenge + " " + Datum + " " + KundenName;
    }
}

