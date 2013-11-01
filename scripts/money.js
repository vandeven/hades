/**
 * Created by Wouter on 1-11-13.
 */
Hades.money = function(){
    this.inheritFrom = Hades.building;
    this.inheritFrom();
    this.trigger = function(){
        Hades.counters.money++;
    };
};