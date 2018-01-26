package classes;

public class Verkauf {
    private String S_ID;
    private String Datum;
    private String KundenID;
    private String KundenName;
    private String I_ID;
    private String ItemMenge;
    private String AktuellerPreis;
    private String KumulierterPreis;

    public String toString(){
        return this.S_ID + " " + this.Datum + " " + this.KundenID + " " + this.KundenName + " " + this.I_ID + " " + this.ItemMenge + " " + this.AktuellerPreis + " " + this.KumulierterPreis;
    }
}
