/**
 * Created by Wouter on 1-11-13.
 */
(function(ha){
    ha.building = function(){
        var interval;

        this.trigger = function(){
            alert("got the trigger working");
        };

        this.init = function(delay){
            interval = setInterval(this.trigger, delay);
        };

        this.destroy = function(){
            //Hades.map.remove(this);
        };

        this.moneyCost = function(){
            return 0;
        };
    }
}(Hades));