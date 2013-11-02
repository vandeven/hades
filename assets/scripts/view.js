/**
 * Created by ties on 1-11-13.
 * functies om de view te updaten
 */
(function(ha){
    ha.view = {
        setSoulCount : function(soulCount){
            $('#soulCount').html(soulCount);
        },
        setMoneyCount : function(moneyCount){
            $('#moneyCount').html(moneyCount);
        },
        getCellId : function(x,y){
            return "cell_" + x + "_" + y;
        },
        setBuilding : function(cell,buildingClass, playerClass){
            cell.attr("class", "cell " + buildingClass + " " + playerClass);
        },
        enableBuilding : function(buildingId){
            var building = $("#" + buildingId);
            building.draggable("option", "disabled", false);
            building.removeClass("buildingMenuDisabled");
        },
        disableBuilding : function(buildingId){
            var building = $("#" + buildingId);
            building.draggable("option", "disabled", true);
            building.addClass("buildingMenuDisabled");
        },
        updateBuildingCost : function(buildingId, cost){
            var buildingCost = $("#" + buildingId + "Cost");
            buildingCost.html(cost);
        }
    };

}(Hades));
