/**
 * Created by Wouter on 1-11-13.
 */
(function(ha){
    ha.soul = function(){
        this.init = function(){
            _super.init(10);
        };
        this.trigger = function(){
            ha.counters.souls++;
        };
        this.moneyCost = function(){
            return 50;
        };
    }.inherits(ha.building);
}(Hades));