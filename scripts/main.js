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
    buildingCrusherId : "buildingCrusher",
    buildings : ["moneyBuilding", "soulBuilding", "buildingCrusher"],

    init : function(){
        "use strict";
        var self = this;
        self.generateMap(50,35);

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
                   self.buildBuilding($(event.target), $(building.draggable).attr("id"), "cell_player");
                }
            });
        });
        for(var building = 0; building < Hades.buildings.length; building++){
            var buildingId = Hades.buildings[building];
            self.makeDraggable(buildingId);
            Hades.view.updateBuildingCost(buildingId, self.getBuildingMoneyCostById(buildingId))
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
            var buildingCost = this.getBuildingMoneyCostById(buildingId);
            if(this.counters.money < buildingCost)          {
                Hades.view.disableBuilding(buildingId);
            }
        }
    },
    getBuildingMoneyCostById : function(id){
        if(id === Hades.moneyBuildingId){
            return 10;
        } else if(id === this.soulBuildingId){
            return 50;
        } else if(id === this.buildingCrusherId){
            return 100;
        }
        return null;
    },
    buildBuilding : function(cell, buildingId, playerClass){
        var self = this;
        var buildingCost = self.getBuildingMoneyCostById(buildingId);

        //controleer geld
        if(this.counters.money < buildingCost){
            return;
        }
        //Controleer server

        //Geld afschrijven
        this.decreaseMoney(buildingCost);

        //Gebouw plaatsen

        //View updaten
        Hades.view.setBuilding(cell, buildingId, playerClass);

        //Cost updaten
        Hades.view.updateBuildingCost(buildingId, self.getBuildingMoneyCostById(buildingId))

        if(buildingId === Hades.moneyBuildingId){
            new Hades.money().init();
        }
        else if(buildingId === Hades.soulBuildingId){
            new Hades.soul().init();
        }

    },
    increaseMoney : function(){
        Hades.counters.money++;
        Hades.view.setMoneyCount(Hades.counters.money);
        this.view.setMoneyCount(this.counters.money);
        for(var i = 0; i < Hades.buildings.length; i++){
            var buildingId = Hades.buildings[i]
            var buildingCost = this.getBuildingMoneyCostById(buildingId);
            if(this.counters.money >= buildingCost)          {
                Hades.view.enableBuilding(buildingId);
            }
        }
    },
    increaseSouls : function(){
        Hades.counters.souls++;
        Hades.view.setSoulCount(Hades.counters.souls);
    }
};