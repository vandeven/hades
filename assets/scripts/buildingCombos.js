
(function(ha){
    ha.countNearbyBuildings = function(xpos, ypos){
        var buildingNorth =Hades.grid.findWhere({ x: xpos, y: ((parseInt(ypos, 10)-1).toString(10)) });
        var buildingSouth =Hades.grid.findWhere({ x: xpos, y: ((parseInt(ypos, 10)+1).toString(10)) });
        var buildingEast =Hades.grid.findWhere({ x: ((parseInt(xpos, 10)+1).toString(10)), y: ypos });
        var buildingWest =Hades.grid.findWhere({ x: ((parseInt(xpos, 10)-1).toString(10)), y: ypos });
        var numberOfBuildings = 0;
        if(buildingNorth && buildingNorth.attributes.building){
            numberOfBuildings++;
        }
        if(buildingSouth && buildingSouth.attributes.building){
            numberOfBuildings++;
        }
        if(buildingEast && buildingEast.attributes.building){
            numberOfBuildings++;
        }
        if(buildingWest && buildingWest.attributes.building){
            numberOfBuildings++;
        }
        return numberOfBuildings;
    };
}(Hades));