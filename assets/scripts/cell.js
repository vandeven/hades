/**
 * Created by Wouter on 2-11-13.
 */

(function(ha){
    ha.cell = function(){

        this.Building = null;

        this.init = function(_building){
            this.Building = _building;
            return this;
        };
    };
}(Hades));