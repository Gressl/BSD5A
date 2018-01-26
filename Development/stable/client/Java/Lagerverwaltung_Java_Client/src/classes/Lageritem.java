package classes;

public class Lageritem {
    private String I_ID;
    private String Name;
    private String Preis;
    private String Menge;

    public String toString(){
        return this.I_ID + " " + this.Name + " " + this.Preis + " " + this.Menge;
    }
}
