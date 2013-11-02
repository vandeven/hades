/**
 * Created by Wouter on 1-11-13.
 */
(function(ha){
    ha.money = function(){
        this.moneyCost = 10;
        this.id = 1;

        this.init = function(){
            return this;
        };
        this.trigger = function(){
            Hades.increaseMoney();
        };
        this.start = function(){
            _super.start(1000);
        };
    }.inherits(ha.building);
}(Hades));