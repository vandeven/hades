/**
 * Created by Wouter on 1-11-13.
 */
(function(ha){
    ha.building = function(){
        intervalId = null,
        moneyCost = 0,
        soulCost = 0,
        id = 0,
        cell = null,
        name = "nothing";
        var self = this;

        this.init = function(){
            return this;
        };
        this.trigger = function(){
        };
        this.start = function(delay){
            self.intervalId = setInterval(self.trigger, delay);
        };
        this.destroy = function(){
            //cell.attr("class", "cell");
            clearInterval(self.intervalId);
        };
    }
}(Hades));