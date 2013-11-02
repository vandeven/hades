/**
 * Created by Wouter on 1-11-13.
 */
(function(ha){
    ha.money = function(){
        this.moneyCost = 10;
        this.soulCost = 0;
        this.id = 1;
        this.name = "moneyBuilding";
        var self = this;

        this.init = function(){
            return this;
        };
        this.trigger = function(){
            var xpos =self.cell.attributes.x;
            var ypos =self.cell.attributes.y;
            var buildingNorth =Hades.grid.findWhere({ x: parseInt(xpos, 10), y: parseInt(ypos,10) });
            console.log(buildingNorth);
            if(buildingNorth && buildingNorth.attributes.building){
                console.log(buildingNorth.attributes.building);
            }

            Hades.increaseMoney(1);
        };
        this.start = function(){
            _super.start(1000);
        };
    }.inherits(ha.building);
}(Hades));