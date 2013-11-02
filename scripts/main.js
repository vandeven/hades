/**
 * Created by ties on 1-11-13.
 */
var Hades = {
    map : [],
    counters : {
        souls : 0,
        money : 100
    },

    init : function(){
        var self = this;
        self.generateMap(79,35);

        $('.cell').each(function(i, cell){
            $(cell).droppable({
                accept : ".buildingMenu",
                hoverClass : "cell_droppable",
                drop : function(event, building){
                   self.buildBuilding($(event.target), $(building.draggable).attr("id"));
                }
            });
        });
        self.makeDraggable("moneyBuilding");
        self.makeDraggable("soulBuilding");

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
        if(id === "moneyBuilding"){
            return new Hades.money();
        } else if(id === "soulBuilding"){
            return new Hades.soul();
        }
        return null;
    },
    buildBuilding : function(cell, buildingId){
        var self = this;
        var building = self.getNewBuildingById(buildingId);

        //controleer locatie

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