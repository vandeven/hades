/**
 * Created by Wouter on 2-11-13.
 */

(function(ha){
    ha.cell = function(){

        this.Building = null;

        this.init = function(content){
            this.Building = content;
            return this;
        };
    };
}(Hades));