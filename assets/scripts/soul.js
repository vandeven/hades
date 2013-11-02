/**
 * Created by Wouter on 1-11-13.
 */
(function(ha){
    ha.soul = function(){
        this.moneyCost = 50;
        this.id = 2;

        this.init = function(){
            return this;
        };
        this.trigger = function(){
            Hades.increaseSouls();
        };
        this.start = function(){
            _super.start(10000);
        };
    }.inherits(ha.building);
}(Hades));