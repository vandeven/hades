/**
 * Created by Wouter on 1-11-13.
 */
(function(ha){
    ha.money = function(){
        this.moneyCost = 10;
        this.soulCost = 0;
        this.id = 1;
        this.name = "moneyBuilding";

        this.init = function(){
            return this;
        };
        this.trigger = function(){
            Hades.increaseMoney(1);
        };
        this.start = function(){
            _super.start(1000);
        };
    }.inherits(ha.building);
}(Hades));