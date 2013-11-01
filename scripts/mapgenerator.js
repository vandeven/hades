/**
 * Created by ties on 1-11-13.
 */
(function(ha){
  ha.generateMap = function(xsize, ysize){
      var html = '<table>';
      for(var col = 0; col < xsize; col++) {
          for(var row = 0; row < ysize; row++) {
              ha.view.makeBuilding(row, col, 'building');
          }
      }

      html += '</table>';

      $('#hadesgrid').append(html);
  };
}(Hades));