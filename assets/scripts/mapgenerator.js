/**
 * Created by ties on 1-11-13.
 */
(function(ha){
  ha.generateMap = function(xsize, ysize){
      var html = '<table';
      for(var y = 0; y < ysize; y++) {
          html += '<tr>';
          for(var x = 0; x < xsize; x++) {
              Hades.grid.add(new Hades.cell().init(x, y));
              html += '<td id="'+ha.view.getCellId(x, y) + '" class="cell"></td>';
          }
          html += '</tr>';
      }
      html += '</table>';

      $('#hadesgrid').append(html);
  };
}(Hades));