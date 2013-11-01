/**
 * Created by Wouter on 1-11-13.
 */
Hades.soul = function(){
    this.inheritFrom = Hades.building;
    this.inheritFrom(10);
    this.trigger = function(){
        Hades.counters.souls++;
    };
};