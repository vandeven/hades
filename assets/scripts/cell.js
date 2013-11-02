/**
 * Created by Wouter on 2-11-13.
 */

(function(ha){
    ha.cell = function(){
        this.building = null;
        this.x = 0;
        this.y = 0;
        this.player= "";

        this.init = function(_x, _y,_building, _player ){
            this.x = _x;
            this.y = _y;
            this.building = _building;
            this.player = _player;
            return this;
        };
    };
}(Hades));