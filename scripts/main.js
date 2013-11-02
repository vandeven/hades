/**
 * Created by ties on 1-11-13.
 */
var Hades = {
    map : [],
    counters : {
        souls : 0,
        money : 0
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
    buildBuilding : function(cell, building){
        //controleer geld
        //Controleer server
        //Geld afschrijven
        //Gebouw plaatsen
        //View updaten
        Hades.view.setBuilding(cell, building);
    }
};