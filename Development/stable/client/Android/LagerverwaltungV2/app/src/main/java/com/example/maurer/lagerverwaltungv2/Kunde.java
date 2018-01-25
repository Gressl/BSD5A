package com.example.maurer.lagerverwaltungv2;

/**
 * Created by pupil on 1/25/18.
 */

public class Kunde {
    public String K_ID;
    public String Name;
    public String Adresse;
    public String UID;

    public Kunde(String k_ID, String name, String adresse, String UID) {
        K_ID = k_ID;
        Name = name;
        Adresse = adresse;
        this.UID = UID;
    }

    public String getK_ID() {
        return K_ID;
    }

    public void setK_ID(String k_ID) {
        K_ID = k_ID;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getAdresse() {
        return Adresse;
    }

    public void setAdresse(String adresse) {
        Adresse = adresse;
    }

    public String getUID() {
        return UID;
    }

    public void setUID(String UID) {
        this.UID = UID;
    }

    @Override
    public String toString(){
        return this.Name + " " + this.Adresse + " " + this.UID;
    }
}
