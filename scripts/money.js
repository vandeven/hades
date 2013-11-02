/**
 * Created by Wouter on 1-11-13.
 */
(function(ha){
    ha.money = function(){
        this.inheritFrom = Hades.building;
        this.inheritFrom();
        this.trigger = function(){
            Hades.counters.money++;
        };
        this.moneyCost = function(){
            return 10;
        }
    };
}(Hades));