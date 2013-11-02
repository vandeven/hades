/**
 * Created by ties on 1-11-13.
 */
var Hades = {
    map : [],
    counters : {
        souls : 0,
        money : 100
    },
    moneyBuildingId : "moneyBuilding",
    soulBuildingId : "soulBuilding",

    init : function(){
        var self = this;
        self.generateMap(79,35);

        $('.cell').each(function(i, cell){
            $(cell).droppable({
                accept : function(draggable){
                    //controleer locatie
                   var classList = $(cell).attr('class').split(/\s+/);
                   for(var i = 0; i<classList.length ; i++){
                       if(classList[i] === self.moneyBuildingId || classList[i] === self.soulBuildingId){
                           return false
                       }
                   }
                   return true;
                },
                hoverClass : "cell_droppable",
                drop : function(event, building){
                   self.buildBuilding($(event.target), $(building.draggable).attr("id"));
                }
            });
        });
        self.makeDraggable(self.moneyBuildingId);
        self.makeDraggable(self.soulBuildingId);

        Hades.view.setSoulCount(self.counters.souls);
        Hades.view.setMoneyCount(self.counters.money);
    },
    makeDraggable : function(id){
        $("#" + id).draggable({
            snap: true,
            distance : 5,
            revert : "invalid",
            revertDuration : 200,
            zIndex : 10,
            cursor : "pointer",
            cursorAt: { left: 8, top : 8 },
            helper: function(){
                return $('<div style="border: 1px solid black;" class="building ' + id +'"></div>');
            }
        });
    },
    decreaseMoney : function(amount){
      this.counters.money =  this.counters.money - amount;
      this.view.setMoneyCount(this.counters.money);
    },
    getNewBuildingById : function(id){
        if(id === this.moneyBuildingId){
            return new Hades.money();
        } else if(id === this.soulBuildingId){
            return new Hades.soul();
        }
        return null;
    },
    buildBuilding : function(cell, buildingId){
        var self = this;
        var building = self.getNewBuildingById(buildingId);

        //controleer geld
        if(this.counters.money < building.moneyCost()){
            return;
        }
        //Controleer server

        //Geld afschrijven
        this.decreaseMoney(building.moneyCost());

        //Gebouw plaatsen

        //View updaten
        Hades.view.setBuilding(cell, buildingId);
    }
};