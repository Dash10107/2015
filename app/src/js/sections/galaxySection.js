'use strict';

var Section = require('../classes/SectionClass');
var TextPanel = require('../objects3D/TextPanelObject3D');
var galaxySection = new Section('galaxy');

// Get the stats-card div element


var statsContainer = document.getElementById("statscards");
statsContainer.style.position = 'absolute';
statsContainer.style.top = '50%'; // Position 50% from the top of the page
statsContainer.style.left = '50%'; // Position 50% from the left of the page
statsContainer.style.transform = 'translate(-50%, -50%)'; // Translate to perfectly center
statsContainer.style.zIndex = 100; // Ensure it's on top of other elements


galaxySection.add(statsContainer);

galaxySection.onIn(function (way) {
  // galaxy.in(way);
  // text.in();
  statsContainer.style.opacity = '1';
});

galaxySection.onOut(function (way) {
  // galaxy.out(way);
  // text.out(way);
  statsContainer.style.display = 'none';
});

galaxySection.onStart(function () {
  // galaxy.start();

  // galaxy.el.visible = true;
  statsContainer.style.display = 'flex';
});

galaxySection.onStop(function () {
  // galaxy.stop();

  // galaxy.el.visible = false;
  statsContainer.style.display = 'none';
});

module.exports = galaxySection;