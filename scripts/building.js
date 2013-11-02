/**
 * Created by Wouter on 1-11-13.
 */
(function(ha){
    ha.building = function(){
        var interval;

        this.init = function(delay){
            interval = setInterval(
                function(){
                    trigger();
                },
                delay);
        };

        this.trigger = function(){
        };

        this.destroy = function(){
            //Hades.map.remove(this);
        };

        this.moneyCost = function(){
            return 0;
        };
    }
}(Hades));