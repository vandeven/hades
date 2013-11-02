/**
 * Created by Wouter on 1-11-13.
 */
(function(ha){
    ha.building = function(){
        var timerId;
        this.moneyCost = 0;
        this.soulCost = 0;
        this.id = 0;
        this.cell = null;
        this.name = "nothing";

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