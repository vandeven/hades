/**
 * Created by ties on 1-11-13.
 * functies om de view te updaten
 */
(function(ha){
    ha.view = {
        cellPrefix: "cell_",
        cellCSSClass : "cell ",
        setSoulCount : function(soulCount){
            $('#soulCount').html(soulCount);
        },
        setMoneyCount : function(moneyCount){
            $('#moneyCount').html(moneyCount);
        },
        getCellId : function(x,y){
            return this.cellPrefix + x + "_" + y;
        },
        getCordinates: function(cell) {
            var id = cell.attr("id");
            id = id.replace(this.cellPrefix, "");
            return id.split("_");
        },
        setBuilding : function(cell,buildingClass, playerClass){
            cell.attr("class", this.cellCSSClass + buildingClass + " " + playerClass);
        },
        getBuildingAndPlayer: function(cell) {
          var attr = cell.attr("class");
          attr = attr.replace(this.cellCSSClass);
          return attr.split(" ");
        },
        destroyBuilding : function(cell){
            cell.attr("class", "cell");
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
        updateBuildingCost : function(buildingId, money, souls){
            var buildingCost = $("#" + buildingId + "Cost");
            buildingCost.html(money + " " + souls);
        }
    };

}(Hades));
