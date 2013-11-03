(function(ha){
    ha.init = function(){
        "use strict";
        var self = this;
        self.network = new HadesCollection();
        //self.grid.fetch();

        self.network.on('add', self.placeOrUpdateBuildingEvent, self);
        //self.network.on('remove', self.destroyBuildingEvent, self);
        //self.network.forEach(self.placeOrUpdateBuildingAction);

        self.generateMap(45,35);
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
                        Hades.destroyBuilding($(event.target));
                    }else {
                        var coordinates = Hades.view.getCordinates($(event.target));
                        self.network.create({
                            x: coordinates[0],
                            y: coordinates[1],
                            building: buildingId,
                            player: "cell_player"
                        }, {wait: true});
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
    };
    ha.getBuildingById = function(id){
        "use strict";
        if(id === Hades.moneyBuildingId){
            return new Hades.money().init();
        } else if(id === this.soulBuildingId){
            return new Hades.soul().init();
        } else if(id === this.buildingCrusherId){
            return new Hades.crusher().init();
        }
        return null;
    };
    ha.placeOrUpdateBuildingEvent = function( event ) {
        var cellData = event.attributes;
        if(cellData.x && cellData.y && cellData.building) {
            Hades.buildBuilding(cellData);
        } else {
            console.log(cellData);
        }
    };
    ha.buildBuilding = function(cellData){
        var self = this;

        var building = self.getBuildingById(cellData.building);
        building.cell = Hades.grid[parseInt(cellData.x)][parseInt(cellData.y)];
        //controleer geld
        if(self.counters.money < building.moneyCost || self.counters.soul < building.soulCost){
            return;
        }

        //Controleer server

        //Geld afschrijven
        self.decreaseMoney(building.moneyCost);
        self.decreaseSouls(building.soulCost);

        //Gebouw plaatsen
        building.start();
        
        var cellId = Hades.view.getCellId(building.cell.x, building.cell.y);

        if(building){
            Hades.view.setBuilding($("#" + cellId), building.name, "cell_player");
            Hades.view.updateBuildingCost(building.name, building.moneyCost, building.soulCost);
        }
        //View updaten
        //Hades.view.setBuilding(cell, cellData.buildingId, playerClass);
        //Hades.view.updateBuildingCost(cellData.buildingId, building.moneyCost, building.soulCost);
        //Hades.view.setBuilding(cell, cellData.buildingId, playerClass);
        //Hades.view.updateBuildingCost(cellData.buildingId, cost);
    };
    ha.destroyBuilding = function(cell){
        var coordinates = Hades.view.getCordinates(cell);
        var building = Hades.getBuildingById(Hades.buildingCrusherId);
        var moneyCost = building.moneyCost;
        var soulCost = building.soulCost;

        if(Hades.counters.money < moneyCost || Hades.counters.souls < soulCost){
            return;
        }

        Hades.decreaseMoney(moneyCost);
        Hades.decreaseSouls(soulCost);
        building = Hades.grid.where({ x: coordinates[0], y: coordinates[1] })[0].building;
        building.destroy();
        Hades.view.setBuilding(cell, "cell", "player");
    };
}(Hades));


