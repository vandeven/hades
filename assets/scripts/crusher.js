/**
 * Created by ties on 1-11-13.
 */
(function(ha){
    ha.crusher = function(){
        this.moneyCost = 100;
        this.id = 3;

        this.init = function(){
            return this;
        };
        this.trigger = function(){
        };
        this.start = function(){
            _super.start(1000);
        };
    }.inherits(ha.building);
}(Hades));