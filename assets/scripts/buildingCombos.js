
(function(ha){
    ha.countNearbyBuildings = function(xpos, ypos){
        var buildingNorth = null;
        var buildingSouth = null;
        var buildingEast = null;
        var buildingWest = null;

        if(ypos-1 >= 0){
          buildingNorth =Hades.grid[xpos][ypos-1];
        }
        if(ypos + 1 < Hades.grid[xpos].length){
          buildingSouth =Hades.grid[xpos][ypos+1];
        }
        if(xpos -1 >=0){
            buildingWest =Hades.grid[xpos-1][ypos];
        }
        if(xpos + 1< Hades.grid.length){
            buildingEast =Hades.grid[xpos+1][ypos];
        }
        var numberOfBuildings = 0;
        if(buildingNorth && buildingNorth.building){
            numberOfBuildings++;
        }
        if(buildingSouth && buildingSouth.building){
            numberOfBuildings++;
        }
        if(buildingEast && buildingEast.building){
            numberOfBuildings++;
        }
        if(buildingWest && buildingWest.building){
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