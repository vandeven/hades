/**
 * Created by Wouter on 1-11-13.
 */
(function(ha){
    ha.soul = function(){
        this.moneyCost = 50;
        this.id = 2;

        this.init = function(){
            _super.init(10000);
            return this;
        };
        this.trigger = function(){
            Hades.increaseSouls();
        };
    }.inherits(ha.building);
}(Hades));