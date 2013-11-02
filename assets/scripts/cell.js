/**
 * Created by Wouter on 2-11-13.
 */

(function(ha){
    ha.cell = function(){
        this.Building = null;
        this.x = 0;
        this.y = 0;

        this.init = function(_x, _y){
            this.x = _x;
            this.y = _y;
            return this;
        };
    };
}(Hades));