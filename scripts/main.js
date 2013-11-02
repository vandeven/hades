/**
 * Created by ties on 1-11-13.
 */
var Hades = {
    map : [],
    counters : {
        souls : 0,
        money : 100
    },
    moneyBuildingId : "moneyBuilding",
    soulBuildingId : "soulBuilding",
    buildings : ["moneyBuilding", "soulBuilding"],

    init : function(){
        "use strict";
        var self = this;
        self.generateMap(79,35);

        $('.cell').each(function(i, cell){
            $(cell).droppable({
                accept : function(draggable){
                    //controleer locatie
                   var classList = $(cell).attr('class').split(/\s+/);
                   for(var i = 0; i<classList.length ; i++){
                       for(var building = 0; building < Hades.buildings.length; building++){
                           if(classList[i] === Hades.buildings[building]){
                               return false;
                           }
                       }
                   }
                   return true;
                },
                hoverClass : "cell_droppable",
                drop : function(event, building){
                   self.buildBuilding($(event.target), $(building.draggable).attr("id"));
                }
            });
        });
        for(var building = 0; building < Hades.buildings.length; building++){
            self.makeDraggable(Hades.buildings[building]);
        }
        Hades.view.setSoulCount(self.counters.souls);
        Hades.view.setMoneyCount(self.counters.money);
    },
    makeDraggable : function(id){
        $("#" + id).draggable({
            distance : 0,
            revert : "invalid",
            revertDuration : 200,
            zIndex : 10,
            cursor : "pointer",
            cursorAt: { left: 8, top : 8 },
            helper: function(){
                return $('<div style="border: 1px solid black;" class="building ' + id +'"></div>');
            }
        });
    },
    decreaseMoney : function(amount){
      this.counters.money =  this.counters.money - amount;
      this.view.setMoneyCount(this.counters.money);
        for(var i = 0; i < Hades.buildings.length; i++){
            var buildingId = Hades.buildings[i]
            var building = this.getNewBuildingById(buildingId);
            if(this.counters.money < building.moneyCost())          {
                Hades.view.disableBuilding(buildingId);
            }
        }
    },
    getNewBuildingById : function(id){
        if(id === this.moneyBuildingId){
            return new Hades.money();
        } else if(id === this.soulBuildingId){
            return new Hades.soul();
        }
        return null;
    },
    buildBuilding : function(cell, buildingId){
        var self = this;
        var building = self.getNewBuildingById(buildingId);

        //controleer geld
        if(this.counters.money < building.moneyCost()){
            return;
        }
        //Controleer server

        //Geld afschrijven
        this.decreaseMoney(building.moneyCost());

        //Gebouw plaatsen

        //View updaten
        Hades.view.setBuilding(cell, buildingId);
    }
};