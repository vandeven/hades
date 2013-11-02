/**
 * Created by Wouter on 1-11-13.
 */
(function(ha){
    ha.money = function(){
        this.init = function(){
            _super.init(1);
        };
        this.trigger = function(){
            console.log("earning money");
            ha.counters.money++;
        };
        this.moneyCost = function(){
            return 10;
        };
    }.inherits(ha.building);
}(Hades));