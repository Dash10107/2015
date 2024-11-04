'use strict';

var Section = require('../classes/SectionClass');

var GravityGrid = require('../objects3D/GravityGridObject3D');

var gravitySection = new Section('gravity');

var grid = new GravityGrid({
  linesColor: '#666666'
});
grid.el.position.z = 0;
grid.el.rotation.x = -1;
gravitySection.add(grid.el);

grid.el.visible = false;


var gallery = document.getElementById("gallery");
gallery.style.position = 'absolute';
gallery.style.top = '50%';
gallery.style.left = '50%';
gallery.style.transform = 'translate(-50%, -50%)';
gallery.style.zIndex = 10;
gallery.style.display = 'none';
gravitySection.add(gallery);


gravitySection.onIn(function () {
  grid.in();
  gallery.style.display = 'grid';
});

gravitySection.onOut(function () {
  grid.out();
  gallery.style.display = 'none';
});

gravitySection.onStart(function () {
  grid.start();
  gallery.style.display = 'grid';
});

gravitySection.onStop(function () {
  grid.stop();
  gallery.style.display = 'none';
});

gravitySection.show = function () {
  grid.el.visible = true;
};

gravitySection.hide = function () {
  grid.el.visible = false;
};

module.exports = gravitySection;