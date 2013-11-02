/**
 * Created by Wouter on 1-11-13.
 */
(function(ha){
    ha.building = function(){
        var interval;
        this.moneyCost = 0;
        this.soulCost = 0;
        this.id = 0;

        this.trigger = function(){
        };
        this.init = function(delay){
            interval = setInterval(this.trigger, delay);
            return this;
        };
        this.destroy = function(){
            //Hades.map.remove(this);
        };
    }
}(Hades));