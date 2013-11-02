(function(ha){
    ha.enableBuildings = function(){
        var self = this;
        for(var i = 0; i < Hades.buildings.length; i++){
            var buildingId = Hades.buildings[i].id;
            var building = self.getBuildingById(buildingId);
            if(self.counters.money >= building.moneyCost && self.counters.souls >= building.soulCost){
                Hades.view.enableBuilding(buildingId);
            }
        }
    };
    ha.disableBuildings = function(){
        var self = this;
        for(var i = 0; i < Hades.buildings.length; i++){
            var buildingId = Hades.buildings[i].id;
            var building = self.getBuildingById(buildingId);
            if(this.counters.money < building.moneyCost || self.counters.souls < building.soulCost){
                Hades.view.disableBuilding(buildingId);
            }
        }
    };
    ha.generateMenu = function(){
        var menu = $('#buildingMenu');
        var html = "";
        for(var i = 0; i < Hades.buildings.length; i++){
            var buildingId = Hades.buildings[i].id;
            var buildingName = Hades.buildings[i].name;
            var buildingTitle = Hades.buildings[i].title;
            html += '<div class="buildingMenu" id="' + buildingId +'" title="'+ buildingTitle +'">'+ buildingName +' <span id="' + buildingId +'Cost"></span><div class="'+ buildingId +' building"></div></div>';
        }
        menu.append(html);
    }
    ha.makeDraggable = function(id){
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
    }
}(Hades));
