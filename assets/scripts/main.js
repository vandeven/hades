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
    buildings : [
        { id : "moneyBuilding", name : "Lawyer", title : "Generates money for you"},
        { id : "soulBuilding", name : "Soul Shrine", title : "Generates souls for you"},
        { id : "buildingCrusher", name : "Unholy Tractor", title : "Destroys a building"}],

    init : function(){
        "use strict";
        var self = this;
        self.grid = new HadesCollection();
        //self.grid.fetch();

        self.grid.on('add', self.placeOrUpdateBuildingEvent, self);
        //self.grid.on('remove', self.destroyBuildingEvent, self);
        //self.grid.forEach(self.placeOrUpdateBuildingAction);

        self.generateMap(50,35);
        self.generateMenu();
        self.generateAdvert();

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
                        debugger;
                        var cell = Hades.grid.getCellId(event.x, event.y);
                        var _building = getBuildingById(buildingId, cell);
                        self.buildBuilding($(event.target), _building, "cell_player");
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
    getBuildingById : function(id, cell){
        if(id === Hades.moneyBuildingId){
            return new Hades.money().init(cell);
        } else if(id === this.soulBuildingId){
            return new Hades.soul().init(cell);
        } else if(id === this.buildingCrusherId){
            return new Hades.crusher().init(cell);
        }
        return null;
    },
    buildBuilding : function(cell, building, playerClass){
        var self = this;

        var coordinates = Hades.view.getCordinates(cell);

        //controleer geld
        if(this.counters.money < building.moneyCost || this.counters.soul < building.soulCost){
            return;
        }

        self.grid.create({
            x: coordinates[0],
            y: coordinates[1],
            building: buildingId,
            player: playerClass
        }, {wait: true});
        //Controleer server

        //Geld afschrijven
        self.decreaseMoney(building.moneyCost);
        self.decreaseSouls(building.soulCost);

        //Gebouw plaatsen
        building.start();


        //View updaten
        //Hades.view.setBuilding(cell, buildingId, playerClass);
        //Hades.view.updateBuildingCost(buildingId, building.moneyCost, building.soulCost);
        //Hades.view.setBuilding(cell, buildingId, playerClass);
        //Hades.view.updateBuildingCost(buildingId, cost);
    },
    placeOrUpdateBuildingEvent: function( event ) {
        var cellData = event.attributes;
        if(cellData.x && cellData.y) {
            var cell = Hades.grid.where({ x: cellData.x, y: cellData.y });
            Hades.placeOrUpdateBuildingAction(cell);
        } else {
            console.log(cellData);
        }
    },
    placeOrUpdateBuildingAction: function( cell ) {
        var cellId = Hades.view.getCellId(cell.x, cell.y);

        //Geld afschrijven
        if(cell.building){
            Hades.decreaseMoney(cell.building.moneyCost);
            Hades.decreaseSouls(cell.building.soulCost);

            Hades.view.setBuilding($("#" + cellId), cell.building.name, cellData.player);
            Hades.view.updateBuildingCost(cell.building.name, building.moneyCost, building.soulCost);
        }
    },
    destroyBuilding : function(cell){
        var self = this;
        var building = self.getBuildingById(Hades.buildingCrusherId);
        var moneyCost = building.moneyCost;
        var soulCost = building.soulCost;

        if(Hades.counters.money < moneyCost || Hades.counters.souls < soulCost){
            return;
        }
        Hades.decreaseMoney(moneyCost);
        Hades.decreaseSouls(soulCost);
        building.destroy();
        Hades.view.destroyBuilding(cell);
    }
};