/**
 * Created by Wouter on 1-11-13.
 */
(function(ha){
    ha.money = function(){
        this.moneyCost = 10;
        this.id = 1;

        this.init = function(){
            _super.init(1000);
            return this;
        };
        this.trigger = function(){
            Hades.increaseMoney();
        };
    }.inherits(ha.building);
}(Hades));