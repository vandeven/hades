/**
 * Created by ties on 1-11-13.
 */
var Hades = {
    map : [],
    counters : {
        souls : 1,
        money : 200
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
                    var classList = $(cell).attr('class').split(/\s+/);
                    if(draggable.attr("id") === Hades.buildingCrusherId){
                        for(var i = 0; i<classList.length ; i++){
                            for(var building = 0; building < Hades.buildings.length; building++){
                                if(classList[i] === Hades.buildings[building]){
                                    return true;
                                }
                            }
                        }
                        return false;
                    } else {
                        for(var i = 0; i<classList.length ; i++){
                            for(var building = 0; building < Hades.buildings.length; building++){
                                if(classList[i] === Hades.buildings[building]){
                                    return false;
                                }
                            }
                        }
                        return true;
                    }
                },
                hoverClass : "cell_droppable",
                drop : function(event, building){
                    var buildingId = $(building.draggable).attr("id");
                    if(buildingId === Hades.buildingCrusherId){
                        self.destroyBuilding($(event.target));
                    }else {
                        self.buildBuilding($(event.target), buildingId, "cell_player");
                    }
                }
            });
        });
        for(var building = 0; building < Hades.buildings.length; building++){
            var buildingId = Hades.buildings[building];
            self.makeDraggable(buildingId);
            console.log(buildingId);
            Hades.view.updateBuildingCost(buildingId, self.getBuildingCostById(buildingId), self.getBuildingSoulCostById(buildingId));
        }
        Hades.view.setSoulCount(self.counters.souls);
        Hades.view.setMoneyCount(self.counters.money);
        self.disableBuildings();
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
        var self = this;
        self.counters.money =  this.counters.money - amount;
        self.view.setMoneyCount(this.counters.money);
        self.disableBuildings();
    },
    increaseMoney : function(){
        Hades.counters.money++;
        Hades.view.setMoneyCount(Hades.counters.money);
        Hades.enableBuildings();
    },
    increaseSouls : function(){
        Hades.counters.souls++;
        Hades.view.setSoulCount(Hades.counters.souls);
        Hades.enableBuildings();
    },
    decreaseSouls : function(amount){
        var self = this;
        self.counters.souls =  this.counters.souls - amount;
        self.view.setSoulCount(this.counters.souls);
        self.disableBuildings();
    },
    getBuildingCostById : function(id){
        if(id === Hades.moneyBuildingId){
            return 10;
        } else if(id === this.soulBuildingId){
            return 50;
        } else if(id === this.buildingCrusherId){
            return 100;
        }
        return 0;
    },
    getBuildingSoulCostById : function(id){
        if(id === this.buildingCrusherId){
            return 1;
        }
        return 0;
    },
    getBuildingById : function(id){
        if(id === Hades.moneyBuildingId){
            return new Hades.money().init();
        } else if(id === this.soulBuildingId){
            return new Hades.soul().init();
        } else if(id === this.buildingCrusherId){
            return new Hades.crusher().init();
        }
        return null;
    },
    buildBuilding : function(cell, buildingId, playerClass){
        var self = this;
        var moneyCost = self.getBuildingCostById(buildingId);
        var soulCost = self.getBuildingSoulCostById(buildingId);
        //controleer geld
        if(this.counters.money < moneyCost){
            return;
        }
        //Controleer server

        //Geld afschrijven
        this.decreaseMoney(moneyCost);
        this.decreaseSouls(soulCost);

        //Gebouw plaatsen
        self.getBuildingById(buildingId);
        /*var cordinates = Hades.view.getCordinates(cell);
         var buildingAndPlayer = Hades.view.getBuildingAndPlayer(cell);
         self.hadesGrid.create({
         id: cordinates[0] + "_" + cordinates[1],
         x: cordinates[0],
         y: cordinates[1],
         building: buildingAndPlayer[0],
         player: buildingAndPlayer[1]
         });*/

        //View updaten
        Hades.view.setBuilding(cell, buildingId, playerClass);
        Hades.view.updateBuildingCost(buildingId, moneyCost, soulCost);
    },
    destroyBuilding : function(cell){
        var self = this;
        var cost = self.getBuildingCostById(Hades.buildingCrusherId);
        if(Hades.counters.money < cost){
            return;
        }
        Hades.decreaseMoney(cost);
        Hades.view.destroyBuilding(cell);
    }
};