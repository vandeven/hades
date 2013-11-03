/**
 * Created by Wouter on 2-11-13.
 */

(function(ha){
    ha.decreaseMoney = function(amount){
        var self = this;
        self.counters.money =  self.counters.money - amount;
        self.view.setMoneyCount(self.counters.money);
        self.disableBuildings();
    };
    ha.increaseMoney = function(amount){
        Hades.counters.money = Hades.counters.money + amount;
        Hades.view.setMoneyCount(Hades.counters.money);
        Hades.enableBuildings();
    };
    ha.increaseSouls = function(){
        Hades.counters.souls++;
        Hades.view.setSoulCount(Hades.counters.souls);
        Hades.enableBuildings();
        if(Hades.counters.souls === 10){
            $('#victory')[0].play();
            alert('You won!');
        }
    };
    ha.decreaseSouls = function(amount){
        var self = this;
        self.counters.souls =  self.counters.souls - amount;
        self.view.setSoulCount(self.counters.souls);
        self.disableBuildings();
    };
}(Hades));