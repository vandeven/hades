/**
 * Created by ties on 1-11-13.
 */
(function(ha){
    ha.crusher = function(){
        this.moneyCost = 100;
        this.id = 3;

        this.init = function(){
            _super.init(0);
            return this;
        };
        this.trigger = function(){
        };
    }.inherits(ha.building);
}(Hades));