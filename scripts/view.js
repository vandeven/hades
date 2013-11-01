/**
 * Created by ties on 1-11-13.
 * functies om de view te updaten
 */
(function(ha){
    ha.view = {
        updateSoulCount : function(soulCount){
            $('#soulCount').html(soulCount);
        },
        updateMoneyCount : function(moneyCount){
            $('#moneyCount').html(moneyCount);
        },
        getCellId : function(x,y){
            return "cell_" + x + "_" + y;
        },
        setBuilding : function(cell,buildingClass){
            cell.attr("class", "cell " + buildingClass);
        }

    };
}(Hades));
