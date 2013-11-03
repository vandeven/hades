(function(ha){
    ha.init = function(){
        "use strict";
        var self = this;
        self.grid = new HadesCollection();
        self.player1 = "true";
        self.grid.on('add', self.handleNetworkMessage, self);
        //self.grid.on('remove', self.destroyBuildingEvent, self);
        //self.grid.forEach(self.placeOrUpdateBuildingAction);

        self.generateMap(35,45);
        self.generateMenu();
        self.generateAdvert();
        $("#player1").attr('checked', "checked");
        $("#player1").click(function(){
            Hades.player1 = "true";
        });
        $("#player2").click(function(){
            Hades.player1 = "false";
        });
        setInterval(function(){
                Hades.grid.fetch();
          }, 1000);

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
                    var coordinates = Hades.view.getCordinates($(event.target));
                    self.grid.create({
                        x: coordinates[0],
                        y: coordinates[1],
                        building: buildingId,
                        player: Hades.player1
                    }, {wait: false});
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
    ha.handleNetworkMessage = function( event ) {
        var cellData = event.attributes;
        if(cellData.building === Hades.buildingCrusherId){
            Hades.destroyBuilding(cellData.x, cellData.y, cellData.player);
        }
        else if(cellData.x && cellData.y && cellData.building) {
            Hades.buildBuilding(cellData);
        } else {
            if(cellData.message === "you are"){
                Hades.playerName = cellData.value;
            }
            console.log(cellData);
        }
    };
    ha.buildBuilding = function(cellData){
        var self = this;

        var cell = Hades.hadesMap[parseInt(cellData.x)][parseInt(cellData.y)];
        if(cell.building){
            return;
        }
        var building = self.getBuildingById(cellData.building);
        building.cell = cell;
        cell.player = cellData.player;
        cell.building = building;
        //controleer geld
        if(self.counters.money < building.moneyCost || self.counters.soul < building.soulCost){
            return;
        }

        //Controleer server

        //Geld afschrijven
        if(cellData.player === Hades.player1){
         self.decreaseMoney(building.moneyCost);
         self.decreaseSouls(building.soulCost);
        }

        //Gebouw plaatsen
        building.start();
        
        var cellId = Hades.view.getCellId(building.cell.x, building.cell.y);

        if(building){
            Hades.view.setBuilding($("#" + cellId), building.name, cellData.player === Hades.player1 ? "cell_player" : "cell_opponent");
            Hades.view.updateBuildingCost(building.name, building.moneyCost, building.soulCost);
            $('#buildBuilding')[0].play();
        }
        //View updaten
        //Hades.view.setBuilding(cell, cellData.buildingId, playerClass);
        //Hades.view.updateBuildingCost(cellData.buildingId, building.moneyCost, building.soulCost);
        //Hades.view.setBuilding(cell, cellData.buildingId, playerClass);
        //Hades.view.updateBuildingCost(cellData.buildingId, cost);
    };
    ha.destroyBuilding = function(x, y, player){
        var building = Hades.getBuildingById(Hades.buildingCrusherId);
        var moneyCost = building.moneyCost;
        var soulCost = building.soulCost;

        if(Hades.counters.money < moneyCost || Hades.counters.souls < soulCost){
            return;
        }

        if(player === Hades.player1){
            Hades.decreaseMoney(moneyCost);
            Hades.decreaseSouls(soulCost);
        }
        Hades.hadesMap[x][y].building.destroy();
        Hades.hadesMap[x][y] = new Hades.cell().init(x, y, null, Hades.player1);
        var cell = $("#" + Hades.view.getCellId(x, y));
        $('#destroyBuilding')[0].play();
        Hades.view.setBuilding(cell, "cell", "player");
    };
}(Hades));