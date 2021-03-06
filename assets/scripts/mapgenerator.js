/**
 * Created by ties on 1-11-13.
 */
(function(ha){
  ha.generateMap = function(xsize, ysize){
      Hades.hadesMap = new Array(ysize);
      var html = '<table>';
      for(var x = 0; x < xsize; x++) {
          Hades.hadesMap[x] = new Array(xsize);
          html += '<tr>';
          for(var y = 0; y < ysize; y++) {
              Hades.hadesMap[x][y] = new Hades.cell().init(x, y, null, Hades.player1);
              html += '<td id="'+Hades.view.getCellId(x, y) + '" class="cell"></td>';
          }
          html += '</tr>';
      }
      html += '</table>';

      $('#hadesgrid').append(html);
  };
}(Hades));