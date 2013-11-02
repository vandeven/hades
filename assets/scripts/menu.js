(function(ha){
    ha.enableBuildings = function(){
        var self = this;
        for(var i = 0; i < Hades.buildings.length; i++){
            var buildingId = Hades.buildings[i];
            var buildingCost = self.getBuildingCostById(buildingId);
            var soulCost = self.getBuildingSoulCostById(buildingId);
            if(self.counters.money >= buildingCost && self.counters.souls >= soulCost){
                Hades.view.enableBuilding(buildingId);
            }
        }
    };
    ha.disableBuildings = function(){
        var self = this;
        for(var i = 0; i < Hades.buildings.length; i++){
            var buildingId = Hades.buildings[i];
            var buildingCost = self.getBuildingCostById(buildingId);
            var soulCost = self.getBuildingSoulCostById(buildingId);
            if(this.counters.money < buildingCost || self.counters.souls < soulCost){
                Hades.view.disableBuilding(buildingId);
            }
        }
    };
}(Hades));
