var width = 700;
var height = 400;
var sectors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

var sectorWidth = width / sectors.length;
  // make bars at top of stage:
for (var s = 0, l = sectors.length; s < l; ++s) {
  new Rect(s * sectorWidth, 0, sectorWidth, 20).attr('fillColor', sectors[s]).addTo(stage);
}

var blobs = [];

function makeBlob(x, y) {
  var t = new Rect(0, 0, 12, 12, 3).attr(
    'fillColor',
    color( sectors[0|x/(width/sectors.length)] ).randomize('h', .1).randomize('l')
  ).addTo(stage);
  t.attr({
    x: x,
    y: y,
    scale: 1 + Math.random()*2
  });
  return {
    kill: function() {
      t.animate(Math.random() * 20, {
        opacity: 0,
        scale: 0
      }, {
        onEnd: function() {
          t.remove();
        }
      });
    }
  };
}

var d;
stage.on('pointermove', function(e) {
  blobs.push(makeBlob(e.stageX, e.stageY));
  while (blobs.length > 50) {
    blobs.shift().kill();
  }
});
