/**
 * Created by Wouter on 1-11-13.
 */
(function(ha){
    ha.money = function(){
        this.moneyCost = 10;

        this.init = function(){
            console.log("money");
            _super.init(1000);
        };
        this.trigger = function(){
            console.log("earning money");
            Hades.increaseMoney();
        };
    }.inherits(ha.building);
}(Hades));