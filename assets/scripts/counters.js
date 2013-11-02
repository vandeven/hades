/**
 * Created by Wouter on 2-11-13.
 */

(function(ha){
    ha.decreaseMoney = function(amount){
        var self = this;
        self.counters.money =  this.counters.money - amount;
        self.view.setMoneyCount(this.counters.money);
        self.disableBuildings();
    };
    ha.increaseMoney = function(){
        Hades.counters.money++;
        Hades.view.setMoneyCount(Hades.counters.money);
        Hades.enableBuildings();
    };
    ha.increaseSouls = function(){
        Hades.counters.souls++;
        Hades.view.setSoulCount(Hades.counters.souls);
        Hades.enableBuildings();
    };
    ha.decreaseSouls = function(amount){
        var self = this;
        self.counters.souls =  this.counters.souls - amount;
        self.view.setSoulCount(this.counters.souls);
        self.disableBuildings();
    };
}(Hades));