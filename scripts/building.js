/**
 * Created by Wouter on 1-11-13.
 */
Hades.building = function(){
    this.create = function(delay){
        // Check surroundings
        this.interval = setInterval(
            function(){
                this.trigger();
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
    }
};