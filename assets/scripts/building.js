/**
 * Created by Wouter on 1-11-13.
 */
(function(ha){
    ha.building = function(){
        timerId = null,
        moneyCost = 0,
        soulCost = 0,
        id = 0,
        cell = null,
        name = "nothing";

        this.init = function(){
            return this;
        };
        this.trigger = function(){
        };
        this.start = function(delay){
            timerId = setInterval(this.trigger, delay);
        };
        this.destroy = function(){
            console.log("destroying a building");
            cell.attr("class", "cell");
            clearInterval(timerId);
            //Hades.map.remove(this);
        };
    }
}(Hades));