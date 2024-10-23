'use strict';

var Section = require('../classes/SectionClass');
var TextPanel = require('../objects3D/TextPanelObject3D');
var galaxySection = new Section('galaxy');

// Get the stats-card div element



galaxySection.onIn(function (way) {
  // galaxy.in(way);
  // text.in();
});

galaxySection.onOut(function (way) {
  // galaxy.out(way);
  // text.out(way);
});

galaxySection.onStart(function () {
  // galaxy.start();

  // galaxy.el.visible = true;
  // statsContainer.style.display = 'flex';
});

galaxySection.onStop(function () {
  // galaxy.stop();

  // galaxy.el.visible = false;
  // statsContainer.style.display = 'none';
});

module.exports = galaxySection;