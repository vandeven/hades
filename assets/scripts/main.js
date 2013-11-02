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
    buildings : [{ id : "moneyBuilding", name : "Lawyer", title : "Generates money for you"}, { id : "soulBuilding", name : "Soul Shrine", title : "Generates souls for you"}, { id : "buildingCrusher", name : "Unholy Tractor", title : "Destroys a building"}],

    init : function(){
        "use strict";
        var self = this;
        self.generateMap(50,35);
        self.generateMenu();

        $('.cell').each(function(i, cell){
            $(cell).droppable({
                accept : function(draggable){
                    var classList = $(cell).attr('class').split(/\s+/);
                    if(draggable.attr("id") === Hades.buildingCrusherId){
                        for(var i = 0; i<classList.length ; i++){
                            for(var building = 0; building < Hades.buildings.length; building++){
                                if(classList[i] === Hades.buildings[building].id){
                                    return true;
                                }
                            }
                        }
                        return false;
                    } else {
                        for(var i = 0; i<classList.length ; i++){
                            for(var building = 0; building < Hades.buildings.length; building++){
                                if(classList[i] === Hades.buildings[building].id){
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
            var buildingId = Hades.buildings[building].id;
            self.makeDraggable(buildingId);
            var gebouw = self.getBuildingById(buildingId);

            Hades.view.updateBuildingCost(buildingId, gebouw.moneyCost, gebouw.soulCost);
        }
        Hades.view.setSoulCount(self.counters.souls);
        Hades.view.setMoneyCount(self.counters.money);
        self.disableBuildings();
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
        var building = self.getBuildingById(buildingId);

        //controleer geld
        if(this.counters.money < building.moneyCost || this.counters.soul < building.soulCost){
            return;
        }
        //Controleer server

        //Geld afschrijven
        self.decreaseMoney(building.moneyCost);
        self.decreaseSouls(building.soulCost);

        //Gebouw plaatsen
        building.start();
        /*var cordinates = Hades.view.getCordinates(cell);
         var buildingAndPlayer = Hades.view.getBuildingAndPlayer(cell);
         self.hadesGrid.create({
         id: cordinates[0] + "_" + cordinates[1],
         x: cordinates[0],
         y: cordinates[1],
         building: buildingAndPlayer[0],
         player: buildingAndPlayer[1]
         });*/
        var cordinates = Hades.view.getCordinates(cell);
        self.hadesGrid.create({
            x: cordinates[0],
            y: cordinates[1],
            building: buildingId,
            player: playerClass
        }, {wait: true});

        //View updaten
        Hades.view.setBuilding(cell, buildingId, playerClass);
        Hades.view.updateBuildingCost(buildingId, building.moneyCost, building.soulCost);
        //Hades.view.setBuilding(cell, buildingId, playerClass);
        //Hades.view.updateBuildingCost(buildingId, cost);
    },
    placeOrUpdateBuildingEvent: function( event ) {
        var cellData = event.attributes;
        if(cellData.x && cellData.y) {
            Hades.placeOrUpdateBuilding( cellData );
        } else {
            console.log(cellData);
        }
    },
    placeOrUpdateBuildingAction: function( cellData ) {
        var cellId = Hades.view.getCellId(cellData.x, cellData.y);
        var cell = $("#" + cellId);
        var cost = Hades.getBuildingCostById(cellData.building);
        Hades.decreaseMoney(cost);
        Hades.view.setBuilding(cell, cellData.building, cellData.player);
        Hades.view.updateBuildingCost(cellData.building, cost);
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