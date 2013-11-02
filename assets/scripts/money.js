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
            var numberOfBuildings = Hades.countNearbyBuildings(xpos,ypos);
            var moneyIncrease = 1 + numberOfBuildings ;
            console.log("buildings:" + numberOfBuildings + " money:" + moneyIncrease );
            Hades.increaseMoney(moneyIncrease);
        };
        this.start = function(){
            _super.start(1000);
        };
    }.inherits(ha.building);
}(Hades));