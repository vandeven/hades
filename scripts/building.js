/**
 * Created by Wouter on 1-11-13.
 */
(function(ha){
    ha.building = function(){
        var interval;
        var moneyCost = 0, soulCost = 0;
        var id = 0;

        this.init = function(){
            return this;
        };
        this.start = function(delay){
            interval = setInterval(this.trigger, delay);
        };
        this.trigger = function(){
        };
        this.destroy = function(){
            //Hades.map.remove(this);
        };
        this.getMoneyCost = function(){
            return moneyCost;
        };
        this.getSoulCost = function(){
            return soulCost;
        };
        this.getId = function(){
            return id;
        }
    }
}(Hades));