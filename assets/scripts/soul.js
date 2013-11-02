/**
 * Created by Wouter on 1-11-13.
 */
(function(ha){
    ha.soul = function(){
        this.moneyCost = 50;

        this.init = function(){
            console.log("soul");
            _super.init(10000);
        };
        this.trigger = function(){
            Hades.increaseSouls();
        };
        this.moneyCost = function(){
            return 50;
        };
    }.inherits(ha.building);
}(Hades));