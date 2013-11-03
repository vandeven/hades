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
            var xpos = self.cell.x;
            var ypos = self.cell.y;

            var numberOfBuildings = Hades.countNearbyBuildings(xpos,ypos);
            var moneyIncrease = 1 + numberOfBuildings;
            Hades.increaseMoney(moneyIncrease);
        };
        this.start = function(){
            _super.start(1000);
        };
    }.inherits(ha.building);
}(Hades));