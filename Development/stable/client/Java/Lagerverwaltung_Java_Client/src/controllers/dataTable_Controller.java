package controllers;

import javafx.fxml.FXML;
import javafx.scene.control.Label;

import javax.swing.table.TableColumn;
import javax.swing.text.html.ListView;
import java.awt.*;
import java.util.List;

public class dataTable_Controller {
    private Object[] result;
    private String title;

    @FXML private Label lblResult;
    @FXML private Label lblTable;

    public void setResultList(Object[] resultList){
        this.result = resultList;
        System.out.println((result[0].toString()));
    }
    public void setData(){
        lblTable.setText(title);
        for (Object o:result) {
            lblResult.setText(lblResult.getText() + "\n" + o.toString());
        };
    }
    public void setTitle(String title){
        this.title = title;
    }
}
