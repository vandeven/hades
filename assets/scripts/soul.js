/**
 * Created by Wouter on 1-11-13.
 */
(function(ha){
    ha.soul = function(){
        this.moneyCost = 50;
        this.id = 2;

        this.init = function(){
            _super.init();
        };
        this.start = function(){
            _super.start(10000);
        };
        this.trigger = function(){
            Hades.increaseSouls();
        };
    }.inherits(ha.building);
}(Hades));