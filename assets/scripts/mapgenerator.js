/**
 * Created by ties on 1-11-13.
 */
(function(ha){
  ha.generateMap = function(xsize, ysize){
      Hades.grid = new Array(ysize);
      var html = '<table>';
      for(var x = 0; x < xsize; x++) {
          Hades.grid[x] = new Array(xsize);
          html += '<tr>';
          for(var y = 0; y < ysize; y++) {
              Hades.grid[x][y] = new Hades.cell().init(x, y, null, Hades.playerName);
              html += '<td id="'+Hades.view.getCellId(x, y) + '" class="cell"></td>';
          }
          html += '</tr>';
      }
      html += '</table>';

      $('#hadesgrid').append(html);
  };
}(Hades));