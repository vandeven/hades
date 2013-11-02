(function(ha){
    ha.enableBuildings = function(){
        var self = this;
        for(var i = 0; i < Hades.buildings.length; i++){
            var buildingId = Hades.buildings[i];
            var building = self.getBuildingById(buildingId);
            if(self.counters.money >= building.moneyCost && self.counters.souls >= building.soulCost){
                Hades.view.enableBuilding(buildingId);
            }
        }
    };
    ha.disableBuildings = function(){
        var self = this;
        for(var i = 0; i < Hades.buildings.length; i++){
            var buildingId = Hades.buildings[i];
            var building = self.getBuildingById(buildingId);
            if(this.counters.money < building.moneyCost || self.counters.souls < building.soulCost){
                Hades.view.disableBuilding(buildingId);
            }
        }
    };
}(Hades));
