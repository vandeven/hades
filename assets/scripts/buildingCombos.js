
(function(ha){
    ha.countNearbyBuildings = function(xpos, ypos){
        var buildingNorth = null;
        var buildingSouth = null;
        var buildingEast = null;
        var buildingWest = null;

        if(ypos-1 >= 0){
          buildingNorth =Hades.hadesMap[xpos][ypos-1];
        }
        if(ypos + 1 < Hades.hadesMap[xpos].length){
          buildingSouth =Hades.hadesMap[xpos][ypos+1];
        }
        if(xpos -1 >=0){
            buildingWest =Hades.hadesMap[xpos-1][ypos];
        }
        if(xpos + 1< Hades.hadesMap.length){
            buildingEast =Hades.hadesMap[xpos+1][ypos];
        }
        var numberOfBuildings = 0;
        if(buildingNorth && buildingNorth.building && buildingNorth.building.player == Hades.player1){
            numberOfBuildings++;
        }
        if(buildingSouth && buildingSouth.building && buildingSouth.building.player == Hades.player1){
            numberOfBuildings++;
        }
        if(buildingEast && buildingEast.building && buildingEast.building.player == Hades.player1){
            numberOfBuildings++;
        }
        if(buildingWest && buildingWest.building && buildingWest.building.player == Hades.player1){
            numberOfBuildings++;
        }
        return numberOfBuildings;
    };
    ha.isPartOfSquare = function(xpos, ypos){
        var buildingNorth =Hades.grid.findWhere({ x: xpos, y: ((parseInt(ypos, 10)-1).toString(10)) });
        var buildingNorthSouth  =Hades.grid.findWhere({ x: xpos, y: ((parseInt(ypos, 10)-1).toString(10)) });
        var buildingSouth =Hades.grid.findWhere({ x: xpos, y: ((parseInt(ypos, 10)+1).toString(10)) });
        var buildingEast =Hades.grid.findWhere({ x: ((parseInt(xpos, 10)+1).toString(10)), y: ypos });
        var buildingWest =Hades.grid.findWhere({ x: ((parseInt(xpos, 10)-1).toString(10)), y: ypos });
    };
}(Hades));