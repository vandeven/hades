(function(ha){
    ha.init = function(){
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
                        var coordinates = Hades.view.getCordinates($(event.target));
                        self.grid.create({
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
            var cell = Hades.grid.where({ x: cellData.x, y: cellData.y });
            Hades.buildBuilding(cell, cellData.building, cellData.player);
        } else {
            console.log(cellData);
        }
    };
    ha.buildBuilding = function(cell, buildingId, playerClass){
        var self = this;

        cell.building = self.getBuildingById(buildingId);
      //  cell.building.cell = cell;
        //controleer geld
        if(self.counters.money < cell.building.moneyCost || self.counters.soul < cell.building.soulCost){
            return;
        }

        //Controleer server

        //Geld afschrijven
        self.decreaseMoney(cell.building.moneyCost);
        self.decreaseSouls(cell.building.soulCost);

        //Gebouw plaatsen
        cell.building.start();

        var cellId = Hades.view.getCellId(cell.x, cell.y);

        //Geld afschrijven
        if(cell.building){
            Hades.decreaseMoney(cell.building.moneyCost);
            Hades.decreaseSouls(cell.building.soulCost);

            Hades.view.setBuilding($("#" + cellId), cell.building.name, cellData.player);
            Hades.view.updateBuildingCost(cell.building.name, building.moneyCost, building.soulCost);
        }
        //View updaten
        //Hades.view.setBuilding(cell, buildingId, playerClass);
        //Hades.view.updateBuildingCost(buildingId, building.moneyCost, building.soulCost);
        //Hades.view.setBuilding(cell, buildingId, playerClass);
        //Hades.view.updateBuildingCost(buildingId, cost);
    };
    ha.destroyBuilding = function(cell){
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
    } ;
}(Hades));


